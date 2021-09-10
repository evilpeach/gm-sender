const Web3 = require('web3')
const axios = require('axios')
const abis = require('../constants/abis')

const CONTRACT_ADDRESS = '0xbc9bA753B5e6b9CEA43AF7A8F72fAE7E1eF90602'
const privateKey = process.env.PRIVATE_KEY

const web3 = new Web3(process.env.INFURA_KEY)
const account = web3.eth.accounts.privateKeyToAccount(privateKey)
const contract = new web3.eth.Contract(abis, CONTRACT_ADDRESS)

module.exports = {
  addNewGems: (ctx, next) => {
    let kind = ctx.request.body.kind
    let salt = ctx.request.body.salt
    console.log(`kind: ${kind}, salt: ${salt}`)

    // const transaction = contract.methods.mine(kind, salt);
    // const options = {
    //   to: CONTRACT_ADDRESS,
    //   data: transaction.encodeABI(),
    //   gas: await transaction.estimateGas({ from: account.address }),
    //   gasPrice: await web3.eth.getGasPrice(), // or use some predefined value
    // };
    // const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    // const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    // console.log(receipt);
    next()
  },
}
