require('dotenv').config()

const Koa = require('koa')
const router = require('@koa/router')()
const Logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const manager = require('./controllers/add')
const app = new Koa()
app.use(Logger())
app.use(bodyParser())

// initialize
const Web3 = require('web3')
const abis = require('./constants/abis')
const { contractAddress } = require('./constants/info')
const web3 = new Web3(process.env.INFURA_KEY)
const contract = new web3.eth.Contract(abis, contractAddress)
const privateKey = process.env.PRIVATE_KEY
const account = web3.eth.accounts.privateKeyToAccount(privateKey)

app.use((ctx, next) => {
  ctx.state.web3 = web3
  ctx.state.contract = contract
  ctx.state.account = account
  return next()
})

router.post('/add', manager.addNewGems)

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
console.log('listening on port 3000')

// loop check
let { tasks } = require('./stores/db')

setInterval(async () => {
  if (tasks && tasks.length > 0) {
    const { kind, salt } = tasks[0]
    console.log(`Found Task: salt: ${salt}, kind: ${kind}`)
    tasks = []

    try {
      const transaction = contract.methods.mine(kind, salt)
      const options = {
        to: contractAddress,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({ from: account.address }),
        gasPrice: (parseInt(await web3.eth.getGasPrice()) * 2).toString(),
      }
      const signed = await web3.eth.accounts.signTransaction(
        options,
        privateKey,
      )
      const receipt = await web3.eth.sendSignedTransaction(
        signed.rawTransaction,
      )
      console.log(`txHash: ${receipt.transactionHash}`)
    } catch (err) {
      console.error(err)
    }
  } else {
    // console.log('Waiting for incoming tasks.')
  }
}, 100)
