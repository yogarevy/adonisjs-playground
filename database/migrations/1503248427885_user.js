'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.uuid('id').primary().notNullable().unique()
      table.string('name', 50).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('phone', 15).nullable()
      table.text('image').nullable()
      table.integer('status', 16).nullable().defaultTo(1).comment('1/0')
      table.integer('is_main', 16).nullable().defaultTo(0).comment('1/0')
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
