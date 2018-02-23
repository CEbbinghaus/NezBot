const stats = require("../stats.json");
const db = require("../classes/db.js")
const dataBase = new db();
const {RichEmbed} = require("discord.js");
module.exports = {
	help: {
		use: "capture",
		desk: "gives you info on the current capture event",
		perms: []
	},
	run: (c, args, m, b, o) => {
		dataBase.open("MSL").then(async d => {
			let t = d.open("extra");
			t.read('value', {name:c}).then(v => {
				if(!v)return m.channel.send(`sorry there is currently no capture event running`);
				let e = new RichEmbed();
				e.setColor("#2E55AF")
				.addField("Capture Event:", v[0].value);
				m.channel.send(e);
			})
		})
	}
}
