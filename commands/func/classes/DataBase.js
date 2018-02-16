const fs = require("fs");
const sql = require("sqlite");

class DataBase extends sql{
	constructor(n = null){
		this._dataBase = sql;
		if(n)this.open(n);
		return this;
	}
	open(n){
		fs.readFile(`./${n}.sqlite`).then(e => {
			if(e)return;
		})
		this._currentTable = new Table(this._dataBase);
		this._dataBase.open(`./${n}.sqlite`);
	}
}

class Table{
	constructor(sql){
		this.sql = sql;
	}
	create(n, o){
		let d = [];
		for(let i in o){
			d.push(`${i} ${CheckVar(o[i])}`)
		}
		this._tableName = n;
		this.sql.run(`CREATE TABLE IF NOT EXISTS ${n} (${d.join(", ")})`)
	}
	open(n){
		this._tableName = n;
	}

	read(v){

	}
	write(v){

	}
}

const CheckVar = v => {
	switch(typeof v){
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