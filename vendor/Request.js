const { ErrorHandle } = require("./ErrorHandler")

module.exports = class Request {
    constructor(err, req, res, next){
        this._err = err
        this._req = req
        this._res = res
        this._next = next
        this.handleError()
    }

    handleError(){
        console.log('IN request class');
        ErrorHandle(this._err, this._req, this._res, this._next)
    }
}