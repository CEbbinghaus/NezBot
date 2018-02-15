const {Client, RichEmbed} = require("discord.js");

const settings = require("./settings.json")

const bot = new Client();

let debug = true;

bot.on("ready", () => {
	console.log(`I am up and running on ${bot.guilds.size} servers`);
})

bot.on("message", m => {
	if(m.author.bot)return;
	if(!m.content.startsWith(settings.prefix) || !m.content.endsWith(settings.suffix))return;
	let args = m.content.slice(settings.prefix.length, m.content.length - settings.suffix.length).split(" ");
	let command = args.shift();
	let o;
	switch(command){

	}
	try{
		let cmd = require(`./commands/${command.toLowerCase()}.js`);
		cmd.run(command, args, m, bot, o);
	}catch(err){
		!debug ? m.channel.send("Sorry there is no command with the name: " + command) : console.log(err);
	}
})



bot.login(settings.token);
// let t = "!auto adrenaline"
//
// let m = {
// 	channel:{
// 		send: v => {
// 			console.log("tried to send: \n", v)
// 		}
// 	}
// }
//
// let args = t.slice(settings.prefix.length, t.length - settings.suffix.length).split(" ");
// let command = args.shift();
// console.log(`./commands/${command.toLowerCase()}.js`)
// try{
// 	let cmd = require(`./commands/${command.toLowerCase()}.js`);
// 	cmd.run(command, args, m);
// }catch(err){
// 	console.log(err);
// 	//m.channel.send("Sorry there is no command with the name: " + command);
// }
