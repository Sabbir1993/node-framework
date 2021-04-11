var path = require('path')
var localStorage = require('local-storage');

exports.trans = (val) => {
    var lang = localStorage.get('lang') ? global.appLocal = localStorage.get('lang') : 'en'

    var tempFile = val.split('.')
    var tempOutput = val
    var transFile = require(path.join(__dirname,`../../resources/lang/${lang}/${tempFile[0]}`))
    var tempIndex = transFile
    tempFile.forEach((element, key) => {
        if(key > 0) {
            tempIndex = tempIndex[element]
        }
    })

    return tempIndex ?? tempOutput
}

exports.section = function(name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
}
