const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
const initDb = require('./db')
const queue = require('./queue')

const initApp = async () => {
    const db = await initDb()

    app.use(cors())
    app.use(bodyParser())

    app.get('/all', async (req, res) => {
        // Get all ipfs ids for replication purposes
        let ids = await db.find({}).project({ mediaId: 1, _id: 0 })
        ids = await ids.toArray()
        ids = ids.map(item => item.mediaId)        

        return res.send(ids);
    })

    app.post('/push', async (req, res) => {
        const { mediaId, key } = req.body

        if (key !== process.env.PUSH_QUEUE_KEY) {
            return res.status(400).send({ message: 'Incorrect key' })
        }

        queue.create(process.env.QUEUE_NAME, { mediaId }).save()

        return res.send({ message: 'OK' })
    })

    app.get('/:id', async (req, res) => {
        const mediaId = req.params.id
        const result = await db.findOne({ mediaId })

        if (result) {
            return res.send(result)
        }

        return res.sendStatus(404)
    })

    app.post('/:id', async (req, res) => {
        if (!req.body.subs) {
            return res.sendStatus(400)
        }

        const mediaId = req.params.id
        const result = await db.findOne({ mediaId })

        if (!result) {
            return res.sendStatus(404)
        }

        await db.updateOne({ mediaId }, {
            $set: {
                subs: req.body.subs
            }
        })

        return res.send('OK')
    })

    app.listen(port, () => console.log(`Server running on port ${port}`))
}

initApp()
