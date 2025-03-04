import { CacheItem, Store } from '@/types/type'

const create = <K, V>(): Store<K, V> => {
  const store = new Map<K, CacheItem<V>>()

  const has = (key: K) => store.has(key)

  const set = (key: K, value: V, ttl: number) => {
    store.set(key, { value, expires: Date.now() + ttl * 1000 })
  }

  const get = (key: K) => {
    const item = store.get(key)

    if (item) {
      if (item.expires < Date.now()) {
        store.delete(key)
        return
      }

      return item.value
    }
  }

  const remove = (key: K) => {
    store.delete(key)
  }

  const clear = () => {
    store.clear()
  }

  return { has, set, get, remove, clear }
}

export { create }
