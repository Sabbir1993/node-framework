module.exports = class QueryBuilder {
  constructor(tableName) {
    this._name = tableName;
    this._query = '';
    this._updateQuery = '';
    this._selectPrepend = `select * from ${this._name}`
    this._updatePrepend = `update ${this._name} set`
  }

  set selectItems(query){
    this._selectPrepend = this._selectPrepend.replace('*', query)
  }

  set leftJoinCondition(query){
    this._query = `${this._query} ${query}`
  }

  set joinCondition(query){
    this._query = `${this._query} ${query}`
  }

  set whereCondition(query){
      this._query = `${this._query} ${query}` 
  }

  set whereNotNullCondition(query){
    this._query = `${this._query} ${query}`
  }

  set whereNullCondition(query){
    this._query = `${this._query} ${query}`
  }

  set whereBetweenCondition(query){
    this._query = `${this._query} ${query}`
  }

  set whereInCondition(query){
    this._query = `${this._query} ${query}`
  }

  set groupByCondition(query){
    this._query = `${this._query} ${query}`
  }

  set limitCondition(query){
    this._query = `${this._query} ${query}`
  }

  set offsetCondition(query){
    this._query = `${this._query} ${query}`
  }

  set orderByCondition(query){
    this._query = `${this._query} ${query}`
  }

  set pluckValue(query){
    var tempQuery = `select ${query} from (${this.selectPrepend} ${this._query}) as temporaryobservationtable`
    this._query = tempQuery
  }

  set updateQuery(query){
    this._updateQuery +=  query
  }
  
  get getQueryString(){
    return this._query
  }

  get schemaName(){
    return this._name
  }

  get updateQueryString(){
    return this._updateQuery
  }
  
  get selectPrepend(){
    return this._selectPrepend
  }

  get updatePrepend(){
    return this._updatePrepend
  }
}
