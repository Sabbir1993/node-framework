var fs = require("fs");
var dir = "./app/models";
var migrationDir = "./database/migrations";
const { v4: uuidv4 } = require("uuid");
const decamelize = require("decamelize");

class MakeMigrationModel {
  constructor(modelName) {
    this.makeMigrationModel(modelName);
  }

  makeMigrationModel(modelName) {
    var dirLog = modelName.split("/");
    var name = dirLog[dirLog.length - 1];
    var fileName = `${name}_${uuidv4()}`;
    if (dirLog.length > 1) {
      dirLog.splice(-1, 1);
      dir = `${dir}/${dirLog.join("/")}`;
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    var mDir = `${migrationDir}/${fileName}.js`;
    var fileDir = `${dir}/${name}.js`;
    if (fs.existsSync(mDir)) {
      console.log(
        "\x1b[41m",
        `${fileName} already exist in directory`,
        "\x1b[0m"
      );
      process.exit();
    } else if (fs.existsSync(fileDir)) {
      console.log(
        "\x1b[41m",
        `${fileName} already exist in directory`,
        "\x1b[0m"
      );
      process.exit();
    } else {
      fs.createWriteStream(fileDir, { flags: "a" });
      fs.createWriteStream(mDir, { flags: "a" });
      this.modelCode(fileDir, name);
      this.migrationCode(mDir, name);
    }
  }

  modelCode(name, modelName) {
    var Code = `const Model =  require('../../vendor/Orm/Model')

module.exports = class ${modelName} extends Model{\r\n
constructor(){
    super() /* provide table name here */
}
}\r\n`

    fs.appendFile(name, Code, function (err) {
      if (err) {
        console.log('\x1b[41m', err, '\x1b[0m');
        process.exit()
      };
      console.log('\x1b[32m', `${modelName} model file created`, '\x1b[0m');
      process.exit()
    });
  }

  migrationCode(name, className) {
    var Code = `const Migration = require("../Migration");\r\n
    
module.exports = class ${className} {
    up(){
        var schema = new Migration('${decamelize(className)}')
        return schema.id()
            .end()
    }
}`;
    var tempFilename = name.split('/')
    tempFilename = tempFilename[tempFilename.length - 1]
    fs.appendFile(name, Code, function (err) {
      if (err) {
        console.log("\x1b[41m", err, "\x1b[0m");
        process.exit();
      }
      console.log("\x1b[32m", `${tempFilename} model file created`, "\x1b[0m");
      process.exit();
    });
  }
}

module.exports = MakeMigrationModel;
