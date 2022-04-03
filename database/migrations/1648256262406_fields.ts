import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Fields extends BaseSchema {
  protected tableName = 'fields'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.enum('type', ['futsal', 'mini soccer', 'basketball']).notNullable()
      table.integer('venue_id').notNullable().unsigned()
      table.foreign('venue_id').references('venues.id')

      table.timestamps(true, true)

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
