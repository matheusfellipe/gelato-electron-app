import { Knex, knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './data.db',
  },
};

export const knexInstance = knex(config);

