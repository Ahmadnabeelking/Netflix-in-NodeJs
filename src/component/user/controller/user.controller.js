import { userModel } from './../../../../DB/model/user.model.js';
import bcrypt from 'bcrypt';

export const updatepassword = async(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    const user = await userModel.findById( req.user._id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if(!match){
        return res.status(400).json({message:"In-Valid Password"});
    }else{
        bcrypt.hash(newPassword, 8, async function(err, hash) {
            await userModel.findByIdAndUpdate({_id:user._id},{password:hash});
           return res.status(201).json({message:"Done , password updated succesfully",match});
        });
    }

}