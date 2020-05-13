module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "url": process.env.DATABASE_URL,
  "port": 5432,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "entities": ['dist/models/*.js'],
  "migrations": [
    "dist/database/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
