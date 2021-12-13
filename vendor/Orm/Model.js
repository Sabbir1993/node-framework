const { sqlResult } = require("../helper");
const Log = require("../Log");
const QueryBuilder = require("./QueryBuilder");
const mysql = require('mysql')
module.exports = class Model {
  #queryBuilder
  constructor(tableName) {
    this.#queryBuilder = new QueryBuilder(tableName)
  }

  selectRaw(string) {
    this.#queryBuilder.selectItems = string
    return this
  }

  leftJoin(table, tableKey, parentKey) {
    this.#queryBuilder.leftJoinCondition = ` left join ${table} on ${tableKey} = ${parentKey}`;
    return this
  }

  join(table, tableKey, parentKey) {
    this.#queryBuilder.joinCondition = ` join ${table} on ${tableKey} = ${parentKey}`;
    return this
  }

  where(key, type, value) {
    if (this.#queryBuilder.getQueryString.includes("where")) {
      this.#queryBuilder.whereCondition = `and ${key} ${type} ${mysql.escape(value)}`;
    } else {
      this.#queryBuilder.whereCondition = `where ${key} ${type} ${mysql.escape(value)}`;
    }
    return this
  }

  whereNotNull(key) {
    if (this.#queryBuilder.getQueryString.includes("where")) {
      this.#queryBuilder.whereNotNullCondition = `and ${key} is not null`;
    } else {
      this.#queryBuilder.whereNotNullCondition = `where ${key} is not null`;
    }
    return this
  }

  whereNull(key) {
    if (this.#queryBuilder.getQueryString.includes("where")) {
      this.#queryBuilder.whereNullCondition = `and ${key} is null`;
    } else {
      this.#queryBuilder.whereNullCondition = `where ${key} is null`;
    }
    return this
  }

  whereIn(key, value) {
    if (typeof value === 'string') {
      if (this.#queryBuilder.getQueryString.includes("where")) {
        this.#queryBuilder.whereInCondition = `and ${key} in (${value})`;
      } else {
        this.#queryBuilder.whereInCondition = `where ${key} in (${value})`;
      }
    } else if (Array.isArray(value)) {
      if (this.#queryBuilder.getQueryString.includes("where")) {
        this.#queryBuilder.whereInCondition = `and ${key} in ('${value.join("','")}')`
      } else {
        this.#queryBuilder.whereInCondition = `where ${key} in ('${value.join("','")}')`
      }
    } else {
      var err = new Error('Type must be comma separate string or array')
      global.next(err)
    }
    return this
  }

  whereNotIn(key, value) {
    if (typeof value === 'string') {
      if (this.#queryBuilder.getQueryString.includes("where")) {
        this.#queryBuilder.whereNotInCondition = `and ${key} not in (${value})`;
      } else {
        this.#queryBuilder.whereNotInCondition = `where ${key} not in (${value})`;
      }
    } else if (Array.isArray(value)) {
      if (this.#queryBuilder.getQueryString.includes("where")) {
        this.#queryBuilder.whereNotInCondition = `and ${key} not in ('${value.join("','")}')`
      } else {
        this.#queryBuilder.whereNotInCondition = `where ${key} not in ('${value.join("','")}')`
      }
    } else {
      var err = new Error('Type must be comma separate string or array')
      global.next(err)
    }
    return this
  }

  whereBetween(key, value) {
    if (this.#queryBuilder.getQueryString.includes("where")) {
      this.#queryBuilder.whereBetweenCondition = `and ${key} between ${mysql.escape(value[0])} and ${mysql.escape(value[1])}`;
    } else {
      this.#queryBuilder.whereBetweenCondition = `where ${key} between ${mysql.escape(value[0])} and ${mysql.escape(value[1])}`;
    }
    return this
  }

  groupBy(key) {
    this.#queryBuilder.groupByCondition = ` group by ${key}`;
    return this
  }

  orderBy(key) {
    this.#queryBuilder.orderByCondition = ` order by ${key}`;
    return this
  }

  limit(value) {
    this.#queryBuilder.limitCondition = ` limit ${mysql.escape(value)}`
    return this
  }

  offset(value) {
    this.#queryBuilder.offsetCondition = ` offset ${mysql.escape(value)}`
    return this
  }

  query(){
    var queryString = `${this.#queryBuilder.selectPrepend} ${this.#queryBuilder.getQueryString}`
    return queryString
  }

  async count(key = null) {
    try {
      var queryString = `select ${key ? 'count('+key+')' : 'count(*)' } as agg_count_from_db from ${this.#queryBuilder.schemaName} ${this.#queryBuilder.getQueryString}`
      var data = await sqlResult(queryString);
      return data[0] ? data[0].agg_count_from_db : 0
    } catch (err) {
      global.next(err)
    }
  }

  async all() {
    try {
      var queryString = `${this.#queryBuilder.selectPrepend} ${this.#queryBuilder.getQueryString}`
      var data = await sqlResult(queryString)
      return data;
    } catch (err) {
      global.next(err)
    }
  }

  async get() {
    try {
      var queryString = `${this.#queryBuilder.selectPrepend} ${this.#queryBuilder.getQueryString}`
      var data = await sqlResult(queryString)
      return data;
    } catch (err) {
      global.next(err)
    }
  }

  async paginate(value) {
    var {page} = global?.req?.query
    page === undefined ? page = 1 : null
    try {
      var data = {}
      data.totalitems = await this.count()
      data.pages = Math.ceil(data.totalitems / value)
      data.currentPage = page
      data.perpage = value
      var queryString = `${this.#queryBuilder.selectPrepend} ${this.#queryBuilder.getQueryString} limit ${(page*value) - value}, ${value}`
      data.items = await sqlResult(queryString)
      return data;
    } catch (err) {
      global.next(err)
    }
  }

  async first() {
    try {
      var queryString = `${this.#queryBuilder.selectPrepend} ${this.#queryBuilder.getQueryString}`
      var data = await sqlResult(queryString);
      return data.length ? data[0] : null
    } catch (err) {
      global.next(err)
    }
  }

  async find(id) {
    try {
      var queryString = `${this.#queryBuilder.selectPrepend} where id = ${id}`
      var data = await sqlResult(queryString);
      return data.length ? data[0] : null
    } catch (err) {
      global.next(err)
    }
  }

  async pluck(key) {
    try {
      this.#queryBuilder.pluckValue = `${key}`
      var queryString = this.#queryBuilder.getQueryString
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
      var query = `insert into ${this.#queryBuilder.schemaName} (`
      keys.forEach((key, index) => {
        if (index === (keys.length - 1)) {
          query += ` ${'`'+key+'`'}) values (`
        } else {
          query += `${'`'+key+'`'}, `
        }
      })
      keys.forEach((key, index) => {
        if (index === (keys.length - 1)) {
          if (typeof data[key] === 'string') {
            query += `${data[key] ? mysql.escape(data[key]) : null})`
          } else {
            query += `${data[key] ? data[key] : null})`
          }
        } else {
          if (typeof data[key] === 'string') {
            query += `${ data[key] ? mysql.escape(data[key]) : null}, `
          } else {
            query += `${ data[key] ? data[key] : null }, `
          }
        }
      })
      await sqlResult(query)
      return data;
    } catch (err) {
      Log.debug(`Error Query On create ===> ${query}`)
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
      var query = `insert into ${this.#queryBuilder.schemaName} (`
      keys.forEach((key, index) => {
        if (index === (keys.length - 1)) {
          query += ` ${'`'+key+'`'}) values (`
        } else {
          query += `${'`'+key+'`'}, `
        }
      })
      datas.forEach(async (data, index1) => {
        keys.forEach((key, index) => {
          if (index === (keys.length - 1)) {
            if (typeof data[key] === 'string') {
              query += `${mysql.escape(data[key])})`
            } else {
              query += `${data[key]})`
            }
          } else {
            if (typeof data[key] === 'string') {
              query += `${mysql.escape(data[key])}, `
            } else {
              query += `${data[key]}, `
            }
          }
        })
        if (index1 !== (datas.length - 1)) {
          query += `, (`
        }
      })
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
            this.#queryBuilder.updateQuery = `${'`'+key+'`'} = ${ data[key] ? mysql.escape(data[key]) : null }`
          } else {
            this.#queryBuilder.updateQuery = `${'`'+key+'`'} = ${ data[key] ? data[key] : null} `
          }
        } else {
          if (typeof data[key] === 'string') {
            this.#queryBuilder.updateQuery = `${'`'+key+'`'} = ${ data[key] ? mysql.escape(data[key]) : null },`
          } else {
            this.#queryBuilder.updateQuery = `${'`'+key+'`'} = ${ data[key] ? data[key] : null }, `
          }
        }
      })
      if (data.id) {
        this.where('id', '=', data.id)
      }
      var updateQuery = `${this.#queryBuilder.updatePrepend} ${this.#queryBuilder.updateQueryString} ${this.#queryBuilder.getQueryString}`
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
          this.where(key, '=', sData[key].replace("'", ''))
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
              this.#queryBuilder.updateQuery = `${'`'+key+'`'} = ${mysql.escape(eData[key])}`
            } else {
              this.#queryBuilder.updateQuery = `${'`'+key+'`'} = ${eData[key]} `
            }
          } else {
            if (typeof eData[key] === 'string') {
              this.#queryBuilder.updateQuery = `${'`'+key+'`'} = ${mysql.escape(eData[key])},`
            } else {
              this.#queryBuilder.updateQuery = `${'`'+key+'`'} = ${eData[key]}, `
            }
          }
        })
        await skeys.forEach((key) => {
          this.where(key, '=', sData[key].replace("'", ''))
        })

        var updateQuery = `${this.#queryBuilder.updatePrepend} ${this.#queryBuilder.updateQueryString} ${this.#queryBuilder.getQueryString}`
        await sqlResult(updateQuery);
      } else {
        this.create(eData)
      }
    } catch (err) {
      Log.debug(`Error Query On update or create ===> ${this.#queryBuilder.updatePrepend} ${this.#queryBuilder.updateQueryString} ${this.#queryBuilder.getQueryString}`)
      global.next(err)
    }
  }

  async firstOrCreate(data) {
    try {
      var existedData = null
      if ((typeof data === 'object') && !data.length) {
        var keys = Object.keys(data)
        await keys.forEach((key) => {
          this.#queryBuilder.where(key, '=', data[key])
        })
        existedData = await this.#queryBuilder.first()
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
}