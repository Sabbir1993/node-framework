var fs = require('fs');
var dir = 'app/controller'

class MakeController{
    constructor(controllerName) {
        this.makeController( controllerName )
    }

    makeController(controllerName){
        var dirLog = controllerName.split('/')
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
            console.log('\x1b[41m', `${controllerName} already exist in directory`,'\x1b[0m');
            process.exit()
        } else {
            fs.createWriteStream(fileName, {flags: 'a'})
            this.controllerCode(fileName, name)
        }
    }

    controllerCode(name, controllerName){
        var Code = `
exports.index = async (req, res) => { \r\n
}\r\n
exports.create = async (req, res) => {\r\n
}\r\n
exports.store = async (req, res) => {\r\n
}\r\n
exports.view = async (req, res) => {\r\n
}\r\n
exports.edit = async (req, res) => {\r\n
}\r\n
exports.update = async (req, res) => {\r\n
}\r\n
exports.delete = async (req, res) => {\r\n
}`
        fs.appendFile(name, Code, function (err) {
            if (err) {
                console.log('\x1b[41m', err,'\x1b[0m');
                process.exit()
            };
            console.log('\x1b[32m', `${controllerName} controller file created`,'\x1b[0m');
            process.exit()
        });
    }
}

module.exports = MakeController
