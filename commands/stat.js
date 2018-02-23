const s = require("./func/stat.js")
module.exports = {
	help: {
		use: "stat [stat type] [stat name]*",
		desk: "gives you information on different stats",
		perms: []
	},
	run: (c, args, m) => {
		s.stat(args, m)
	}
}
