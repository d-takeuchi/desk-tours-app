module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  seeds: ['dist/seeds/*.seed.js'],
  synchronize: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
}
