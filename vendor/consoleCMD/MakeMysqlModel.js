var fs = require('fs');
var dir = 'app/models'

class MakeMysqlModel{
    constructor(modelName) {
        this.makeModel( modelName )
    }

    makeModel(modelName){
        var dirLog = modelName.split('/')
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
            console.log('\x1b[41m', `${modelName} already exist in directory`,'\x1b[0m');
            process.exit()
        } else {
            fs.createWriteStream(fileName, {flags: 'a'})
            this.modelCode(fileName,name)
        }
    }

    modelCode(name, modelName){
        var Code = `const Model =  require('../../vendor/Orm/Model')

module.exports = class ${modelName} extends Model{\r\n
    constructor(){
        super() /* provide table name here */
    }
}\r\n`

        fs.appendFile(name, Code, function (err) {
            if (err) {
                console.log('\x1b[41m', err,'\x1b[0m');
                process.exit()
            };
            console.log('\x1b[32m', `${modelName} model file created`,'\x1b[0m');
            process.exit()
        });
    }
}

module.exports = MakeMysqlModel
