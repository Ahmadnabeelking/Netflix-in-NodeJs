import {model,Schema} from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String
    },
    roles:{ 
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    confrimEmail :{
        type:Boolean,
        default:'false'
    }
},{timestamps:true});

export const userModel = model('user',userSchema);