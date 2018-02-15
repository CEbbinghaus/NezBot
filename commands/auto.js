const s = require("./func/stat.js")
module.exports = {
	help: {
		use: "auto [auto name]",
		desk: "gives you information on a auto stat",
		perms: []
	},
	run: (c, args, m) => {
		s.stat(c, args, m)
	}
}
