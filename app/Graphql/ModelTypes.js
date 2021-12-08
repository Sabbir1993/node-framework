const graphql = require ('graphql')
const {GraphQLNonNull} = require("graphql");
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql

exports.UserType = {
    type: new GraphQLObjectType({
        name: "User",
        fields: () => ({
            id: {type:GraphQLInt},
            name: {type:GraphQLString},
            email: {type:GraphQLString},
            msisdn: {type:GraphQLString},
            password: {type:GraphQLString}
        })
    }),
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)},
        email: {type:new GraphQLNonNull(GraphQLString)},
        msisdn: {type:new GraphQLNonNull(GraphQLString)},
        password: {type:GraphQLString}
    }
}