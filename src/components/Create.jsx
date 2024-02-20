import React from 'react'
import { useFirebase } from '../context/Firebase'
import { useState,useEffect } from 'react'
import {useNavigate} from "react-router-dom"

function Create({isAuth}) {
    const  firebase = useFirebase();
    const navigate = useNavigate();
    const[title,SetTitle] = useState("");
    const[postData,setPostData] = useState("");

    useEffect(()=>{
        if(!isAuth){
            navigate("/login")
        }
    } ,[])

    const createPost = ()=>{
        firebase.CreatePost(title,postData)
    }
  return (
    <>
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        {/* title */}
        <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600 text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          value={title}
          onChange={e=>SetTitle(e.target.value)}
        />
        </div>
        {/* text area  */}
        <div className="mb-6">
        <label htmlFor="postData" className="block text-gray-600 text-sm font-medium mb-2">
          Post Data
        </label>
        <textarea
          id="postData"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          rows="4"
          value={postData}
          onChange={e=>setPostData(e.target.value)}
        ></textarea>
        </div>

        <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={createPost}
      >
        Create Post
      </button>



    </div>
    </>
  )
}

export default Create