var fs = require('fs');
var dir = 'app/requests'

class MakeRequest{
    constructor(requestName) {
        this.makeRequest( requestName )
    }

    makeRequest(requestName){
        var dirLog = requestName.split('/')
        var name = dirLog[dirLog.length-1]
        if(dirLog.length > 1){
            dirLog.splice(-1,1)
            dir = `${dir}/${dirLog.join('/')}`
        }
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive: true});
        }
        var fileName = `${dir}/${name}.js`
        if(fs.existsSync(fileName)){
            console.log('\x1b[41m', `${requestName} already exist in directory`,'\x1b[0m');
            process.exit()
        } else {
            fs.createWriteStream(fileName, {flags: 'a'})
            this.requestCode(fileName,name)
        }
    }

    requestCode(name, requestName){
        var Code = `const {catchErrorAndReturn} = require('../common/defaultAuth/helper')
const { check } = require('express-validator')

module.exports = [
    //write express-validation code here .....
    ,
    catchErrorAndReturn
]`
        fs.appendFile(name, Code, function (err) {
            if (err)  {
                console.log('\x1b[41m', err,'\x1b[0m');
                process.exit()
            };
            console.log('\x1b[32m', `${requestName} request file created`,'\x1b[0m');
            process.exit()
        });
    }
}

module.exports = MakeRequest
