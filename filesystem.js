let fs = require("fs");

class Files {
  readFile(filePath) {
    return new Promise((resolve, reject) => {
      if (this.doesExist(filePath)) {
        console.log("Does exist");

        fs.readFile(filePath, (err, data) => {
          if (err) {
            console.log("Read file", err);
            reject(err);
          }
          console.log("Read", data);
          resolve(data.toString());
        });
      } else {
        reject(false);
      }
    });
  }

  loadFiles(path, files) {
    return new Promise((resolve, reject) => {
      let promises = [];
      for (let f in files) {
        let filename = [path, files[f]].join("");

        promises.push(this.readFile(filename));
      }

      Promise.all(promises).then(results => {
        resolve(results);
      });
    });
  }

  doesExist(filePath) {
    return fs.existsSync(filePath);
  }

  readDirectory(dirPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(dirPath, (err, files) => {
        let filenames = [];

        if (err) {
          reject(err);
        }

        files.forEach(file => {
          filenames.push(file);
        });

        resolve(filenames);
      });
    });
  }

  writeFile(filepath, data) {
    fs.writeFile(filepath, data, err => {
      if (err) {
        console.log("Write err", err);
        return err;
      }
      console.log("File saved");
      return true;
    });
  }

  createFile(filePath) {}

  deleteFile(filepath) {
    fs.unlinkSync(filepath);
    return true;
  }
}

module.exports = Files;
