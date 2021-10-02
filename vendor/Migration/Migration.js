const SchemaBluePrint = require ("./SchemaBluePrint")

module.exports = class Migration extends SchemaBluePrint{
    constructor(schemaName){
        super(schemaName)
    }

    id(){
        this.query = `id bigint unsigned NOT NULL AUTO_INCREMENT, PRIMARY KEY (id)`
        this.lastColumn = 'id'
        return this
    }

    string(key, size){
        if(this.lastColumn){
            this.query =`${key} varchar(${size})`
        } else {
            this.query =`,${key} varchar(${size})`
        }
        this.lastColumn = key
        return this
    }

    number(key, size = null){
        if(this.lastColumn){
            this.query =`${key} int${size ? '('+size+')' : ''}`
        } else {
            this.query =`,${key} int${size ? '('+size+')' : ''}`
        }
        this.lastColumn = key
        return this
    }

    bigInt(key, size = null){
        if(this.lastColumn){
            this.query =`${key} bigint${size ? '('+size+')' : ''}`
        } else {
            this.query =`,${key} bigint${size ? '('+size+')' : ''}`
        }
        this.lastColumn = key
        return this
    }

    tinyInt(key, size = null){
        if(this.lastColumn){
            this.query =`${key} tinyint${size ? '('+size+')' : ''}`
        } else {
            this.query =`,${key} tinyint${size ? '('+size+')' : ''}`
        }
        this.lastColumn = key
        return this
    }

    timestamp(){
        this.query = ` timestamp`
        return this
    }

    unique(key = null){
        if(key){
            this.queryOptions = `, UNIQUE KEY ${this.schemaName}_${key}_unique (${key})`
        } else {
            this.queryOptions = `, UNIQUE KEY ${this.schemaName}_${this.lastColumnName}_unique (${this.lastColumnName})`
        }
        return this
    }

    autoIncrement(){
        this.query = ` AUTO_INCREMENT`
        return this
    }

    default(value){
        this.query = ` DEFAULT '${value}'`
        return this
    }

    nullable(){
        this.query = ` DEFAULT NULL`
        return this
    }

    notnull(){
        this.query = ` NOT NULL`
        return this
    }

    primarykey(key){
        this.queryOptions = `, PRIMARY KEY (${key})`
        return this
    }

    end(){
        var finalQuery = this.querySting
        if(!this.querySting.includes('PRIMARY KEY')){
            finalQuery += `, PRIMARY KEY (${this._lastColumn})) AUTO_INCREMENT=1`
        } else {
            finalQuery += `) AUTO_INCREMENT=1`
        }
        return finalQuery
    }
}