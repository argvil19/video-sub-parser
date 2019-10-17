const MongoClient = require('mongodb').MongoClient
const MONGO_URI = process.env.DB_URI

module.exports = () => new Promise(async resolve => {
    const client = new MongoClient(MONGO_URI, {useNewUrlParser: true})

    client.connect(() => {
        const db = client.db('moovr-subs')

        resolve(db.collection('subs'))
    })
})
