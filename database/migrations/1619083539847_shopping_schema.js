'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShoppingSchema extends Schema {
  up () {
    this.create('shoppings', (table) => {
      table.uuid('id').primary().notNullable().unique()
      table.string('name').notNullable()
      table.uuid('last_modified_by').nullable()
      table.uuid('deleted_by').nullable()
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('shoppings')
  }
}

module.exports = ShoppingSchema
