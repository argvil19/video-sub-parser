const autosub = require('./autosub')
const fs = require('fs')

module.exports = async video => {
    const sub = await autosub({
        input: video
    })
    fs.unlinkSync(video)

    return sub
}