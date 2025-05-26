const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser : true}).then(
        ()=>{
            console.log("connected to db");
        }).catch(
            (error)=>{
                console.log(error);
            }
        )
}

module.exports = connectToDB;