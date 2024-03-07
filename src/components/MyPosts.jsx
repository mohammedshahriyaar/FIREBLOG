// import React, { useEffect, useState } from 'react'
// import {useNavigate} from "react-router-dom"
// import { auth ,useFirebase } from '../context/Firebase'
// import {nanoid} from "nanoid"

// function MyPosts({isAuth}) {
//     const navigate= useNavigate();
//     const firebase = useFirebase();
//     const [userData,SetUserData]=useState([]);

//     const deletePost=(title,SetUserData)=>{
//         console.log("Delete post",title);
//         firebase.deletePost(title,SetUserData)
//     }
//     useEffect( ()=>{
//       if(!isAuth){
//         navigate("/layout")
//       }
//       else
//       {
//         firebase.MyPosts(SetUserData)
//       }
//     },[userData])
//   return (
//     <div>
//   {isAuth &&
//     <>
//       <h3 className='text-2xl text-center font-bold'>Hey {auth.currentUser.displayName}!!</h3>
//       <h3 className='text-2xl text-center font-bold mb-4'>Your Space</h3>
//     </>
//   }

//   {
//     userData &&
//     userData.map((postObj) => (
//       <div key={nanoid()} className='bg-gray-100 p-4 rounded-md mb-4'>
//         <div className='flex justify-between items-center border-b-2 pb-2 mb-2'>
//           <p className='text-lg font-bold'>
//             <span className='text-blue-500'>Title:</span> {postObj.data().title}
//           </p>
//           <p className='text-lg'>
//             <span className='text-green-500'>Author:</span> {postObj.data().author?.name}
//           </p>
//           <button className='text-red-500' onClick={() => deletePost(postObj.data().title, SetUserData)}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//             </svg>
//           </button>
//         </div>
//         <p className='text-3xl font-semibold mb-2'>Content:</p>
//         <p className='text-lg'>{postObj.data().postData}</p>
//       </div>
//     ))
//   }
// </div>
//   )
// }

// export default MyPosts

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, useFirebase } from "../context/Firebase";
import { nanoid } from "nanoid";

function MyPosts({ isAuth }) {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [userData, setUserData] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");
  const [editable,setEditable] = useState(false);

  const deletePost = (title) => {
    console.log("Delete post", title);
    firebase.deletePost(title, setUserData);
  };

  const updatePost = (title) => {
    setEditable(true);
    setEditingPost(title);
    const postToUpdate = userData.find(
      (postObj) => postObj.data().title === title
    );
    setUpdatedContent(postToUpdate.data().postData);
  };

  const cancelUpdate = () => {
    setEditingPost(null);
    setUpdatedContent("");
  };

  const saveUpdatedPost = async (title) => {
    await firebase.editPost(title, { postData: updatedContent });
    setEditingPost(null);
    setUpdatedContent("");
    // Refresh the posts after updating
    firebase.MyPosts(setUserData);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/layout");
    } else {
      firebase.MyPosts(setUserData);
    }
  }, [userData, isAuth]);

  return (
    <div>
      {isAuth && (
        <>
          <h3 className="text-2xl text-center font-bold">
            Hey {auth.currentUser.displayName}!!
          </h3>
          <h3 className="text-2xl text-center font-bold mb-4">Your Space</h3>
        </>
      )}

      {userData &&
        userData.map((postObj) => (
          <div key={nanoid()} className="bg-gray-100 p-4 rounded-md mb-4">
            <div className="flex justify-between items-center border-b-2 pb-2 mb-2">
              <p className="text-lg font-bold">
                <span className="text-blue-500">Title:</span>{" "}
                {postObj.data().title}
              </p>
              <p className="text-lg">
                <span className="text-green-500">Author:</span>{" "}
                {postObj.data().Author?.name}
              </p>
              <div>
                {editingPost === postObj.data().title ? (
                  <>
                    <button
                      className="text-green-500 mr-2"
                      onClick={() => saveUpdatedPost(postObj.data().title)}
                    >
                      Save
                    </button>
                    <button className="text-red-500" onClick={cancelUpdate}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="text-blue-500"
                    onClick={() => updatePost(postObj.data().title)}
                  >
                    Update
                  </button>
                )}
                <button
                  className="text-red-500 ml-2"
                  onClick={() => deletePost(postObj.data().title)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-3xl font-semibold mb-2">Content:</p>
            {editingPost === postObj.data().title ? (
              <textarea id="content"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className={`border p-2 w-full mb-2` }
              />
            ) : (
              // <h1>hello</h1>
              <p className="text-lg">{postObj.data().postData}</p>
            )}
          </div>
        ))}
    </div>
  );
}

export default MyPosts;

