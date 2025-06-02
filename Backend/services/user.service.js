const userModel = require('../models/user.model');

module.exports.createUser = async (
    {firstname,lastname,email,password})=>{
        console.log(firstname);
        console.log(lastname);
        console.log(email);
        console.log(password)
        if (!firstname || !email || ! password){
            throw new Error("All Fields are Required");
        }
        const user = await userModel.create({
            fullname : {
                firstname,
                lastname
            },
            email,
            password
        })
        
        return user;
    }