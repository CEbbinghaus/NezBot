const fs = require("fs");

class DataBase{
  constructor(n = null) {
		let sql = require("sqlite");
    this.dataBase = sql;
    if(n)this.open(n);
		return this
  }
  async open(n, c) {
    await this.dataBase.open(`./databases/${n}.sqlite`);
		this.tables;
		this.t = new Table(this.dataBase);
		await this.dataBase.all("SELECT name FROM sqlite_master WHERE type = 'table'").then(async r => {
			let ts = new Map();
			await r.forEach(async v => {
				await ts.set(v.name, this.t.open(v.name))
			});
			this.tables = ts
		});
    return (typeof c == 'function') ?  c(this): console.error("i need a callback");
  }
	async createTable(n, v, c){
		return typeof c == 'function' ? c(this.t.create(n, v)) : typeof v == 'object' ? console.error("I need a callback") : console.error("you need to define a object and callback");
	}
	openTable(n, c){
		return  (typeof c == 'function') ?  c(this.t.open(n)): console.error("i need a callback");
	}
	async dropTable(n){
		await this.dataBase.run("DROP TABLE IF EXISTS " + n);
		return this 
	}
}

class Table {
	constructor(sql, db) {
	    this.sql = sql;
			this.dataBase = db;
	}
	create(n, o, c) {
		n = n.split(" ").join("");
    let d = [];
    for (let i in o) {
        d.push(`${i} ${CheckVar(o[i])}`)
    }
    this.tableName = n;
    this.sql.run(`CREATE TABLE IF NOT EXISTS ${n} (${d.join(", ")})`).then(v => {
			//console.log(v);
		})
		//console.log(c ? c(this) : this)
    return this;
	}
	open(n) {
	    this.tableName = n;
			return this;
	}

	read(g,s) {
		let query = `SELECT ${g.length == 0 ? "*" : g} FROM ${this.tableName}`
		if(s)query += " WHERE " + s;
		return this.sql.all(query)
	}
	async write(n, d) {
		await this.sql.run(`INSERT INTO ${this.tableName} (${n.join(", ")}) VALUES (${n.map(() => {return "?"}).join(", ")})`, d);
		return this;
	}
 delete(n){
	 return this.sql.run(`DELETE  FROM ${this.tableName} WHERE ${n}`)
 }
 drop(n){
	 return this.sql.run("DROP TABLE IF EXISTS " + this.tableName);
 }
}

const CheckVar = v => {
  switch (typeof v) {
    case "string":
      return "VARCHAR"
      break;
    case "number":
      return v.toString().indexOf(".") == -1 ? "INTEGER" : "DECIMAL"
      break;
    case "boolean":
      return "BOOLEAN";
      break;
    default:
      throw "Unrecognized Data Type."
  }
}


module.exports = DataBase;