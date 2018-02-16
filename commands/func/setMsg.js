module.exports = {
	setErrReact: (b, m, ms, r, e) => {
		let M = {
			aid: ms.author.id,
			om: ms,
			react: r,
			err: e,
			msg: m
		};
		b.fetchApplication().then(a => M.owner = a.owner);
		M.send = function(){
			this.owner.send(this.err);
			this.msg.react("✅").then(async () => {
				await this.msg.delete(10000)
				this.om.delete()
			});
		}
		b.servers.get(m.guild.id).reacts.set(m.id, M)
	}
}
