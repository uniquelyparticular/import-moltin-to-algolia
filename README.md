# @particular./import-moltin-to-algolia

[![npm version](https://badge.fury.io/js/%40particular.%2Fimport-moltin-to-algolia.svg)](https://badge.fury.io/js/%40particular.%2Fimport-moltin-to-algolia)

# Import Moltin data to Algolia

This example demonstrates how you can import products, brands, categories, collections, orders and/or customers to Algolia from Moltin through a Command Line Interface (CLI).

## How to use locally

When running this example locally you'll want to be careful not to exceed you Algolia limits for catalog size.

### 1. Download the example

Clone the repository:

```bash
git clone git@github.com:uniquelyparticular/import-moltin-to-algolia.git
```

Install dependencies with Yarn (or NPM)

```bash
cd import-moltin-to-algolia
yarn
```

### 2. Configure Algolia

In this example we will import data to [Algolia](https://www.algolia.com). You will need an account an account to continue.

Once you've signed up to Algolia, create a new app and give it a name.

Next head to the `API keys` section and make a note of your `Application ID` and `Admin API Key`, we will need these next.

### 3. Configure your ENV variables

You will want to create an `.env` inside the directory `/import-moltin-to-algolia` containing all the keys for the below:

```shell
ALGOLIA_APP_ID=
ALGOLIA_API_KEY=
MOLTIN_CLIENT_ID=
MOLTIN_CLIENT_SECRET=
```

`MOLTIN_CLIENT_ID` and `MOLTIN_CLIENT_SECRET` are available in your [Moltin Dashboard](https://dashboard.moltin.com).

### 4. Run the application

_NOTE: make sure that you've installed the dependencies in Step 1._

Ensure that the executable has proper permissions to run from the command line.

```bash
chmod +x ./bin/import-moltin-to-algolia
```

Execute the import command to import ALL of your products, brands, categories, collections, orders and customers into Algolia

_NOTE: you can also run the import command with any subset of those entities to limit what is imported_

Full import (run the following command):

```bash
./bin/import-moltin-to-algolia
```

Partial import (run the following command specifying a comma seperated list w/o spaces of entities to index):

```bash
./bin/import-moltin-to-algolia products,brands
```

_NOTE: available entities to import: products,brands,categories,collections,orders,customers_

### 5. Check your app in Algolia

Go to the app you've set up in Algolia's Dashboard (https://www.algolia.com/apps/[ALGOLIA_APP_ID]) and check the new indexes created. There should be one index created for each entity type imported.

You can then configure any specific Configuration data for that Index in Algolia to help further optimize search.

_NOTE: it is reccomended that you adjust the Searchable Attribute Configuration for each index to only seach on specific fields._

That's it...have fun and take a look at Alogolia's [InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/) from here to build an amazing front end for your indices!

### 6. Set up automated ongoing index updates from Moltin to Algolia

There is already a fantastic bit of code that does just this using Moltin's [Observable WebHooks](https://docs.moltin.com/advanced/events) that is fully compatible with the indices generated above. To set up the webhooks to automate create/update/delete entries in your index, please follow the instructions at the following:

https://github.com/moltin/integration-examples/tree/master/sync-catalog-to-algolia

_Contact [Adam Grohs](https://www.linkedin.com/in/adamgrohs/) @ [Particular.](https://uniquelyparticular.com) for any questions._
