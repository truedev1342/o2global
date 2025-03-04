import { APICallParams } from '@/types/type'
import getRequestBody from './getRequestBody'
import { getUrlWithParams } from '..';

const controllerHashMap = new Map<string, AbortController>()
const WithoutCancelToken = new Set<string>();


export default async function APICall({
  url,
  method,
  data,
  header,
  params = {}
}: APICallParams) {
  try {
    const fullUrl = getUrlWithParams(url, params)
    // Dynamically add URL to WithoutCancelToken
    if (!WithoutCancelToken.has(fullUrl)) {
      WithoutCancelToken.add(fullUrl);
    } else {
      console.log(`Skipping AbortController for URL: ${fullUrl}`);
    }
    let controller = null
    if (!WithoutCancelToken.has(fullUrl)) {
      controller = new AbortController()
      controllerHashMap.set(fullUrl, controller)
    }

    const requestBody = getRequestBody({
      url: fullUrl,
      data,
      controller,
      method,
      header
    })

    const response = await fetch(fullUrl, {
      method: method,
      headers: requestBody.headers,
      body: requestBody.data ? JSON.stringify(requestBody.data) : undefined,
      signal: controller ? controller.signal : undefined
    })
      .then((res) => {
        return res
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      })
    if (!response?.ok) {
      throw new Error(`${response?.status} ${response?.statusText}`)
    }
    const responseData = await response?.json()
    // Clean up the AbortController
    if (controller) {
      controllerHashMap.delete(url)
    }

    if (responseData.length === 0) {
      console.log("no data found");
      return null
    }
    return header
      ? {
          data: responseData,
          headers: response.headers
        }
      : responseData
  } catch (err) {
    console.error('Fetch Error:', err)
    return false
  }
}