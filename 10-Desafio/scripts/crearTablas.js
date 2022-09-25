import knex from 'knex'
import config from '../src/config.js'

// opciones SQL: mariaDb, sqlite3

crearTablasProductos(knex(config.sqlite3))
crearTablasCarritos(knex(config.sqlite3))

//------------------------------------------

async function crearTablasProductos(sqlClient) {
    
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
}

//------------------------------------------

async function crearTablasCarritos(sqlClient) {
    
}