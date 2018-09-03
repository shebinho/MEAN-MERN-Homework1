let filesystem = require("./filesystem.js");
let files = new filesystem();

class Users {
  constructor() {
    this.getIndex();
    this.index;
  }

  getIndex() {
    files.readFile("./indexer").then(
      result => {
        console.log("Result", result);
        this.indexer = parseInt(result);
      },
      error => {
        console.log("Error", error);

        if (!error) {
          files.writeFile("./indexer", 0);
          this.index = 0;
        }
      }
    );
  }

  getUsersList() {
    //return this.users;
    let path = "./";
    return new Promise((resolve, reject) => {
      files.readDirectory(path).then(
        result => {
          let jsons = [];

          for (let f in result) {
            if (result[f].match(/user\-/gi)) {
              jsons.push(result[f]);
            }
          }

          if (jsons.length === 0) {
            reject({});
            return false;
          }

          files.loadFiles(path, jsons).then(
            result => {
              resolve(result);
            },
            error => {
              reject(error);
            }
          );
        },
        error => {
          reject(error);
        }
      );
    });
  }

  updateIndexer(newValue) {
    files.writeFile("./indexer", newValue);
  }

  addUser(user) {
    let newuser = { name: "", lastname: "", age: 0, sex: false, id: false };
    Object.assign(newuser, user);

    this.updateIndexer(this.indexer + 1);
    this.indexer++;

    files.writeFile(
      "./user-" + this.indexer + ".json",
      JSON.stringify(newuser)
    );

    return true;
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      files.readFile("./user-" + id + ".json").then(
        result => {
          resolve(result);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}

module.exports = Users;
