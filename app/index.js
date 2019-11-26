const queue = require('./queue')
const {
    getSubtitles,
    getVideoFromId
} = require('./utils')
const setupDb = require('./db')

const initApp = async () => {
    const db = await setupDb()

    queue.process('new_video', async (job, done) => {
        const { mediaId } = job.data

        console.log('Incoming job: ', mediaId)

        try {
            const exists = await db.findOne({ mediaId })
        
            if (exists) {
                console.log('Cant push duplicated mediaId')
                return done()
            }

            const insert = await db.insertOne({
                mediaId: mediaId,
                ready: false,
                subs: ''
            })

            const video = await getVideoFromId(mediaId)
            const subs = await getSubtitles(video)

            await db.updateOne({
                _id: insert.insertedId
            }, { $set: { subs, ready: true } })
        } catch(err) {
            console.log(err)
            await db.updateOne({
                _id: insert.insertedId
            }, { $set: { subs: 'WEBVTT\n\n', ready: true } })
            return done()
        }

        console.log(mediaId, ' Inserted!')
    
        done()
    })

}

initApp()
