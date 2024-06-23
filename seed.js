const User = require('./src/models/User')
const { faker }= require('@faker-js/faker');

const seedUser = (noOfUser =5)=>{
    for(let i = 0 ; i<noOfUser;i++){
        const user= new User({
            name:faker.person.fullName(),
            email:faker.internet.email(),
            password:faker.internet.password()
        })

        user.save()
    }
}


module.exports = {seedUser}