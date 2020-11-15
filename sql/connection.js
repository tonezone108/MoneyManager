const mysql = require("mysql");

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating mysql connection...");
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: "00000",
        user: "root",
        password: "0000",
        database: "0000"
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
