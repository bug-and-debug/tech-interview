if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const config = require('./../config');

/**
 * Connect to MongoDB and set global variable `db` to the connected database instanc
 */
global.mongoose = require('mongoose');
global.mongoose.connect(config.db.connectionString, { useMongoClient: true, promiseLibrary: Promise });
