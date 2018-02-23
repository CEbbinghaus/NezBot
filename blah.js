const settings = require("./settings.json")
const c=new (require("discord.js")).Client();
c.on("ready",()=>{console.log("hi i'm alive\nhi alive i'm bot")});
c.on("message",m=>{
	let r = /im\s(.+)/gi.exec(m)[1]
	r &&	m.channel.send(`hi ${r}, i'm ${c.user.username}`)
	
});
c.login(settings.token);