const s = require("./func/stat.js")
module.exports = {
	help: {
		use: "buff [buff name]",
		desk: "gives you information on a buff stat",
		perms: []
	},
	run: (c, args, m) => {
		s.stat(c, args, m)
	}
}
