import React from 'react'
import { useContext } from 'react';
import { createContext } from 'react'
import { initializeApp } from "firebase/app";
import {getFirestore,collection,addDoc,query,getDocs,deleteDoc,updateDoc} from "firebase/firestore"
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import{where} from "firebase/firestore"
import { useState } from 'react';

//FIrebase Setup--
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6nRfGNuXFn-wQuRdRTVrqk8PniY5j4bY",
    authDomain: "blog-app-e1155.firebaseapp.com",
    projectId: "blog-app-e1155",
    storageBucket: "blog-app-e1155.appspot.com",
    messagingSenderId: "598240782512",
    appId: "1:598240782512:web:99c247ec95b122a345b375"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//setup ended------------

//generally needed functionalitirs
const db = getFirestore(app);
export const auth = getAuth(app);


//create context
const FirebaseContext = createContext(null);

//make hook to maintain state of  context
export const useFirebase = ()=>useContext(FirebaseContext)

export const provider = new GoogleAuthProvider();
//make provider
export const FirebaseProvider = (props)=>{

    //1.Create Blog 
    //collection ref is ref
    const ref = collection(db,'Posts')

    // const CreatePost = async(title,postData) => {
    //     const res = await addDoc(ref ,{
    //         title,
    //         postData,
    //         Author:{
    //             name:auth.currentUser.displayName,
    //             id:auth.currentUser.uid,
    //         }
    //     })
    // }
    const CreatePost = async (title, postData) => {
        try {
            // Check if a post with the same title already exists
            const existingPostQuery = query(ref, where('title', '==', title));
            const existingPostSnapshot = await getDocs(existingPostQuery);

            if (existingPostSnapshot.size > 0) {
                console.log('A post with the same title already exists. Please choose a unique title.');
            } else {
                // Add a new post
                const res = await addDoc(ref, {
                    title,
                    postData,
                    Author: {
                        name: auth.currentUser.displayName,
                        id: auth.currentUser.uid,
                    }
                });
                console.log('Post created successfully');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    //My posts or current user posts
    //functionality2
    const MyPosts = async(SetUserData)=>{
        const userid = auth.currentUser.uid;
        const q = query(ref,where("Author.id","==",userid))
        const result = await getDocs(q);
        SetUserData(result.docs);

    }

    //functionality3 all  posts of all users

    const AllPosts= async(SetAllposts)=>{
        const all = await getDocs(ref);
        SetAllposts(all.docs);
    }

    //functionality 4 update post
    // const editPost = async (title, updatedData) => {
    //     try {
    //       const userid = auth.currentUser.uid;
    //       const q = query(ref, where('title', '==', title), where('Author.id', '==', userid));
    //       const querySnapshot = await getDocs(q);
      
    //       if (querySnapshot.size === 1) {
    //         const doc = querySnapshot.docs[0];
      
    //         // Check if the current user is the author of the post
    //         if (doc.data().Author.id === userid) {
    //           await updateDoc(doc.ref, {
    //             // Add fields you want to update in the post
    //             postData: updatedData.postData,
    //           });
    //           console.log('Update successful');
    //         } else {
    //           console.log('Unauthorized to edit this post');
    //         }
    //       } else {
    //         console.log('Post not found or multiple posts with the same title');
    //       }
    //     } catch (error) {
    //       console.error('Error updating post:', error);
    //     }
    //   };
    const editPost = async (title, updatedData) => {
      try {
        const userid = auth.currentUser.uid;
        const q = query(ref, where('title', '==', title), where('Author.id', '==', userid));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.size === 1) {
          const doc = querySnapshot.docs[0];
    
          // Check if the current user is the author of the post
          if (doc.data().Author.id === userid) {
            await updateDoc(doc.ref, {
              // Add fields you want to update in the post
              postData: updatedData.postData,
            });
            console.log('Update successful');
          } else {
            console.log('Unauthorized to edit this post');
          }
        } else if (querySnapshot.size === 0) {
          console.log('Post not found');
        } else {
          console.log('Multiple posts with the same title');
        }
      } catch (error) {
        console.error('Error updating post:', error.message);
      }
    };
    

    //functionality 5 delete post

    const deletePost = async(title,SetUserData)=>{
        const userid = auth.currentUser.uid;
        const q = query(ref,where("title","==",title),where("Author.id","==",userid));
        try {
            const snapshot = await getDocs(q);
            snapshot.forEach(
                async (doc)=>{
                    await deleteDoc(doc.ref);
                    console.log("Deletion succesfull");
                }
            )
            MyPosts(SetUserData);
            
        } catch (error) {
            console.log("Deletion error",error);
            
        }
    }

    return(
        <FirebaseContext.Provider value={{CreatePost,MyPosts,deletePost,editPost,AllPosts}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}