import copy from "copy-to-clipboard"
import { useState } from "react"
import "./App.css"
import { generateDappUrl } from "./generateDappUrl"
import { addNetworkFactory } from "./networkFunc"
import { useMobileDetect } from "./useMobileDetect"
import { sign } from "./web3"

let expireRef, tokenRef

const appUrl = "https://web3-token-fe.vercel.app"

function App() {
  const [token, setToken] = useState("")
  const { isMobile } = useMobileDetect()

  const onSubmit = async event => {
    event.preventDefault()
    const expireTime = expireRef.value

    setToken(await sign(expireTime))
  }

  const onCopy = async event => {
    event.preventDefault()
    copy(tokenRef.value)
  }
  const addMainnet = addNetworkFactory(56)
  const addTestnet = addNetworkFactory(97)

  const handleClick = () => {
    window.location.href = isMobile() ? generateDappUrl(appUrl) : appUrl
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label htmlFor="expire">Expire time (s): </label>
        <input
          type="number"
          name="expire-time"
          id="expire-time"
          min={10}
          defaultValue={300}
          ref={node => (expireRef = node)}
          style={{ marginRight: "1rem" }}
        />
        <br />
        <label htmlFor="token">Token: </label>
        <input
          type="text"
          readOnly
          value={token}
          ref={node => (tokenRef = node)}
        />
        <br />
        <button onClick={onCopy}>Copy</button>
        <button>Sign</button>
      </form>
      <div id="info">Is mobile: {isMobile() ? "true" : "false"}</div>
      <div>
        <button onClick={addMainnet}>Add Binance mainnet</button>
        <button onClick={addTestnet}>Add Binance testnet</button>
        <button onClick={handleClick}>Open link</button>
      </div>
    </div>
  )
}

export default App
