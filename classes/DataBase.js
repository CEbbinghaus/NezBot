class DataBase {
	constructor(name) {
		this.dataBase = require("sqlite");
		this.tables;
		this._t; // Why does a DataBase have a Table property?
		if (name) this.open(name);
	}
	createTable(name, value) {
		return this._t.create(name, value);
	}
	openTable(name) {
		return this._t.open(name);
	}
	dropTable(n) {
		return this.dataBase.run("DROP TABLE IF EXISTS " + n);
	}
	async open(n) {
		await this.dataBase.open(`./databases/${n}.sqlite`);
		this._t = new Table(this.dataBase);
		const r = await this.dataBase.all("SELECT name FROM sqlite_master WHERE type = 'table'");
		let ts = new Map();
		let promises = [];
		for (const v of r) {
			promises.push(this._t.open(v.name));
		}
		for (const a of await Promise.all(promises)) {
			ts.set(v.name, a);
		}
		this.tables = ts;
	}
}

class Table {
	constructor(sql, name) {
		this.sql = sql;
		this.tablenName = name;
	}
	create(n, o, c) {
		n = n.split(" ").join("");
		let d = [];
		for (let i in o) {
			d.push(`${i} ${CheckVar(o[i])}`)
		}
		this._tableName = n;
		this.sql.run(`CREATE TABLE IF NOT EXISTS ${n} (${d.join(", ")})`).then(v => {})
		return this;
	}
	open(n) {
		this._tableName = n;
		return this;
	}

	read(g, s) {
		let query = `SELECT ${g.length == 0 ? "*" : g} FROM ${this._tableName}`
		if (s) query += " WHERE " + s;
		return this.sql.all(query)
	}
	async write(n, d) {
		await this.sql.run(`INSERT INTO ${this._tableName} (${n.join(", ")}) VALUES (${n.map(() => {return "?"}).join(", ")})`, d);
		return this;
	}
	delete(n) {
		return this.sql.run(`DELETE  FROM ${this._tableName} WHERE ${n}`)
	}
	drop(n) {
		return this.sql.run("DROP TABLE IF EXISTS " + this._tableName);
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
const SQL = Object.getPrototypeOf(require("sqlite")).constructor;
class Test extends SQL {
	constructor() {
		super(null, {Promise: global.Promise}); // What are these arguments?
	}
	test() {
		console.log("worked");
	}
}

module.exports = DataBase;
module.exports.Test = Test;
