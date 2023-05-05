import  jwt  from "jsonwebtoken";
import { userModel } from "../../DB/model/user.model.js";

export const auth = (accessRole = []) =>{
    return async(req,res,next)=>{
        try{
            //res.json("test");
            let {token} = req.headers;
            //console.log(token);
            if(!token.startsWith(process.env.KEY)){
                res.status(400).json({message:'invalid bearer key'});
            }else{
                //res.status(200).json({message:'succes',token});
                 token = token.split(process.env.KEY)[1];
                 //res.json(token)
                 const decoded = jwt.verify(token,process.env.TOKENSIGN);
                 const user = await userModel.findById(decoded.id).select("role");
                // res.json(user);
                if(user){
                    if(user.blocked){
                        res.status(400).json({messgae:'blocked account'});
                    }else{
                        if(!accessRole.includes(user.role)){
                            res.status(403).json({messgae:'not auth user'});    
                        }
                        req.user=user;
                        next();
                    }
                }else{
                    res.status(400).json({message:'not register user'});
                }
            }
        }catch(error){
            res.status(500).json({message:'error',err:error.message});
        }
    }
}