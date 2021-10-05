const SchemaBluePrint = require ("./SchemaBluePrint")

module.exports = class Migration{
    #schemaBluePrint
    constructor(schemaName){
        this.#schemaBluePrint = new SchemaBluePrint(schemaName)
    }

    id(){
        this.#schemaBluePrint.query = `id bigint unsigned NOT NULL AUTO_INCREMENT, PRIMARY KEY (id)`
        this.#schemaBluePrint.lastColumn = 'id'
        return this
    }

    string(key, size){
        if(this.#schemaBluePrint.lastColumn){
            this.#schemaBluePrint.query =`${key} varchar(${size})`
        } else {
            this.#schemaBluePrint.query =`,${key} varchar(${size})`
        }
        this.#schemaBluePrint.lastColumn = key
        return this
    }

    number(key, size = null){
        if(this.#schemaBluePrint.lastColumn){
            this.#schemaBluePrint.query =`${key} int${size ? '('+size+')' : ''}`
        } else {
            this.#schemaBluePrint.query =`,${key} int${size ? '('+size+')' : ''}`
        }
        this.#schemaBluePrint.lastColumn = key
        return this
    }

    bigInt(key, size = null){
        if(this.#schemaBluePrint.lastColumn){
            this.#schemaBluePrint.query =`${key} bigint${size ? '('+size+')' : ''}`
        } else {
            this.#schemaBluePrint.query =`,${key} bigint${size ? '('+size+')' : ''}`
        }
        this.#schemaBluePrint.lastColumn = key
        return this
    }

    tinyInt(key, size = null){
        if(this.#schemaBluePrint.lastColumn){
            this.#schemaBluePrint.query =`${key} tinyint${size ? '('+size+')' : ''}`
        } else {
            this.#schemaBluePrint.query =`,${key} tinyint${size ? '('+size+')' : ''}`
        }
        this.#schemaBluePrint.lastColumn = key
        return this
    }

    timestamp(){
        this.#schemaBluePrint.query = ` timestamp`
        return this
    }

    unique(key = null){
        if(key){
            this.#schemaBluePrint.queryOptions = `, UNIQUE KEY ${this.schemaName}_${key}_unique (${key})`
        } else {
            this.#schemaBluePrint.queryOptions = `, UNIQUE KEY ${this.schemaName}_${this.#schemaBluePrint.lastColumnName}_unique (${this.#schemaBluePrint.lastColumnName})`
        }
        return this
    }

    autoIncrement(){
        this.#schemaBluePrint.query = ` AUTO_INCREMENT`
        return this
    }

    default(value){
        this.#schemaBluePrint.query = ` DEFAULT '${value}'`
        return this
    }

    nullable(){
        this.#schemaBluePrint.query = ` DEFAULT NULL`
        return this
    }

    notnull(){
        this.#schemaBluePrint.query = ` NOT NULL`
        return this
    }

    primarykey(key){
        this.#schemaBluePrint.queryOptions = `, PRIMARY KEY (${key})`
        return this
    }

    end(){
        var finalQuery = this.#schemaBluePrint.querySting
        if(!this.#schemaBluePrint.querySting.includes('PRIMARY KEY')){
            finalQuery += `, PRIMARY KEY (${this._lastColumn})) AUTO_INCREMENT=1`
        } else {
            finalQuery += `) AUTO_INCREMENT=1`
        }
        console.log(finalQuery);
        return finalQuery
    }
}