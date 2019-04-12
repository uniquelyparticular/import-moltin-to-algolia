require('dotenv').config()
const { createClient } = require('@moltin/request')
const algoliasearch = require('algoliasearch')
const cliProgress = require('cli-progress')

module.exports = async args => {
  const algoliaClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  )

  const moltinClient = new createClient({
    client_id: process.env.MOLTIN_CLIENT_ID,
    client_secret: process.env.MOLTIN_CLIENT_SECRET,
    application: 'import-moltin-to-algolia'
  })

  const entities = args[0]
    ? args[0].split(',')
    : ['products', 'brands', 'categories', 'collections', 'orders', 'customers']

  try {
    let indexed = []
    for (let entity of entities) {
      const progressBar = new cliProgress.Bar(
        { stopOnComplete: true },
        cliProgress.Presets.shades_classic
      )
      let itemOffset = 0,
        currentPage = 0,
        totalPages = 1,
        pageSize = 100

      while (currentPage < totalPages) {
        const response = await moltinClient.get(
          `${entity}?page[offset]=${currentPage * pageSize}`
        )
        const data = response.data
        const meta = response.meta

        itemOffset = meta.page.offset
        pageSize = meta.page.limit
        currentPage = meta.page.current
        totalPages = meta.page.total

        // {
        //     data: data,
        //     meta: {
        //         page: {
        //             total: totalPages,
        //             offset: itemOffset,
        //             limit: pageSize,
        //             current: currentPage
        //         }
        //     }
        // }

        if (currentPage <= 1) {
          console.log(`\nIndexing: ${meta.results.total} ${entity}`)
          progressBar.start(meta.results.total, 0)
        }

        // remove last 2 in entity name to match webhook entity names
        const algoliaIndex = algoliaClient.initIndex(entity.slice(0, -1))

        let subIndexed = await data.map(moltinObject => {
          let { id: objectID, ...rest } = moltinObject
          let algoliaObject = { objectID, ...rest }

          return algoliaIndex.addObject(algoliaObject).then(() => {
            progressBar.increment()
            return algoliaObject
          })
        })
        indexed.push(Promise.all(subIndexed))
      }
    }
    Promise.all(indexed).then(finished => {
      const total = finished.reduce((total, amount) => {
        return total.concat(amount)
      }, []).length

      console.log(`\n\nIndex complete of: ${total} items`)
      process.exit(0)
    })
  } catch (errors) {
    console.error(errors)
  }
}
