const graphql = require ('graphql')
const {GraphQLList, GraphQLNonNull} = require("graphql");
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql
const {UserType} = require('./ModelTypes')
const User = require('../models/User')

module.exports = class Query {
    constructor() {
        console.log('query')
    }

    static query(){
        return  new GraphQLObjectType({
            name: 'RootQueryType',
            fields:{
                getAllUsers: {
                    type: new GraphQLList(UserType.type),
                    args: {},
                    async resolve(parent, args){
                        return await new User().all()
                    }
                },
                getSingleUser: {
                    type: UserType.type,
                    args: {id:{type: new GraphQLNonNull(GraphQLInt)}},
                    async resolve(parent, args){
                        return await new User().find(args.id)
                    }
                }
            }
        })
    }
}