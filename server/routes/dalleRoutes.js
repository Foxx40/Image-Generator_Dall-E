import { Router } from "express";
import dotenv from "dotenv";
import OpenAIApi  from "openai";
import { model } from "mongoose";
dotenv.config()

const  dalleRoutes = Router();
const Client = new OpenAIApi({apiKey: process.env.OPENAI_API_KEY});

dalleRoutes.post('/',async (req,res)=>{
    try {
      const {prompt} = req.body;
      const aiResponse = await Client.images.generate({
        model : "dall-e-2",
        prompt,
        n:1,
        size:"1024x1024",
        response_format:"b64_json",
      })
      const image = aiResponse.data[0].b64_json;
      res.status(200).json({photo : image});
    

    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
})

export default dalleRoutes;
