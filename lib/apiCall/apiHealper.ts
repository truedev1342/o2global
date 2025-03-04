export const apiHealper = {
  getHeaders
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    version: `${process.env.NEXT_PRIVATE_API_VERSION}`
  }
}
