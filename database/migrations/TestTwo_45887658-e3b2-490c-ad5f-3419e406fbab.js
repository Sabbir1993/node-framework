const Migration = require("../Migration");


module.exports = class TestTwo {
    up(){
        var schema = new Migration('test_two')
        return schema.id()
            .end()
    }
}