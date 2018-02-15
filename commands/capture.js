const stats = require("../stats.json");
const {RichEmbed} = require("discord.js");
module.exports = {
	help: {
		use: "capture",
		desk: "gives you info on the current capture event",
		perms: []
	},
	run: (c, args, m, b, o) => {
		if(!stats[c])return m.channel.send(`sorry there is currently no capture event running`);
		let e = new RichEmbed();
		e.setColor("#2E55AF")
		.addField("Capture Event:", stats[c])
		m.channel.send(e);
	}
}
