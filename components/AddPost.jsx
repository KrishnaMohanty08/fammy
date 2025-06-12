import { fetchData } from 'next-auth/client/_utils';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AddPost = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState();
  const [post, setPost] = useState(false);

  const tags = ['love', 'english', 'advice', 'french', 'american'];

  const setDefault = () => {
    reset({
      "title": "",
      "discription": "",
      "tags": ""
    });
  };

  const onSubmit = async (data) => {
    console.log("Submitting data:", data);
    try {
      const res = await fetch('/api/posts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      console.log(result);
      setSubmitted(true);
    } catch (error) {
      console.log("ERROR creating new post", error);
    }
  };

  useEffect(() => {
    if (submitted) {
      setDefault();
      setSubmitted(false);
      fetchData();
    }
  }, [submitted]);

  return (
    <div className="ml-40 m-4 text-xl">
      <Accordion className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl shadow-lg">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-white" />}
          aria-controls="add-post-content"
          id="add-post-header"
          className="bg-gray-700 bg-opacity-50"
        >
          <h2 className="text-2xl font-semibold text-pink-800">Add New Post</h2>
        </AccordionSummary>
        <AccordionDetails className="bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col mx-4">
              <div className="mb-4">
                <label className="text-md text-gray-200">Title</label>
                <input
                  type="text"
                  {...register("title", { required: true, minLength: { value: 4, message: "Minimum 4 characters" } })}
                  className="w-full mt-1 p-2 text-sm border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Give your story a title"
                />
                {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>}
              </div>
              <div className="mb-4">
                <label className="text-md text-gray-200">Description</label>
                <textarea
                  {...register("discription", { required: true, minLength: { value: 10, message: "Minimum 10 characters" } })}
                  className="w-full mt-1 p-2 text-sm border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your story..."
                  rows="4"
                />
                {errors.discription && <p className="text-xs text-red-400 mt-1">{errors.discription.message}</p>}
              </div>
              <div className="mb-4">
                <label className="text-md text-gray-200">Tags</label>
                <select
                  {...register("tags", { required: true })}
                  className="w-full mt-1 p-2 text-sm border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="text-gray-400">Select some relevant tags</option>
                  {tags.map((tag, idx) => (
                    <option key={idx} value={tag} className="text-white">
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end p-4">
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
              >
                POST
              </button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AddPost;