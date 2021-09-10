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

const privateKey = process.env.PRIVATE_KEY

app.use((ctx, next) => {
  const web3 = new Web3(process.env.INFURA_KEY)
  // const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  const contract = new web3.eth.Contract(abis, contractAddress)

  ctx.state.web3 = web3
  ctx.state.contract = contract
  return next()
})

router.post('/add', manager.addNewGems)

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
console.log('listening on port 3000')
