const { name, version } = require('../package.json')

module.exports = args => {
  console.log(`${name} (v${version})`)
}
