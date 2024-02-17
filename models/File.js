const mongoose = require('mongoose');

const File = mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports =  mongoose.model('File',File);