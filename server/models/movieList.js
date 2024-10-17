const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);

const getFile = (cb) => {
  fs.readFile(p, (err, data) => {
    cb(JSON.parse(data));
  });
};

module.exports = getFile;
