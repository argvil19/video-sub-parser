const autosub = require('./autosub')
const fs = require('fs')

module.exports = async video => {
    try {
        const sub = await autosub({
            input: video
        })
        fs.unlinkSync(video)
    
        return sub
    } catch(err) {
        try {
            fs.unlinkSync(video)
        } catch(err) {
            // no local file, continue...
        }

        throw new Error(err.message)
    }
}