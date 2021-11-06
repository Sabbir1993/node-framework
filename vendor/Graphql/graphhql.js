const {graphqlHTTP} = require ('express-graphql')
const {GraphQLSchema} = require("graphql");
const Query = require('../../app/Graphql/Query')
const Mutation = require('../../app/Graphql/Mutation')

class Graphql{
    constructor(app) {
        this.init(app)
    }

    init(app){
        let schema = new GraphQLSchema({query: Query.query(), mutation: Mutation.mutation()})
        app.use('/graphql', graphqlHTTP({
            schema,
            graphiql: true
        }))
    }
}

module.exports = Graphql