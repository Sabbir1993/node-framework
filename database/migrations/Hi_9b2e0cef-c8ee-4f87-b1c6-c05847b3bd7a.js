const Migration = require("../../vendor/Migration/Migration");

    
module.exports = class Hi {
    up(){
        var schema = new Migration('hi')
        return schema.id()
            .end()
    }
}