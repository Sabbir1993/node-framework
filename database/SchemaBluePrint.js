module.exports = class SchemaBluePrint{
    constructor(schemaName){
        this._schemaName = schemaName
        this._lastColumn = null
        this.funCount = 0
        this._query = `CREATE TABLE ${this._schemaName} (`
    }

    set query(query){
        this._query += query 
    }

    set lastColumn(value){
        this._lastColumn = value
    }

    get querySting(){
        return this._query
    }

    get lastColumnName(){
        return this._lastColumn
    }
}