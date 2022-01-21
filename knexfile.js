// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/movies.db3'
    }
  },
  production:{
    client: 'sqlite3',
    connection: {
      filename: './data/movies.db3'
    }
  },

  useNullAsDefault: true

};
