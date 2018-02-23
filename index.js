const {Client, RichEmbed} = require("discord.js");

const settings = require("./settings.json")

const sql = require("sqlite");

const bot = new Client();
bot.servers = new Map();

process.features.debug = true

let id;

const handleMessage = m => {
	if(m.author.bot)return;
	if(!m.content.startsWith(settings.prefix) || !m.content.endsWith(settings.suffix))return;
	let args = m.content.slice(settings.prefix.length, m.content.length - settings.suffix.length).split(" ");
	let command = args.shift();
	let o;
	switch(command){

	}
	if(m.author.id == id){
		m.author.isDev = true;
	}
	try{
		let cmd = require(`./commands/${command.toLowerCase()}.js`);
		cmd.run(command, args, m, bot, o);
	}catch(err){
		m.react("❌")
		console.log(err);
	}
}


bot.on("ready", () => {
	bot.fetchApplication().then(o => {
		id = o.owner.id
	})
	bot.guilds.forEach(g => {
		let s = {channels:{}};
		g.channels.forEach(c => {s.channels[g.id] = []});
		s.messages = [];
		s.reacts = new Map();
		bot.servers.set(g.id, s);
	})
	console.log(`I am up and running on ${bot.guilds.size} servers for a total of ${bot.users.size} members`);
})

bot.on("message", m => {
	handleMessage(m)
})

bot.on("messageUpdate", (om, nm) => {
	handleMessage(nm);
})
	
bot.on("messageReactionAdd", r => {
	let m = r.message;
	let f = bot.servers.get(m.guild.id).reacts.get(m.id);
	if(!f || r.users.map(v => v.id).indexOf(f.aid) == -1 /*|| r.emoji != f.r*/) return;
	console.log('sending');
	f.send();
})
process.on('unhandledRejection', console.error)
bot.login(settings.token);

// let stt = require("./commands/db.js")
// let m = {
//   channel:{
//     send: v => {
//       console.log("tried to send: \n", v)
//     }
//   }
// }
// stt.run("db", ["edit", "extra", "(capture)", "(you or your loved one might be eligible for a compensation)"], m)