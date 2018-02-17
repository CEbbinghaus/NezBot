const stats = require("../../stats.json");
const db = require("./classes/DataBase.js");
const DataBase = new db();
let statss;
const {RichEmbed} = require("discord.js");


module.exports.stat = async (c, args, m) => {
	
	await DataBase.open("MSL",async db => {
		//db.createTable("stats", {type:"", name:"", value: ""}, () => {});
		//db.openTable("stats", v => statss = v);
		//console.log(db.tables);
	// 	for(let n in stats.stats[t]){
	// 		statss.write(["type", "name", "value"], [t, n, stats.stats[t][n]])
	// 	}
		db.openTable(c,async t => {
			// for(let n in stats.stats[T]){
			// 	t.write(["name", "value"], [n, stats.stats[T][n]]);
			// }
			//t.read("").then(console.log)
			//console.log(args.join(" ").length > 1 ? "name = ''" + args.join(" ") + "'" : null)
			let res = [];
			console.log(args.length ? "value" : "name");
			await t.read(args.length ? "value" : "name", args.join(" ").length > 1 ? "name = '" + args.join(" ") + "'" : null).then(v => {res = v.map(k => args.length ? k.value : k.name)})
			let all = res.length > 1;
			if(!res.length)return m.channel.send("sorry that doesnt exist")
			let e = new RichEmbed()
				.setColor("#D333FF")
				.addField(all ? TUC(c) + "'s:" : TUC(args.join(" ")), (all ? "```" : "") + res.join("\n") + (all ? "```" : ""));
			m.channel.send(e);
		})
		// db.createTable(t, {name: "", value: ""}, t => {
		// })
})
	// if(!args.length > 0){
	// 	let M = "```";
	// 	statss.read("")
	// 	M += "```";
	// 	e.addField(TUC(c + "'s:"), M)
	// 	return m.channel.send(e)
	// }else if(!stats.stats[c][args.map(v => v.toLowerCase()).join(" ")])return m.channel.send(`The ${c} ${args.map(v => v.toLowerCase()).join(" ")} does not exist`);
	// e.setColor("#6F2E56")
	// .addField(TUC(args.join(" ")) + ":",  stats.stats[c][args.map(v => v.toLowerCase()).join(" ")]);
	// m.channel.send(e);
}

function TUC(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
