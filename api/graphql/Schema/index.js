const {gql} = require('apollo-server-express')

module.exports = gql`
    type User{
        asin:String

    }
    type Query{
        getUser(asin:String):User
        getData(asin:String):User
    }
    
`