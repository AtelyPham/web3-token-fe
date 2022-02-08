import Web3 from "web3"
import { networks } from "./networks"

export function addNetworkFactory(chainId) {
  const web3 = new Web3(window.ethereum)

  const chain = networks[chainId]

  if (!chain) throw new Error("Not support chain")

  const toHex = num => {
    return "0x" + num.toString(16)
  }

  const params = {
    chainId: toHex(chain.chainId),
    chainName: chain.name,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol,
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrls: chain.rpc,
    blockExplorerUrls: [
      chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url
        ? chain.explorers[0].url
        : chain.infoURL,
    ],
  }

  const addNetwork = () =>
    web3.eth.getAccounts((error, accounts) => {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [params, accounts[0]],
        })
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log(error)
        })
    })

  return addNetwork
}

export async function changeNetwork(chainId) {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found")

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
    })
  } catch (error) {
    if (error.code !== 4902) {
      return console.log(error)
    }

    addNetworkFactory(chainId)()
  }
}
