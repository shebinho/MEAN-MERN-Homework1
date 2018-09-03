let filesystem = require("./filesystem.js");
let files = new filesystem();

class Purchases {
  constructor() {
    this.purchase = {
      userId: "",
      productId: "",
      totalAmount: "",
      dateOfPurchase: new Date(Date.now()).toString()
    };
    this.path = "./purchases/";
    this.getIndex();
    this.index;
  }

  getIndex() {
    let path = [this.path, "indexer"].join("");
    files.readFile(path).then(
      result => {
        console.log("Result", result);
        this.index = parseInt(result);
      },
      error => {
        console.log("Error", error);

        if (!error) {
          files.writeFile(path, 0);
          this.index = 0;
        }
      }
    );
  }

  updateIndexer(newValue) {
    let path = [this.path, "indexer"].join("");

    files.writeFile(path, newValue);
  }

  getPurchasesList() {
    let path = this.path;
    return new Promise((resolve, reject) => {
      files.readDirectory(path).then(
        result => {
          let jsons = [];

          for (let f in result) {
            if (result[f].match(/purchase\-/gi)) {
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

  getPurchaseById(id) {
    let path = [this.path, "purchase-", id, ".json"].join("");
    return new Promise((resolve, reject) => {
      files.readFile(path).then(
        result => {
          resolve(result);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  addNewPurchase(data) {
    let purchase = this.purchase;
    Object.assign(purchase, data);
    this.index = this.index + 1;

    purchase.id = this.index;

    this.updateIndexer(this.index);
    let filePath = [this.path, "purchase-", this.index, ".json"].join("");

    files.writeFile(filePath, JSON.stringify(purchase));
  }

  deletePurchase(id) {
    let filePath = [this.path, "indexer", "purchase-", id, ".json"].join("");
    files.deleteFile(filePath);

    return true;
  }
}

module.exports = Purchases;
