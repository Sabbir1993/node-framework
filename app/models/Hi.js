const Model =  require('../../vendor/Orm/Model')

module.exports = class Hi extends Model{

constructor(){
    super('hi') /* provide table name here */
}
}
