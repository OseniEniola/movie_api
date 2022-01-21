
exports.up = function(knex) {
    return knex.schema.createTable('Movie_Comments', tbl =>{
        tbl.uuid('id').primary().index()
        tbl.string('message',500).notNullable()
        tbl.integer('episode').notNullable()
        tbl.string('ip')
        tbl.timestamp('created_at', { useTz: true })
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Movie_Comments')
  };
  