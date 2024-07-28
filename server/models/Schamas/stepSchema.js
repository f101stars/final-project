const mongoose = require('mongoose')

const stepSchema = mongoose.Schema({
title:{
    type:String,
    required:true
},
body:String
},{
    timestamps: true
})

module.exports = stepSchema