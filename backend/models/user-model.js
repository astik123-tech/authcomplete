const mongoose = require('mongoose')

const userShema = mongoose.Schema({ 
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    created_at: {
        type: String,
        default: new Date()
    },
    updated_at: {
        type: String,
        default: new Date()
    }
})

const users = mongoose.model('users', userShema)
module.exports=users