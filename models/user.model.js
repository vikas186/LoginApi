const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        default : null
    },
    email : {
        type : String,
        default : null
    },
    password : {
        type : String,
        default : null
    },
    phone : {
        type : Number,
        default : null
    }
    
});
const user = new mongoose.model('Users', schema);

module.exports = user;