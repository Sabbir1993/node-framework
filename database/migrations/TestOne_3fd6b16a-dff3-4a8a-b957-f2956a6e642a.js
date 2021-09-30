const Migration = require("../Migration");


module.exports = class TestOne {
    up(){
        var schema = new Migration('test_one')
        return schema.id()
            .end()
    }
}