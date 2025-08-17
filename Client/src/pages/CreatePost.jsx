import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Form, Loading } from "../components";






const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatedImage, setGeneratedImage] = useState(false);
  const [loading, setLoading] = useState(false);



  const generateImage = async() => {
    if(form.prompt){
      try {
        setGeneratedImage(true)
        const Response = await fetch("http://localhost:8080/api/v1/dalle",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({prompt:form.prompt})
        })
        const data = await Response.json();
        setForm({...form, photo:data.photo})
        setGeneratedImage(false)
        console.log(data);
        
      } catch (error) {
        console.log(error)
      }
      finally{
        setGeneratedImage(false)
      }
    }
    else{
      alert('enter a prompt')
    }
  };
  const handleSubmit = async(e) => {
  e.preventDefault();
  if(form.prompt && form.photo){
    setLoading(true)
    try {
 const response = await fetch('http://localhost:8080/api/v1/post ',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(form)
 })
 await response.json();
 navigate('/');
    }
    catch(error)
    {
   alert(error)
    }
    finally{
      setLoading(false)
    }
  }
  else{
    alert('please enter a prompt and image')
  }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }; 

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
      setForm({...form,prompt:randomPrompt})
  };







  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create imaginative and visaully stunning prompts submitted by the
          community stunning images through DALL-E and share them to the
          cummunity
        </p>
      </div>
      <form action="" className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Form
            label="Your Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />
          <Form
            label="Prompt"
            type="text"
            name="prompt"
            placeholder={form.prompt}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
       
        <div
          className="relative bg-gray-50 border border-gray-300 text-gray-900
           text-sm rounded-lg focus:ring-blue-500 
           focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center max-sm:mx-auto"
        >
          {form.photo ? (
            <img
              src={form.photo}
              className="w-full h-full object-contain"
              alt=""
            />
          ) : (
            <img
              src={preview}
              className="w-9/12 h-9/12 object-contain opacity-40"
              alt=""
            />
          )}
          {generatedImage && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loading />
            </div>
          )}
        </div>
        </div>
        <div className="mt-5 max-sm:flex  gap-5 max-sm:flex-col ">
        <button type="button" className="font-medium bg-[#ecEcF1] py-2 px-4 rounded-md text-black" onClick={generateImage}>{generatedImage ? "Generating..." : "Generate"}</button>
       
        </div>
        <div className="mt-2 text-[#666e75] text-[14px] max-sm:flex-col max-sm:flex ">
          <p>Once you have created  the image you want, you can share it with the community</p>
          <button type="submit" className="font-medium bg-[#6385c4] py-2 px-4 rounded-md text-black mt-3">{loading ? "Posting..." : "Post"}</button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
