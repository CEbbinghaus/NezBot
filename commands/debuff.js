const s = require("./func/stat.js")
module.exports = {
	help: {
		use: "debuff [debuff name]",
		desk: "gives you information on a debuff stat",
		perms: []
	},
	run: (c, args, m) => {
		s.stat(c, args, m);
	}
}
