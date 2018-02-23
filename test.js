let test = require("./commands/func/classes/db.js");
let dataBase = new test();
process.on('unhandledRejection', console.error)
dataBase.open("test").then(async db => {
	await db.listTables().then(console.log);
	db.listTables().then(tables => {
		console.log(tables);
		let t = tables.get("test")
		t.read(null , "id=1").then(console.log)
});
	// db.create("test", {id: 1, name: "test", value: 0.1}).then(t => {
	// 	t.write(['id', 'name', 'value'], [1, "chris", 0.4])
	// })
}) 
