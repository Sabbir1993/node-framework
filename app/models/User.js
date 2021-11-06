const Model =  require('../../vendor/Orm/Model')

module.exports = class User extends Model{

    constructor(data){
        super('users') /* provide table name here */
        this.attributes = data
    }

    getNameAttribute () {
        console.log(this.attributes.name.toUpperCase())
    }
}
