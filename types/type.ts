export type LayoutType = 'main' | 'language'

export type GetLayoutProps = {
  params: { language: string }
  layoutType: LayoutType
}

export type APICallParams = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: Record<string, any>
  header?: Headers | null
  params?: Record<string, any>
}

export type GetRequestBodyParams = {
  url: string
  method?: string
  // cancelToken?: any | CancelToken | undefined
  controller?: AbortController | null
  data?: any
  header?: Headers | null
}

export type DebouncedFunction<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => Promise<any>
  ? (...args: Parameters<T>) => Promise<ReturnType<T>>
  : (...args: Parameters<T>) => void

export type CacheItem<T> = { value: T; expires: number }

export type Store<K, V> = {
  has: (key: K) => boolean
  get: (key: K) => V | undefined
  set: (key: K, value: V, tt: number) => void
  remove: (key: K) => void
  clear: () => void
}

export type modalType = 'isFrom' | 'isTo'

export type HandleFlightHandleSearchType = {
  e: React.ChangeEvent<HTMLInputElement>
  index?: number
  modalType: modalType
}

export type ActiveComponentTypes =
  | 'SignUp'
  | 'VerifyOtp'
  | 'LoginWelcome'
  | 'ResetPassword'
  | 'ResetPasswordEmail'
  | 'LoginPassword'
