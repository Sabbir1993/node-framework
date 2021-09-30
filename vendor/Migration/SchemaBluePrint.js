module.exports = class SchemaBluePrint{
    constructor(schemaName){
        this._schemaName = schemaName
        this._lastColumn = null
        this.funCount = 0
        this._queryOptions = null
        this._query = `CREATE TABLE ${this._schemaName} (`
    }

    set query(query){
        this._query += query 
    }

    set queryOptions(query){
        this._queryOptions += query
    }

    set lastColumn(value){
        this._lastColumn = value
    }

    get querySting(){
        return this._query += this._queryOptions
    }

    get lastColumnName(){
        return this._lastColumn
    }

    get schemaName(){
        return this._schemaName
    }
}