const { name, version } = require('../package.json')

module.exports = args => {
  console.log(`Particular. ${name} (v${version})`)
}
