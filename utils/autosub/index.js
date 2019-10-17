const exec = require('child_process').exec
const fs = require('fs')
const uid = require('uid')

module.exports = (opts) => new Promise((resolve, reject) => {
    if (!opts.input) {
        throw new Error('An input is required')
    }

    let { input, output, format = 'srt', srcLanguage = 'en', dstLanguage = 'en', concurrency } = opts

    if (!output) {
        output = `/tmp/${uid(15)}`
    }

    let cmd = ''
    cmd += 'autosub '
    cmd += `-o ${output} `
    cmd += `-F ${format} `
    cmd += input

    exec(cmd, (err, stdout, stderr) => {
        if (
            // Autosub seems to log to std instead of stdout, weird.
            stderr.indexOf('Performing') === -1
            && stderr.indexOf('Converting') === -1
        ) {
            return reject(err)
        }

        const srtData = fs.readFileSync(output)

        resolve({
            data: srtData.toString()
        })

        try {
            fs.unlinkSync(output)
        } catch (err) {}
    })
})