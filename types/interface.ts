import { Dispatch, SetStateAction } from "react"
import { ActiveComponentTypes } from "./type"

export interface User {
  username: string
  fName: string
  lName: string
  avatar: string
  active: boolean
}

export interface ICurrencyData {
  name: string
  rate: string
  symbol: string
  languages: string[]
  fullName: string
}

export interface ILanguageData {
  code: string
  flag: string
  hour_format: '12_hour' | '24_hour'
  price_format: string
  name: string
  default_currency: string
}

export interface IData {
  language: string | undefined
  languages: ILanguageData[]
  isMobile: boolean
  isTablet: boolean
  currency: string | undefined
  currencies: ICurrencyData[]
  userDetails: User | null
}

export interface IContext extends IData {
  languageData: ILanguageData
  currencyData: ICurrencyData
  userData: User | null
  setCurrencyData: Dispatch<SetStateAction<ICurrencyData>>
  setUserData: Dispatch<SetStateAction<User | null>>
  openOverlay: boolean
  setOpenOvarlay: React.Dispatch<SetStateAction<boolean>>
}

export interface SkeletonProps {
  tag?: keyof JSX.IntrinsicElements | string | any
  lang?: string
  height?: any
  width?: any
  count?: any
  radius?: any
}

export interface AuthLayoutProps {
  open: boolean
}