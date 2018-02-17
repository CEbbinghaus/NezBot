const db = require("./commands/func/classes/DataBase.js");
const DataBase = new db();
DataBase.open("reacts", async db => {
	await db.openTable("collecion", async t => {
		await t.write(["id", "content"], ["star", "⭐"])
		await t.read("", "id = 'star'").then(console.log)
		await t.delete("id='star'")
	})
})
process.on('unhandledRejection', console.error)
