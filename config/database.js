module.exports = {
    'connection' : `mongodb://${process.env.DB_SERVER ?? '127.0.0.1'}:${process.env.DB_PORT ?? '27017'}/${process.env.DB_NAME ?? 'homestead'}`
}
