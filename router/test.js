var myMod = require('./router-mangoose');

var Users = require('../mongo/users');

Users.find({

    username: 'nkosi'

}, (err, user) => {
    console.log(user);
})

/*var user = new Users({
    username:'nkosi',
    password: 'test'
})
*/