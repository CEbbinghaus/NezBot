const db = require("vsqlite");
const dataBase = new db();
module.exports = {
	help: {
		use: `db [change] [table]* [value1] ([value2]) #`,
		extra: `changes can be : edit, delete & add
		value1 is the name and value 2 is the value.
		e.g db edit  (zeal) (does something else)`,
		desk: "lets you modify the database",
		perms: ["ADMINISTRATOR"]
	},
	run: function(c, args, m){
		if(!m.member.hasPermission(this.help.perms) && !m.author.isDev)return m.react("❌");
		dataBase.open("MSL", "./databases").then(mb => {
			let r = /\((.+)\)/gi.exec(args.join(" "));
			//if(!r)return m.react("❌");
			mb.listTables().then(async t => {
			if(t.has(args[1])){
				let table = t.get(args[1])
				switch(args[0]){
					case "edit":
						if(r[1])return m.react("❌");
						await table.edit("name='" + args[2] + "'", "value='" + r[1] + "'");
					break;
					case "delete":
						table.delete("name='"+args[2]+"'")
					break;
					case "add":
						if(!r[1])return m.react("❌");
						table.write(["name", "value"], [args[2], r[1]])
					break;
					default:
						return m.react("❌");
			}
		}else {
			m.react("❌")
			return m.channel.send(`the table ${r[1]} does not exist!`)
		}
			m.react("✅");
		})
		})
	}
}