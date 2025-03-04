import { GetRequestBodyParams } from '@/types/type'
import { apiHealper } from './apiHealper'

export default function getRequestBody({
  url,
  data,
  controller,
  method,
  header
}: GetRequestBodyParams) {
  let extraHeader = apiHealper.getHeaders()
  if (header) {
    extraHeader = {
      ...header,
      ...extraHeader
    }
  }

  if (data) {
    return {
      url: url,
      headers: extraHeader,
      method: method,
      data: data,
      cancelToken: controller
    }
  } else {
    return {
      url: url,
      headers: extraHeader,
      method: method,
      data: data
    }
  }
}
