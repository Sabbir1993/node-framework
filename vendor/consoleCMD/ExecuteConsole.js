const MakeController = require("./MakeController");
const MakeRequest = require("./MakeRequest");
const MakeModel = require("./MakeModel");
const MakeMysqlModel = require("./MakeMysqlModel");
const Migrate = require("./Migrate");
const MakeMigration = require("./MakeMigration");
const MakeMigrationModel = require("./MakeMigrationModel");
const availableCommands3 = ["migrate"];

const availableCommands4 = [
  "make:controller",
  "make:request",
  "make:model",
  "make:mysqlModel",
  "make:migration",
  "make:migrationModel",
];
var argv = process.argv;

module.exports = class ExecuteConsole {
  constructor() {
    this.init();
  }

  init() {
    if (argv.length < 3 || argv.length > 4) {
      console.log(
        "\x1b[41m",
        "Invalid Command. \r\n Related command 'make:controller', 'make:request', 'make:model', 'make:migration', 'make:migrationModel', 'migrate",
        "\x1b[0m"
      );
      process.exit();
    } else if (argv.length === 3 && !availableCommands3.includes(argv[2])) {
      console.log(
        "\x1b[41m",
        "Invalid Command. \r\n Related command 'make:controller', 'make:request', 'make:model', 'make:migration', 'make:migrationModel', 'migrate'",
        "\x1b[0m"
      );
      process.exit();
    } else if (argv.length === 4 && !availableCommands4.includes(argv[2])) {
      console.log(
        "\x1b[41m",
        "Invalid Command. \r\n Related command 'make:controller', 'make:request', 'make:model', 'make:migration', 'make:migrationModel', 'migrate'",
        "\x1b[0m"
      );
      process.exit();
    } else {
      this.executeCMD(argv[2], argv[3]);
    }
  }

  executeCMD(command, name) {
    switch (command) {
      case "make:controller":
        var result = new MakeController(name);
        break;
      case "make:request":
        var result = new MakeRequest(name);
        break;
      case "make:model":
        var result = new MakeModel(name);
        break;
      case "make:mysqlModel":
        var result = new MakeMysqlModel(name);
        break;
      case "make:migration":
        var result = new MakeMigration(name);
        break;
      case "make:migrationModel":
        var result = new MakeMigrationModel(name);
        break;
      case "migrate":
        var result = new Migrate(name);
        break;
      default:
        console.log(
          "\x1b[41m",
          "Invalid Command. \r\n Related command 'make:controller', 'make:request', 'make:model', 'make:migration', 'make:migrationModel', 'migrate'",
          "\x1b[0m"
        );
        process.exit();
    }
  }
};
