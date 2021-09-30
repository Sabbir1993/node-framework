const Migration = require("../Migration");


module.exports = class Test {
    up(){
        var schema = new Migration('test')
        return schema.id()
            .end()
    }
}