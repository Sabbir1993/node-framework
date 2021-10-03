const { sqlResult } = require("../Helper");
const Log = require("../Log");
const QueryBuilder = require("./QueryBuilder");
module.exports = class Model extends QueryBuilder {

  constructor(tableName) {
    super(tableName)
  }

  selectRaw(string) {
    this.selectItems = string
    return this
  }

  leftJoin(table, tableKey, parentKey) {
    this.leftJoinCondition = ` left join ${table} on ${tableKey} = ${parentKey}`;
    return this
  }

  join(table, tableKey, parentKey) {
    this.joinCondition = ` join ${table} on ${tableKey} = ${parentKey}`;
    return this
  }

  where(key, type, value) {
    if (this.getQueryString.includes("where")) {
      this.whereCondition = `and ${key} ${type} '${value}'`;
    } else {
      this.whereCondition = `where ${key} ${type} '${value}'`;
    }
    return this
  }

  whereNotNull(key) {
    if (this.getQueryString.includes("where")) {
      this.whereNotNullCondition = `and ${key} is not null`;
    } else {
      this.whereNotNullCondition = `where ${key} is not null`;
    }
    return this
  }

  whereNull(key) {
    if (this.getQueryString.includes("where")) {
      this.whereNullCondition = `and ${key} is null`;
    } else {
      this.whereNullCondition = `where ${key} is null`;
    }
    return this
  }

  whereIn(key, value) {
    if (this.getQueryString.includes("where")) {
      this.whereInCondition = `and ${key} in (${value})`;
    } else {
      this.whereInCondition = `where ${key} in (${value})`;
    }
    return this
  }

  whereBetween(key, value) {
    if (this.getQueryString.includes("where")) {
      this.whereBetweenCondition = `and ${key} between '${value[0]}' and '${value[1]}'`;
    } else {
      this.whereBetweenCondition = `where ${key} between '${value[0]}' and '${value[1]}'`;
    }
    return this
  }

  groupBy(key) {
    this.groupByCondition = ` group by ${key}`;
    return this
  }

  orderBy(key, type) {
    this.orderByCondition = ` order by ${key} ${type}`;
    return this
  }

  limit(value) {
    this.limitCondition = ` limit ${value}`
    return this
  }

  offset(value) {
    this.offsetCondition = ` offset ${value}`
    return this
  }

  async count() {
    try {
      var queryString = `${this.selectPrepend} ${this.getQueryString}`
      this._writeLog(queryString)
      var data = await sqlResult(queryString);
      return data.length
    } catch (err) {
      global.next(err)
    }
  }

  async all() {
    try {
      var queryString = `${this.selectPrepend} ${this.getQueryString}`
      this._writeLog(queryString)
      var data = await sqlResult(queryString)
      return data;
    } catch (err) {
      global.next(err)
    }
  }

  async get() {
    try {
      var queryString = `${this.selectPrepend} ${this.getQueryString}`
      this._writeLog(queryString)
      var data = await sqlResult(queryString)
      return data;
    } catch (err) {
      global.next(err)
    }
  }

  async first() {
    try {
      var queryString = `${this.selectPrepend} ${this.getQueryString}`
      this._writeLog(queryString)
      var data = await sqlResult(queryString);
      return data.length ? data[0] : null
    } catch (err) {
      global.next(err)
    }
  }

  async pluck(key) {
    try {
      this.pluckValue = `${key}`
      var queryString = this.getQueryString
      this._writeLog(queryString)
      var data = await sqlResult(queryString)
      var pluckResult = [];
      pluckResult = await data.map(element => {
        return element[key]
      })
      return pluckResult
    } catch (err) {
      global.next(err)
    }
  }

  async create(data) {
    try {
      var keys = Object.keys(data)
      var query = `insert into ${this.schemaName} (`
      keys.forEach((key, index) => {
        if (index === (keys.length - 1)) {
          query += ` ${key}) values (`
        } else {
          query += `${key}, `
        }
      })
      keys.forEach((key, index) => {
        if (index === (keys.length - 1)) {
          if (typeof data[key] === 'string') {
            query += `'${data[key]}')`
          } else {
            query += `${data[key]})`
          }
        } else {
          if (typeof data[key] === 'string') {
            query += `'${data[key]}', `
          } else {
            query += `${data[key]}, `
          }
        }
      })
      this._writeLog(query)
      await sqlResult(query)
      return data;
    } catch (err) {
      return global.next(err)
    }
  }

  async insert(datas) {
    if (!datas.length) {
      var err = new Error('Data type must be array');
      global.next(err)
    }
    try {
      var keys = Object.keys(datas[0])
      var query = `insert into ${this.schemaName} (`
      keys.forEach((key, index) => {
        if (index === (keys.length - 1)) {
          query += ` ${key}) values (`
        } else {
          query += `${key}, `
        }
      })
      datas.forEach(async (data, index1) => {
        keys.forEach((key, index) => {
          if (index === (keys.length - 1)) {
            if (typeof data[key] === 'string') {
              query += `'${data[key]}')`
            } else {
              query += `${data[key]})`
            }
          } else {
            if (typeof data[key] === 'string') {
              query += `'${data[key]}', `
            } else {
              query += `${data[key]}, `
            }
          }
        })
        if (index1 !== (datas.length - 1)) {
          query += `, (`
        }
      })
      this._writeLog(query)
      await sqlResult(query)
      return datas;
    } catch (err) {
      return global.next(err)
    }
  }

  async update(data) {
    try {
      var keys = Object.keys(data)
      await keys.forEach((key, index) => {
        if (index === (keys.length - 1)) {
          if (typeof data[key] === 'string') {
            this.updateQuery = `${key} = '${data[key]}'`
          } else {
            this.updateQuery = `${key} = ${data[key]} `
          }
        } else {
          if (typeof data[key] === 'string') {
            this.updateQuery = `${key} = '${data[key]}',`
          } else {
            this.updateQuery = `${key} = ${data[key]}, `
          }
        }
      })
      if (data.id) {
        this.where('id', '=', data.id)
      }
      var updateQuery = `${this.updatePrepend} ${this.updateQueryString} ${this.getQueryString}`
      this._writeLog(updateQuery)
      await sqlResult(updateQuery)
    } catch (err) {
      global.next(err)
    }
  }

  async updateOrCreate(sData, eData) {
    try {
      var existedData = null
      var skeys = null
      var eKeys = null
      if ((typeof sData === 'object') && !sData.length) {
        skeys = Object.keys(sData)
        await skeys.forEach((key) => {
          this.where(key, '=', sData[key])
        })
        existedData = await this.first()
      } else {
        var err = new Error('Data type must be object');
        global.next(err)
      }
      if (existedData) {
        eKeys = Object.keys(eData)
        await eKeys.forEach((key, index) => {
          if (index === (eKeys.length - 1)) {
            if (typeof eData[key] === 'string') {
              this.updateQuery = `${key} = '${eData[key]}'`
            } else {
              this.updateQuery = `${key} = ${eData[key]} `
            }
          } else {
            if (typeof eData[key] === 'string') {
              this.updateQuery = `${key} = '${eData[key]}',`
            } else {
              this.updateQuery = `${key} = ${eData[key]}, `
            }
          }
        })
        await skeys.forEach((key) => {
          this.where(key, '=', sData[key], 1)
        })

        var updateQuery = `${this.updatePrepend} ${this.updateQueryString} ${this.getQueryString}`
        this._writeLog(updateQuery)
        await sqlResult(updateQuery);
      } else {
        this.create(eData)
      }
    } catch (err) {
      global.next(err)
    }
  }

  async firstOrCreate(data) {
    try {
      var existedData = null
      if ((typeof data === 'object') && !data.length) {
        var keys = Object.keys(data)
        await keys.forEach((key) => {
          this.where(key, '=', data[key])
        })
        existedData = await this.first()
      } else {
        var err = new Error('Data type must be object');
        global.next(err)
      }
      if (existedData) {
        return existedData;
      } else {
        this.create(eData)
      }
    } catch (err) {
      global.next(err)
    }
  }

  _writeLog(query){
    if(process.env.QUERY_LOG){
      Log.info(`SQL Query ===> ${query}`)
    }
  }
}