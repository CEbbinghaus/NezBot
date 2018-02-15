const stats = require("../../stats.json");
const {RichEmbed} = require("discord.js");
module.exports.stat = (c, args, m) => {
	let e = new RichEmbed();
	if(!args.length > 0){
		//e.setTitle(TUC(c))
		e.setColor("#D333FF");
		let M = "```";
		for(let v in stats.stats[c]){
			M += TUC(v) + "\n"
		}
		M += "```";
		e.addField(TUC(c + "'s:"), M)
		return m.channel.send(e)
	}else if(!stats.stats[c][args.map(v => v.toLowerCase()).join(" ")])return m.channel.send(`The ${c} ${args.map(v => v.toLowerCase()).join(" ")} does not exist`);
	e.setColor("#6F2E56")
	.addField(TUC(args.join(" ")) + ":",  stats.stats[c][args.map(v => v.toLowerCase()).join(" ")]);
	m.channel.send(e);
}

function TUC(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
