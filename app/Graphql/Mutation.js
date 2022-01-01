const graphql = require ('graphql')
const {GraphQLList} = require("graphql");
const {GraphQLObjectType} = graphql
const User = require('../models/User')
const {UserType} = require("./ModelTypes");

module.exports = class Mutation {
    constructor() {
        console.log('mutation')
    }

    static mutation(){
        return new GraphQLObjectType({
            name: "Mutation",
            fields: {
                createUser: {
                    type: UserType.type,
                    args: UserType.args,
                    async resolve(parent, args) {
                        let user = await new User().create({
                            name: args.name,
                            email: args.email,
                            msisdn: args.msisdn,
                            password: args.password
                        })
                        return user
                    }
                }
            }
        })
    }
}