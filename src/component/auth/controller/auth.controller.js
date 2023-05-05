import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from "../../../../DB/model/user.model.js";
import { confirmemail } from "../../../service/email.js";

export const singup = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await userModel.findOne({email}).select("email");
        //console.log(user);
        if(user){
          res.status(409).json({message:'email is exit'});
        }else{
          const hash = await bcrypt.hash(password,parseInt(process.env.SALTROUNT));
          //res.json(hash)
          const newUser = new userModel({ username:name, email, password: hash });
          //res.json(newUser)
          const token = jwt.sign({id:newUser._id},process.env.PASSWORDTOKEN,{expiresIn:60*60*24})
          //res.json(token)
          const link = `${req.protocol}://${req.headers.host}${process.env.URL}auth/confirmemail/${token}`;
          //res.json(link)
          const message = `<a href=${link}> click to confirm </a>`
          //console.log(message)
          const info = await confirmemail(email, "confirm email", message);
          //res.json(info)
          if (info.accepted.length) {
            const savedUser = await newUser.save();
            res.status(201).json({ message: "success", savedUser: savedUser._id });
          } else {
            res.status(404).json({ message: "email is reject" });
          }
    }       
 
  }catch(error){
    res.status(500).json({message:"error",err:error.message});
  }
}

export const confirmEmail = async(req,res)=>{
    try{
        const {token} = req.params
        const decoded = jwt.verify(token,process.env.PASSWORDTOKEN);
        if (decoded.id) {
            const user = await userModel.findOneAndUpdate(
              { _id: decoded.id, confrimEmail: false },
              { confrimEmail: true }
            );
            res.status(201).json({ message: "done" });
          } else {
            res.status(400).json({ message: "invalid payload" });
          }
    }catch(error){
        res.status(500).json({message:"error...",err:error.message})
    }
}

export const singin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            res.status(401).json({message:"email not exit"});
        }else{
            if(!user.confrimEmail){
                res.status(400).json({message:"confirm your email"});
            }else{
                const match = await bcrypt.compare(password,user.password);
                if (!match) {
                    res.status(400).json({ message: "invalid password" });
                  } else {
                      const token = jwt.sign({ id:user._id }, process.env.TOKENSIGN, {
                      expiresIn: 60 * 60 * 24
                    });
                    res.status(200).json({ message: "success", token });
                  }
            }
        }
    }catch(error){
        res.status(500).json({message:'error',err:error.me})
    }
   
}