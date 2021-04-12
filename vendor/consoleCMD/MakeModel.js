var fs = require('fs');
var dir = 'app/models'

class MakeModel{
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
        var Code = `const mongoose = require('mongoose')

const ${modelName}Schema = new mongoose.Schema({\r\n
    name: {
        type: String,
        required: true,
        trim: true
    },
});\r\n
const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema)`
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

module.exports = MakeModel
