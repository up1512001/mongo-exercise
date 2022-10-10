const UserResolver = require('./userResolver')
module.exports = {
    Query:{
        getUser:(_,args) => UserResolver.getUser(args)
    }
}