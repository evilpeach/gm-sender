require('dotenv').config()

const Koa = require('koa')
const router = require('@koa/router')()
const Logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const manager = require('./controllers/add')
const app = new Koa()

app.use(Logger())
app.use(bodyParser())

router.post('/add', manager.addNewGems)

app.use(router.routes())
app.listen(3000)
console.log('listening on port 3000')
