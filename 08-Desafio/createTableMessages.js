const { optionsMariaDB } = require('./options/config.js');
const knex = require('knex')(optionsMariaDB);

knex.schema.createTable('messages', table => {
	table.increments('id')
	table.string('email')
	table.string('mensaje')
	table.string('fecha')
})
	.then(() => console.log('Table created'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy()) 