const db = require("./func/classes/DataBase.js");
const DataBase = new db();
module.exports = {
	help: {
		use: `db [change] [table]* ([value1]) ([value2]) #`,
		extra: `changes can be : edit, delete & add
		value1 is the name and value 2 is the value.
		e.g db edit (zeal) (does something else)`
		desk: "lets you modify the database",
		perms: ["ADMINISTRATOR"]
	},
	run: (c, args, m) => {
		db.open("MSL", database => {
			switch(args[0]){
				case "edit":
				break;
				case "delete":
				break;
				case "add":
				break;
			}
		})
	}
}