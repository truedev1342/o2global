import { rtlLanguages } from '@/utils/language'

export const classNameSupport = (language: string) => {
  const className = rtlLanguages.includes(language) ? 'rtl' : 'ltr'
  return className
}

export const logDevelopmentMessage = () => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
    return true
  } else {
    return false
  }
}

export const getUrlWithParams = (url: string, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const newUrl = queryString ? `${url}?${queryString}` : url
  return newUrl
}
