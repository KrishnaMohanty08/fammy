import { fetchData } from 'next-auth/client/_utils';
import React, { useState, useEffect } from 'react'
import { useForm, submitHandler } from 'react-hook-form'
import Accordion from '@mui/material/Accordion'
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
    })
  }

  const onSubmit = async (data) => {
    console.log("Submitting data:", data);
    try {
      const res = await fetch('/api/posts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json()
      console.log(result);
      setSubmitted(true);

    } catch (error) {
      console.log("ERROR creating new post", error)
    }
  }

  useEffect(() => {
    if (submitted) {
      setDefault();
      setSubmitted(false);
      fetchData
    }
  }, [submitted]);



  return (
    <>
      <div className=' ml-40 m-2 mt-15 text-xl bg-gray-500 rounded'>
        <Accordion>
          {/* <h2 className='text-black flex justify-center '>Add New Post</h2> */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="add-post-content"
            id="add-post-header"
          >
            <h2>Add New Post</h2>
          </AccordionSummary>
          <AccordionDetails>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className='mx-2 flex flex-col'>
                <div className='m-2'>
                  <label className='text-md align-center text-black'>Title </label>
                  <input name="name" type='text' {...register("title", { required: true, minLength: { value: 4, message: "minimum 4 characters" } })} className="border text-sm border-black p-1 " placeholder='Give your story a title' />
                  {errors.title && <p className='text-xs text-red-200'>{errors.title.message}</p>}
                </div>
                <div className='m-2'>
                  <label className='text-md align-top text-black'>Discription </label>
                  <textarea className="border text-sm sm:min-w-60 min-w-full border-black p-1 " name="body" type='text' {...register("discription", { required: true, minLength: { value: 10, message: "minimun 10 charaters" } })} placeholder='Your story...' />
                  {errors.discription && <p className='text-xs text-red-200'>{errors.discription.message}</p>}
                </div>
                <div className='m-2'>
                  <label className='text-md align-center text-black'>Tags </label>
                  <select {...register("tags", { required: true })} className="border text-sm border-black p-1 " name="tags">
                    <option value='' className="border text-sm border-black p-1 text-black ">Select some relevant tags</option>
                    {tags.map((tag, idx) => (
                      <option className="border text-sm border-black p-1 text-black " key={idx} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='p-2 flex flex-end'>
                <button type="submit" className="hover:cursor-pointer hover:text-black flex rounded-full bg-red-500 px-3 m-4 " >POST</button>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}

export default AddPost
