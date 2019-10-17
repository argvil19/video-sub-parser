require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const initDb = require('./db')

const initApp = async () => {
    const db = await initDb()

    app.get('/:id', async (req, res) => {
        const mediaId = req.params.id
        const result = await db.findOne({ mediaId })

        if (result) {
            return res.send(result.subs)
        }

        return res.sendStatus(404)
    })

    app.listen(port, () => console.log(`Server running on port ${port}`))
}

initApp()
