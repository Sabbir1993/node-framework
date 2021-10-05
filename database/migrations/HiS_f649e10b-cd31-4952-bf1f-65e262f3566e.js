const Migration = require("../../vendor/Migration/Migration");

    
module.exports = class HiS {
    up(){
        var schema = new Migration('hi_s')
        return schema.id()
            .end()
    }
}