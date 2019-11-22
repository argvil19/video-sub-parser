const media = require('./media')

module.exports = async id => {
    const video = await media.getMedia(id)
    return video
}