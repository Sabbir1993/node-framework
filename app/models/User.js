const Model =  require('../../vendor/Orm/Model')

module.exports = class User extends Model{

    constructor(){
        super('users') /* provide table name here */
    }
}
