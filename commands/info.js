const {RichEmbed} = require("discord.js");
module.exports = {
	help:{
		use: 'info',
		desk: 'gives info on the bot',
		perms: []
	},
	run: (c, a, m, b) => {
		let M = b.guilds.get("357862756248190976").members;
		let e = new RichEmbed()
		.setTitle("Info")
		.setColor("#8CD68C")
		.addField("Devs", `${M.get("301584737082802176")} is the sole Programmer of this bot`)
		.addField("Other", `${M.get("218278486362554368")} Provided me with all the info on the Stats & more`)
		.addField("Honerable's", `${M.get("286770422261743616")} Provided me with Colors and Moral Support.`);
		m.channel.send(e).then(M => M.react("⭐"));
	}
}
