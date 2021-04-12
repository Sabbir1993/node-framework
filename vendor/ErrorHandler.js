const fs = require('fs')
var date = new Date()
cDate = `${date.getFullYear()}_${('0'+ (date.getMonth() + 1)).substr(-2)}_${('0'+ date.getDate()).substr(-2)}`
var LogFile = `./logs/${cDate}_log.log`

if(!fs.existsSync(LogFile)){
    fs.createWriteStream(LogFile, {flags: 'a'})
}

exports.ErrorHandle = (err, req, res, next) => {
    if(err.status !== 200) {
        const logDate = new Date()
        fs.appendFile(LogFile, `${logDate.toLocaleString()}  |||| Error : |||| ${err.stack} \r\n`, function (err) {
            if (err) return console.log(err);
        });
    }
    switch (err.status) {
        case 404 :
            return res.render('error/404',{layout: false})
        case 405 :
            return res.render('error/405',{layout: false})
        case 500 :
            return res.render('error/500', {
                layout: false,
                error: err.stack.split(/\r?\n/)
            });
        default:
            return res.render('error/500', {
                layout: false,
                error: err.stack.split(/\r?\n/)
            });
    }
}
