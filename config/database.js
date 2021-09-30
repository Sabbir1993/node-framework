module.exports = {
    'mongo' : `mongodb://${process.env.DB_SERVER ?? '127.0.0.1'}:${process.env.DB_PORT ?? '27017'}/${process.env.DB_NAME ?? 'homestead'}`,
    'mysql' : {
        host: process.env.DB_SERVER || '127.0.0.1',
        port: process.env.DB_PORT || '3307',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'testfornode',
        timezone: process.env.DB_TIMEZONE || 'asia/dhaka',
        multipleStatements: process.env.DB_MULTI_STATEMENT || true
      }
}