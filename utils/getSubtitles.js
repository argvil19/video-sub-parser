const autosub = require('./autosub')

module.exports = async video => {
    const sub = await autosub({
        input: video
    })

    return sub
}