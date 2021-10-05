var dir = './database/migrations'
var glob = require("glob");
const { sqlResultForMigration } = require('../helper');

class Migrate {
    constructor() {
        this.migrate()
    }

    async migrate() {
        var migrationDone = 0
        await glob(`${dir}/*.js`, null, async function (er, files) {
            await files.forEach(async (file) => {
                var fileName = file.split('/')
                fileName = fileName[fileName.length - 1]
                fileName = fileName.replace('.js', '')
                fileName = fileName.replace(/[^a-zA-Z0-9]/g, '')
                var temp = require(`../../${file}`)
                var schema = new temp()
                var query = await schema.up()
                await sqlResultForMigration(query)
                console.log(
                    '\x1b[32m', `${fileName} file mgration done`, '\x1b[0m'
                )
            })
            migrationDone = 1
        })
        if (migrationDone) {
            console.log('asdasd');
            process.exit()
        }
    }
}

module.exports = Migrate