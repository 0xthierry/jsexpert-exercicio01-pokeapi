const https = require("https");

class Request {
  constructor({ baseURL }) {
    this.baseURL = baseURL;
  }

  get(path) {
    return new Promise((resolve, reject) => {
      https
        .get(`${this.baseURL}${path}`, (res) => {
          const buffer = [];
          res.on("data", (data) => buffer.push(data));
          res.on("end", () => {
            const result = Buffer.concat(buffer).toString();
            const response = {
              data: JSON.parse(result),
              statusCode: res.statusCode,
            };
            resolve(response);
          });
        })
        .on("error", (e) => {
          reject(e);
        });
    });
  }
}

module.exports = Request;
