const menus = {
  main: `
      moltin-to-algolia [command] <options>
  
      version ............ show package version
      help ............... show help menu for a command
      import ............. import moltin data into algolia
      `,
  import: `
      moltin-to-algolia import <options>
  
      <options> = products,brands,categories,collections,orders,customers
      
      ie.         moltin-to-algolia import
      e.g.        moltin-to-algolia import products
      or          moltin-to-algolia import products,brands,categories
      `
}

module.exports = args => {
  const subCmd = args[0] === 'help' ? args[1] : args[0]
  console.log(args)
  console.log(menus[subCmd] || menus.main)
}
