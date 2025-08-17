import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";
dotenv.config();

const postRoutes = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

postRoutes.route("/").get(async (req, res) => {
    try {
        const post  = await Post.find({})
        res.status(200).json({post})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
});

postRoutes.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({ name, prompt, photo: photoUrl.url });
    res.status(201).json({ newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default postRoutes;
