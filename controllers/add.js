const { contractAddress } = require('../constants/info')

module.exports = {
  addNewGems: async (ctx, next) => {
    let kind = ctx.request.body.kind
    let salt = ctx.request.body.salt
    console.log(`kind: ${kind}, salt: ${salt}`)

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
    return next()
  },
}
