require('dotenv').config();
module.exports = {
  "development": {
    "username": "root",
    "password": "",
    "database": "secret_south",
    "host": process.env.DEVELOPMENT_DB_HOST,
    "dialect": "mysql",
    "operatorsAliases": 0,
    "logging": true,
    "pool": {
      "max": 100,
      "min": 0,
      "idle": 200000,
      "acquire": 1000000
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PRODUCTION_DB_USER,
    "password": process.env.PRODUCTION_DB_PASS,
    "database": process.env.PRODUCTION_DB,
    "host": process.env.PRODUCTION_HOST,
    "dialect": "mysql",
    "operatorsAliases": 0,
    "logging": false,
    "pool": {
      "max": 100,
      "min": 0,
      "idle": 200000,
      "acquire": 1000000
    }
  }
};
