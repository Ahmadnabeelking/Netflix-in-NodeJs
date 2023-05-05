import {model,Schema, Types} from 'mongoose'

const moivesSchema = new Schema({
  Title:{
    type:String,
    required:true,
    unique:true
},
  Year:{
    type:String
},
  RunTime:String,

  Writer:{
    type:String
},
  Actors:{
    type:String
},
  Poster:{
    type:String
},
  Trailer:{
    type:String
},
  Language:{
    type:String
},
public_id:String,
slug:String,
},{timestamps:true ,toJSON:{virtuals:true},toObject:{virtuals:true}})

moivesSchema.virtual('genre',{
   ref:'genre',
   localField:'_id',
   foreignField:'moviesId',
})

export const moivesModel = model('moives',moivesSchema);