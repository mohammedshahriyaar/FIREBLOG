import React from 'react'
import { useFirebase } from '../context/Firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup({setIsAuth}) {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
    const signupWithEmailPassword = () => {
        console.log("User Signing up with Email and Password....");
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setIsAuth(true);
            console.log("User Signed up with Email and Password");
            localStorage.setItem("User", user.email);
            console.log(user.email);
            navigate("/");
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error ", errorCode, errorMessage);
          });
      }
  return (
    <div className='signup'>
      <p className="display-4">Signup With Email and Password</p>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className='btn' onClick={signupWithEmailPassword}>
        Sign Up with Email and Password
      </button>
    </div>
  )
}

export default Signup
