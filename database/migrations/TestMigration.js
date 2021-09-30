const Migration = require("../Migration");

module.exports = class TestMigration {
    up(){
        var schema = new Migration('TestFromMigration')
        return schema.id()
            .string('name', 191).default('sabbir')
            .bigInt('employee_id').default(111111)
            .end()
    }

    // down()
    // {
    //     Schema::dropIfExists('users');
    // }
}