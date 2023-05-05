import { generModel } from "./../../../../DB/model/genre.model.js";

export const createGenre = async (req, res) => {
  try {
    const { name, moviesId } = req.body;
    const gener = (
      await generModel.create({ name, moviesId}))
    if (!gener) {
      return res.status(400).json({ message: "fail to add gener" });
    } else {
      return res.status(201).json({ msesage: "done", gener });
    }
  } catch (error) {
    return res.status(500).json({ message: "error", err: error.message });
  }
};

export const updateGener = async (req,res) =>{
    try{
        const {id} = req.params;
        const updateGnere = await generModel.findByIdAndUpdate(id,req.body).populate({
            'path':'moviesId'
        })
       if(updateGnere){
        return res.status(201).json({message:"done",updateGnere});
       }else{
        return res.status(400).json({message:"there are any problem ....."});
       }
    }catch(error){
        return res.status(500).json({message:"error ....",err:error.message});
    }
   
}
