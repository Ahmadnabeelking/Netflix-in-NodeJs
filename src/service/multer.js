import multer from 'multer';

export const filevalidtion = {
    image:['image/png','image/jpeg'],
    pdf:['application/pdf'],
}

export const HME = (err,req,res,next)=>{
    if(err){
        res.status(400).json({message:'multer error'});
    }else{
        next();
    }
}

export function myMulter(customeValidation){
    const storage =multer.diskStorage({});
    function fileFilter (req, file, cb) {
        if(!customeValidation.includes(file.mimetype)){
            cb("invaled format",false);
        }else{
            cb(null,true)
        }
    }
    const upload = multer({fileFilter,storage})
    return upload
}