const fs = require('fs')
var date = new Date()
cDate = `${date.getFullYear()}_${('0'+ (date.getMonth() + 1)).substr(-2)}_${('0'+ date.getDate()).substr(-2)}`
var LogFile = `./logs/${cDate}_log.log`
if(!fs.existsSync(LogFile)){
    fs.createWriteStream(LogFile, {flags: 'a'})
}


class Log {
    static info(message) {
        var logDate = new Date()
        fs.appendFile(LogFile, `# ${logDate.toLocaleString()} |||| ${process.env.APP_ENV} |||| Info : |||| ${message} \r\n`, function (err) {
            if (err) return console.log(err);
        });
    }

    static warning(message){
        var logDate = new Date()
        fs.appendFile(LogFile, `# ${logDate.toLocaleString()} |||| ${process.env.APP_ENV} |||| Warning : |||| ${message} \r\n`, function (err) {
            if (err) return console.log(err);
        });
    }

    static error(message){
        var logDate = new Date()
        fs.appendFile(LogFile, `# ${logDate.toLocaleString()} |||| ${process.env.APP_ENV} |||| Error : |||| ${message} \r\n`, function (err) {
            if (err) return console.log(err);
        });
    }

    static critical(message){
        var logDate = new Date()
        fs.appendFile(LogFile, `# ${logDate.toLocaleString()} |||| ${process.env.APP_ENV} |||| Critical : |||| ${message} \r\n`, function (err) {
            if (err) return console.log(err);
        });
    }

    static debug(message){
        var logDate = new Date()
        fs.appendFile(LogFile, `# ${logDate.toLocaleString()} |||| ${process.env.APP_ENV} |||| Debug : |||| ${message} \r\n`, function (err) {
            if (err) return console.log(err);
        });
    }
}

module.exports = Log
