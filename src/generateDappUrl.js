const BASE_URL = "https://metamask.app.link"

export function generateDappUrl(url) {
  if (url.search("https://") === -1) {
    throw new Error("The url needs to start with https://")
  }
  return `${BASE_URL}/dapp/` + url.replace("https://", "")
}
