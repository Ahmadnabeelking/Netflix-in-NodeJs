import cloudinary from "./../../../service/cloudinary.js";
import { moivesModel } from "./../../../../DB/model/movies.model.js";
import slugify from "slugify";

export const add = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "poster is required" });
    } else {
      const { Title, Year, Actors, Language } = req.body;
      const slug = slugify(Title);
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `Netfix/moives` }
      );
      const movies = await moivesModel.create({
        Poster: secure_url,
        Title,
        slug,
        public_id,
        Year,
        Actors,
        Language,
      });
      if (!movies) {
        return res.status(400).json({ message: "fail to add movies" });
      } else {
        return res.status(201).json({ msesage: "done", movies });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "error", err: error.message });
  }
};

export const update = async (req, res) => {
  try {
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `Netfix/moives` }
      );
      req.body.Poster = secure_url;
      req.body.public_id = public_id;
    }
    const { id } = req.params;

    if (req.body.Title) {
      req.body.slug = slugify(req.body.Title);
    }
    const updateMives = await moivesModel.findByIdAndUpdate(id, req.body, {
      new: false,
    });
    if (req.file) {
      await cloudinary.uploader.destroy(updateMives.public_id);
    }
    if (!updateMives) {
      return res.status(400).json({ message: "fail to add category.." });
    } else {
      return res.status(200).json({ message: "success", updateMives });
    }
  } catch (error) {
    return res.status(500).json({ message: "error .... ", err: error.message });
  }
};

export const deleteMovies = async (req, res) => {
  try {
    const { id } = req.params;
    //res.json(id);
    const delMovies = await moivesModel.findByIdAndRemove({ _id: id });
    if (delMovies) {
      // const findmoive = await moivesModel.findByIdAndRemove(id);
      const del = await cloudinary.uploader.destroy(delMovies.public_id);
      res.status(201).json({ message: "done" });
    } else {
      res.status(400).json({ message: "no movies in this id" });
    }
  } catch (error) {
    res.status(500).json({ message: "error ....", err: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const show = await moivesModel.find({}).populate("genre");
    if (show) {
      return res.status(200).json({ message: "moives", show });
    } else {
      return res.status(400).json({ message: "there are problem" });
    }
  } catch (errro) {
    return res.status(500).json({ message: "error ... ", err: error.message });
  }
};