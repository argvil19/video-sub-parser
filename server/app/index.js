const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
const initDb = require('./db')

const initApp = async () => {
    const db = await initDb()

    app.use(cors())
    app.use(bodyParser())

    app.get('/:id', async (req, res) => {
        const mediaId = req.params.id
        const result = await db.findOne({ mediaId })

        if (result) {
            return res.send(result)
        }

        return res.sendStatus(404)
    })

    app.post('/:id', async(req, res) => {
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
