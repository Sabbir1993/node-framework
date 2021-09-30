module.exports = class QueryBuilder {
  constructor(tableName) {
    this._name = tableName;
    this._query = `select * from ${tableName}`;
  }

  set selectItems(query){
    this._query = this._query.replace('*', query)
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
    var tempQuery = `select ${query} from (${this._query}) as temporaryobservationtable`
    this._query = tempQuery
  }

  get getQueryString(){
    return this._query
  }
}
