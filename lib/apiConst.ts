import { logDevelopmentMessage } from '.'

const devMod = logDevelopmentMessage()

export const baseurl = devMod
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_APP_URL

export const checkRoutingApi = '/json/check-routing-api.json'
export const flightStartRouting = '/json/flight-start-routing.json'
export const airportsList = '/flight/search/airports/autocomplete'

export const airportsSearch = '/api/airports/'