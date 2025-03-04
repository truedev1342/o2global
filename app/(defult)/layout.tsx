import PageLayout from '@/components/layout/PageLayout'
import { PageContextProvider } from '@/context/PageContext'
import '@/styles/Bootstrap/scss/bootstrap.scss'
import '@/styles/globals.scss'
import { getDeviceType, getLayoutProps } from '@/utils/helper/layoutHelper'
import { headers } from 'next/headers'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const reqHeaders = headers()
  const { isMobile, isTablet } = getDeviceType(reqHeaders)
  const layoutProps = await getLayoutProps('main', 'en')

  return (
    <html lang="en" dir="ltr ">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>O2 Global</title>
        <meta name="description" content="Page Description." />
        <meta property="og:locale" content="en_US" key="og:locale" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content="Page Title" key="og:title" />
        <meta property="og:description" content="Page Description." key="og:description" />
        <meta property="og:url" content="page_url" key="og:url" />
        <meta property="og:site_name" content="Baquer" key="og:site_name" />
        <meta property="article:publisher" content="page_url" key="article:publisher" />
        <meta property="og:image" content="image" key="og:image" />
        <meta property="og:image:width" content="1200" key="og:image:width" />
        <meta property="og:image:height" content="628" key="og:image:height" />
        <meta property="og:image:type" content="image/png" key="og:image:type" />
        <meta property="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta property="twitter:site" content="@twitter_usernaem" key="twitter:site" />
        <meta property="twitter:title" content="Page Title" key="twitter:title" />
        <meta property="twitter:description" content="Page Description." key="twitter:description" />
        <meta property="twitter:url" content="page_url" key="twitter:url" />
        <meta property="twitter:image" content="twitter:image" key="twitter:image" />
        <meta name="twitter:label1" content="Est. reading time" key="twitter:label1" />
        <meta name="twitter:data1" content="5 minute" key="twitter:data1" />

        <meta httpEquiv="Cache-control" content="public" />

        <link rel='canonical' href="page_url" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple_touch_icon_url" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon_32x32_url" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon_16x16_url" />
        <link rel="manifest" href="./seo/site.webmanifest" />
        <link rel="mask-icon" href="safari_pinned_tab" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#FCE9F1" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --font-lato: ${layoutProps.latoFont}, sans-serif;
              --font-arial: ${layoutProps.arialFont}, sans-serif;
              --font-roboto: ${layoutProps.robotoFont}, sans-serif;
            }
          `
          }}
        />
      </head>
      <body>
        <PageContextProvider
          data={{
            currencies: layoutProps.currencies,
            currency: layoutProps.currency,
            isMobile: isMobile,
            isTablet: isTablet,
            language: layoutProps.language,
            languages: layoutProps.languages,
            userDetails: layoutProps.userDetails
          }}
        >
          <ToastContainer position='bottom-left'/>
          <PageLayout>{children}</PageLayout>
        </PageContextProvider>
      </body>
    </html>
  )
}
export default RootLayout
