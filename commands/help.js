const {RichEmbed} = require("discord.js");
const stats = require("../stats.json");
const fs = require("fs");
const setMsg = require("./func/setMsg.js")
module.exports = {
	help : {
		use: "help",
		desk: "sends you all the commands avaliable to you",
		perms:[]
	},
	run: (c, args, m, b, o) => {
		if(args.length > 0){
			let h = require(`./${args[0]}.js`).help;
			return m.channel.send(`**${args[0]}:**\n\`\`\`${h.use}\`\`\`\`\`\`${h.desk}\`\`\``.addInfo())
		}else{
			let e = new RichEmbed()
			.setTitle("Help")
			.setColor("#34ff74")
			.addField("Intro:", "Hi! I'm Nez! I'm kinda like an astromon... But I know alot about status effects and passives! That nerdy guy told me about them and so did that pink girl. You can ask me anything about them, I should remember right.")
			let r = "";//'```\n';
			fs.readdir('./commads/', (err, files) => {
				if(err){
					m.reply("Im sorry i ran into an error. react with ❓ to send a error report to the dev").then(mg => {mg.react("❓");setMsg.setErrReact(b, mg, m, "❓", err.toString());})
					return 
				}
				files.forEach((f, i) => {
					if(!f.endsWith(".js"))return files.splice(i, 1);
					let h = require("./" + f).help;
					r += `${f.slice(0, f.length - 3)}:\n${h.desk}\n\n`;
				})
				e.addField("Commands:", r + "\n\n")
				r = "";
				for(let o in stats.stats){
					r += "**" + o + ":**\n```"
					for(let s in stats.stats[o]){
						r += s + ', ';
					}
					r += "```\n"
				}
				e.addField("Passive Pool:", r);
				m.author.send(e).then(() => {
					m.react("✅");
				});
			})
		}
	}
}
String.prototype.addInfo = function(n = null){
	return this + (n ? "\n" : "") + "* means its optional";
}
