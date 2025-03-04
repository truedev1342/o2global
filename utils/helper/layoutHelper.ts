import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'
import localFont from 'next/font/local'
import { ICurrencyData, ILanguageData } from '@/types/interface'

const lato = localFont({
  src: [
    {
      path: '../../assets/fonts/Lato-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Lato-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Lato-Bold.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Lato-Black.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
})


const arial = localFont({
  src: [
    {
      path: '../../assets/fonts/Arial-BoldMT_2.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Arial-Lgt.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Arial-Mdm.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/ArialCEMTBlack-Regular.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Arial-BoldMT_1.woff2',
      weight: 'bold',
      style: 'normal'
    }
  ]
})
const roboto = localFont({
  src: [
    {
      path: '../../assets/fonts/Roboto-Thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Roboto-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Roboto-Bold.woff2',
      weight: 'bold',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Roboto-Black.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Roboto-Regular.woff2',
      weight: 'normal',
      style: 'normal'
    }
  ]
})

export const getDeviceType = (
  reqHeaders: Headers
): { isMobile: boolean; isTablet: boolean; isDesktop: boolean } => {
  const userAgent = reqHeaders.get('user-agent') || ''

  const parser = new UAParser(userAgent)
  const result = parser.getResult()

  const isMobile = result.device.type === 'mobile'
  const isTablet =
    result.device.type === 'tablet' ||
    (result.device.type === undefined && /tablet|ipad/i.test(userAgent))
  const isDesktop = !isMobile && !isTablet

  return { isMobile, isTablet, isDesktop }
}

export const getLayoutProps = async (
  languageFromParams: string,
  layoutType: string
) => {
  try {
    const reqHeaders = await headers()

    const { isMobile, isTablet, isDesktop } = getDeviceType(reqHeaders)
    const language = layoutType === 'language' ? languageFromParams : 'en'
    const latoFont = lato.style.fontFamily
    const arialFont = arial.style.fontFamily
    const robotoFont = roboto.style.fontFamily

    // Placeholder values for currencies and languages, should be populated as needed
    const currency = 'USD'
    const currencies: ICurrencyData[] = [] // Populate this dynamically
    const languages: ILanguageData[] = [] // Populate this dynamically
    const userDetails = null // Populate based on actual user data if needed

    return {
      isMobile,
      isTablet,
      isDesktop,
      language,
      latoFont,
      arialFont,
      robotoFont,
      currency,
      currencies,
      languages,
      userDetails
    }
  } catch (error) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      language: '',
      latoFont: '',
      arialFont: '',
      robotoFont: '',
      currency: '',
      currencies: [],
      languages: [],
      userDetails: null,
      error: error
    }
  }
}
