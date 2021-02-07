module.exports = {
    "type": "postgres",
    "host": process.env.NODE_ENV === 'production' ? 'localhost' : '192.168.2.176',
    "port": 5432,
    "username": "blog",
    "password": "",
    "database": process.env.NODE_ENV === 'production' ? "blog_production" : "blog_development",
    "synchronize": false,
    "logging": false,
    "entities": [
        "dist/entity/**/*.js"
    ],
    "migrations": [
        "dist/migration/**/*.js"
    ],
    "subscribers": [
        "dist/subscriber/**/*.js"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}