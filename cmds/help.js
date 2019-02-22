const menus = {
  main: `
      moltin-to-algolia [command] <options>
  
      version ............ show package version
      help ............... show help menu for a command
      import ............. import moltin data into algolia
      `,
  import: `
      moltin-to-algolia import <options>
  
      --location, -l ..... the location to use
      `
}

module.exports = args => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0]

  console.log(menus[subCmd] || menus.main)
}
