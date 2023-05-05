import {model ,Schema,Types} from 'mongoose'

const generSchema = new Schema({
    name:{
        type:String ,
        required:true
    },
    moviesId:{
        type:Types.ObjectId,
        ref:'moives',
        required :true
    }
},{timestamps:true})

export const generModel = model ('genre',generSchema);