const { optionsSQLite3 } = require('./options/config.js');
const knex = require('knex')(optionsSQLite3);

knex.schema.createTable('products', table => {
	table.increments('id')
	table.string('title')
	table.string('price')
	table.string('thumbnail')
})
	.then(() => console.log('Table created'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())
