const { contractAddress } = require('../constants/info')
let { tasks } = require('../stores/db')

module.exports = {
  addNewGems: async (ctx, next) => {
    let kind = ctx.request.body.kind
    let salt = ctx.request.body.salt
    console.log(`Received: kind: ${kind}, salt: ${salt}`)

    const web3 = ctx.state.web3
    const contract = ctx.state.contract

    try {
      let data = contract.methods.mine(kind, salt).encodeABI()
      let result = await web3.eth.estimateGas({
        to: contractAddress,
        data: data,
      })

      if (parseInt(result) > 150000) {
        ctx.body = {
          success: false,
          reason: `estimated gas exceed 150k (actual ${result})`,
        }
      } else {
        tasks.push({ salt, kind })
        ctx.body = {
          success: true,
          estimated_gas: result,
        }
      }
    } catch (err) {
      ctx.body = {
        success: false,
        reason: err.data,
      }
    }

    ctx.status = 200
    return next()
  },
}
