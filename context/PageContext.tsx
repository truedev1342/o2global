'use client'
import { IContext, IData, User } from '@/types/interface'
import { createContext, useContext, useEffect, useState } from 'react'

const PageContext = createContext<IContext | null>(null)

export const PageContextProvider = ({
  children,
  data
}: {
  children: React.ReactNode
  data: IData
}) => {
  const languageData =
    data.languages.find(
      (lang) => lang.code === (data.language ? data.language : 'en')
    ) || data.languages[0]

  const initialCurrencyData =
    data.currencies.find(
      (curr) => curr.name === (data.currency ? data.currency : 'USD')
    ) || data.currencies[0]

  const [currencyData, setCurrencyData] = useState(initialCurrencyData)
  const [userData, setUserData] = useState<User | null>(data.userDetails)
  const [openOverlay, setOpenOvarlay] = useState(false)
  useEffect(() => {
    if (openOverlay) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [openOverlay])
  return (
    <PageContext.Provider
      value={{
        ...data,
        languageData,
        currencyData,
        setCurrencyData,
        userData,
        setUserData,
        openOverlay,
        setOpenOvarlay
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)!
