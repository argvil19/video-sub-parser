const kloudless = require('./kloudless')

module.exports = new kloudless({
    apiKey: process.env.KLOUDLESS_API_KEY,
    accountId: process.env.KLOUDLESS_ACCOUNT_ID,
    appId: process.env.KLOUDLESS_APP_ID
})
