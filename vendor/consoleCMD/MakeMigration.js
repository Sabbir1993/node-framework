var fs = require("fs");
var dir = "./database/migrations";
const { v4: uuidv4 } = require("uuid");
const decamelize = require("decamelize");

class MakeMigration {
  constructor(modelName) {
    this.makeMigration(modelName);
  }

  makeMigration(modelName) {
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
    var fileDir = `${dir}/${fileName}.js`;
    if (fs.existsSync(fileDir)) {
      console.log(
        "\x1b[41m",
        `${fileName} already exist in directory`,
        "\x1b[0m"
      );
      process.exit();
    } else {
      fs.createWriteStream(fileDir, { flags: "a" });
      this.migrationCode(fileDir, name);
    }
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
    fs.appendFile(name, Code, function (err) {
      if (err) {
        console.log("\x1b[41m", err, "\x1b[0m");
        process.exit();
      }
      console.log("\x1b[32m", `${name} model file created`, "\x1b[0m");
      process.exit();
    });
  }
}

module.exports = MakeMigration;
