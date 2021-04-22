'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.uuid('id').primary().notNullable().unique()
      table.string('username', 150).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 15).nullable()
      table.string('country', 150).nullable()
      table.string('city', 150).nullable()
      table.string('postcode', 50).nullable()
      table.string('name', 50).notNullable()
      table.text('address').nullable()
      table.uuid('last_modified_by').nullable()
      table.uuid('deleted_by').nullable()
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
