const minimist = require('minimist')

module.exports = async () => {
  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'help'
  args._.shift() // remove cmd from args once assigned above to pass others onto cmd

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'version':
      require('./cmds/version')(args._)
      break

    case 'help':
      require('./cmds/help')(args._)
      break

    case 'import':
      require('./cmds/import')(args._)
      break

    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }
}
