import Web3 from 'web3'
import Web3Token from 'web3-token'

export const sign = async expireTimeInSecond => {
  const web3 = new Web3(window.ethereum)
  await window.ethereum.enable()

  const address = (await web3.eth.getAccounts())[0]

  const token = await Web3Token.sign(
    msg => web3.eth.personal.sign(msg, address),
    `${expireTimeInSecond}s`
  )

  return token
}
