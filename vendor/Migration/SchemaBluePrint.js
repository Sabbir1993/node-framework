module.exports = class SchemaBluePrint {
    #schemaName
    #lastColumn
    #queryOptions
    #query
    constructor(schemaName) {
        this.#schemaName = schemaName
        this.#lastColumn = 'null'
        this.#queryOptions = ''
        this.#query = `CREATE TABLE IF NOT EXISTS ${this.#schemaName} (`
    }

    set query(query) {
        this.#query += query
    }

    set queryOptions(query) {
        this.#queryOptions += query
    }

    set lastColumn(value) {
        this.#lastColumn = value
    }

    get querySting() {
        return this.#query += this.#queryOptions
    }

    get lastColumnName() {
        return this.#lastColumn
    }

    get schemaName() {
        return this.#schemaName
    }
}