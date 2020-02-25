const fetch = require('node-fetch')
const uid = require('uid')
const fs = require('fs')
const FormData = require('form-data')

module.exports = class IPFS {
  constructor() {
    this.apiBase = process.env.IPFS_HOST;
    this.downloadBase = '/file?id=[FILE_ID]';
    this.uploadBase = '/file';
  }

  generateUploadUrl() {
    return this.apiBase + this.uploadBase.replace("[FILE_ID]", this.accountId.toString());
  }

  generateDownloadUrl(fileId) {
    return this.apiBase + this.downloadBase.replace("[FILE_ID]", fileId);
  }

  getMedia(fileId) {
    return new Promise(async (resolve, reject) => {
      const filePath = `/tmp/${uid(10)}`
      const file = fs.createWriteStream(filePath)
      const response = await fetch(this.generateDownloadUrl(fileId), {
        method: 'get',
      });
      response.body.pipe(file)

      file.on('finish', () => resolve(filePath))
    })
  }

  async uploadFile(file) {
    const body = new FormData()

    body.append('file', file)

    return fetch(this.generateUploadUrl(), {
      method: 'post',
      body
    }).then((res) => res.json());
  }
}
