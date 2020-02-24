const kloudless = require('./kloudless')
const IPFS = require('./ipfs')

//module.exports = new kloudless({
//    apiKey: process.env.KLOUDLESS_API_KEY,
//    accountId: process.env.KLOUDLESS_ACCOUNT_ID,
//    appId: process.env.KLOUDLESS_APP_ID
//})

module.exports = new IPFS()
