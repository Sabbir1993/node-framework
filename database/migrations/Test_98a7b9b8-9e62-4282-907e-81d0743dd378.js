const Migration = require("../../vendor/Migration/Migration");


module.exports = class Test {
    up(){
        var schema = new Migration('test')
        return schema.id()
            .string('name',191).unique()
            .end()
    }
}