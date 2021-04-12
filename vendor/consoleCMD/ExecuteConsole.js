const MakeController = require('./MakeController')
const MakeRequest = require('./MakeRequest')
const MakeModel = require('./MakeModel')
const availableCommands = ['make:controller', 'make:request', 'make:model']
var argv = process.argv

module.exports = class ExecuteConsole {
    constructor() {
        this.init()
    }

    init(){
        if(argv.length !== 4){
            console.log('\x1b[41m', 'Invalid Command','\x1b[0m');
            process.exit()
        }

        if(!availableCommands.includes(argv[2])) {
            console.log('\x1b[41m', "Invalid Command. \r\n Related command 'make:controller', 'make:request', 'make:model'",'\x1b[0m');
            process.exit()
        } else {
            this.executeCMD(argv[2], argv[3])
        }
    }

    executeCMD(command, name){
        switch(command) {
            case 'make:controller':
                var result = new MakeController(name)
                break;
            case 'make:request':
                var result = new MakeRequest(name)
                break;
            case 'make:model':
                var result = new MakeModel(name)
                break;
            default:
                console.log('\x1b[41m', "Invalid Command. \r\n Related command 'make:controller', 'make:request', 'make:model'",'\x1b[0m');
                process.exit()
        }
    }

}
