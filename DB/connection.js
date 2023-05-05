import mongoose from 'mongoose';

const conntDB = async ()=>{
   
    return await mongoose.connect(process.env.URLCONNECT)
    .then(res => {
        console.log("connected");
    }).catch(err => {
       console.log(`error .. ${err}`);
    });
}


export default conntDB; 