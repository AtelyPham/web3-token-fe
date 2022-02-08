import { useState } from "react"
import "./App.css"
import { sign } from "./web3"
import copy from "copy-to-clipboard"
import { changeNetwork } from "./networkFunc"

let expireRef, tokenRef

function App() {
  const [token, setToken] = useState("")

  const onSubmit = async event => {
    event.preventDefault()
    const expireTime = expireRef.value

    setToken(await sign(expireTime))
  }

  const onCopy = async event => {
    event.preventDefault()
    copy(tokenRef.value)
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label htmlFor="expire">Expire time (s): </label>
        <input
          type="number"
          name="expire-time"
          id="expire-time"
          max={3600}
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
      <div>
        <button onClick={() => changeNetwork(56)}>Add Binance mainnet</button>
        <button onClick={() => changeNetwork(97)}>Add Binance testnet</button>
      </div>
    </div>
  )
}

export default App
