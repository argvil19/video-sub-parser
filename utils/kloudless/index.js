const fetch = require('node-fetch')
const uid = require('uid')
const fs = require('fs')

module.exports = class Kloudless {
  constructor(opts) {
    if (!("apiKey" in opts)) {
      throw new Error("Kloudless API Key should be present")
    }
    if (!("accountId" in opts)) {
      throw new Error("Kloudless Account ID should be present")
    }
    if (!("appId" in opts)) {
      throw new Error("Kloudless account ID should be present")
    }

    this.apiKey = opts.apiKey;
    this.accountId = opts.accountId;
    this.appId = opts.appId;
    this.apiBase = "https://api.kloudless.com/v1";
    this.downloadBase = "/accounts/[ACCOUNT_ID]/storage/files/[FILE_ID]/contents";
    this.uploadBase = "/accounts/[ACCOUNT_ID]/storage/files";
  }

  generateUploadUrl() {
    return this.apiBase + this.uploadBase.replace("[ACCOUNT_ID]", this.accountId.toString());
  }

  generateDownloadUrl(fileId) {
    return this.apiBase + this.downloadBase.replace("[ACCOUNT_ID]", this.accountId.toString()).replace("[FILE_ID]", fileId);
  }

  getMedia(fileId) {
    return new Promise(async (resolve, reject) => {
      const filePath = `/tmp/${uid(10)}`
      const file = fs.createWriteStream(filePath)
      const response = await fetch(this.generateDownloadUrl(fileId), {
        method: "get",
        headers: {
          "Authorization": `APIKey ${this.apiKey}`,
          "Content-Type": "application/octet-stream",
        }
      });
      response.body.pipe(file)

      file.on('finish', () => resolve(filePath))
    })
  }

  async uploadFile(file, params = {}) {
    return fetch(this.generateUploadUrl(this.accountId), {
      method: "post",
      headers: {
        "Authorization": `APIKey ${this.apiKey}`,
        "Content-Type": "application/octet-stream",
        "X-Kloudless-Metadata": JSON.stringify({
          ...params,
          // eslint-disable-next-line camelcase
          parent_id: "FtAQEhLsfliKe3T1bTJkTS7udzEBXAyVZ_62HBb7nw99JP77rDqG_-hWD0yQwKy00",
          name: uid(10)
        })
      },
      body: file
    }).then((res) => res.json());
  }
}
