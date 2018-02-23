const db = require("../../classes/db.js");
const DataBase = new db();
const {RichEmbed} = require("discord.js");


module.exports.stat = async (args, m) => {
	await DataBase.open("MSL").then(async db => {
			let k = args.shift();
			let table = db.open(k)
			let res = [];
			await table.read(args.length ? "value" : "name", args.join(" ").length > 1 ? "name = '" + args.join(" ") + "'" : undefined).then(v => {res = v.map(k => args.length ? k.value : k.name)})
			let all = res.length > 1;
			if(!res.length)return m.channel.send("sorry that doesnt exist")
			let e = new RichEmbed()
				.setColor("#D333FF")
				.addField(all ? TUC(k) + "'s:" : TUC(args.join(" ")), (all ? "```" : "") + res.join("\n") + (all ? "```" : ""));
			m.channel.send(e);
})
}

function TUC(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
