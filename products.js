let filesystem = require("./filesystem.js");
let files = new filesystem();

/*
 1. Product map - product attributes/properties;
 2. List of all products
 3. Single Product
 4. Add product
 5. Delete Product
*/

class Products {
  constructor() {
    this.product = {
      productId: "",
      productName: "",
      productPrice: "",
      productDescription: ""
    };
    this.path = "./products/";
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

  getProductsList() {
    let path = this.path;
    return new Promise((resolve, reject) => {
      files.readDirectory(path).then(
        result => {
          let jsons = [];

          for (let f in result) {
            if (result[f].match(/product\-/gi)) {
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

  getProudctById(id) {
    let path = [this.path, "product-", id, ".json"].join("");
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

  addNewProduct(data) {
    let product = this.product;
    Object.assign(product, data);
    this.index = this.index + 1;

    product.id = this.index;

    this.updateIndexer(this.index);
    let filePath = [this.path, "product-", this.index, ".json"].join("");

    files.writeFile(filePath, JSON.stringify(product));
  }

  deleteProduct(id) {
    let filePath = [this.path, "product-", id, ".json"].join("");
    console.log(filePath);
    files.deleteFile(filePath);

    return true;
  }
}

module.exports = Products;
