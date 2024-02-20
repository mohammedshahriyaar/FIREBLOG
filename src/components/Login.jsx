import React from 'react'
import { useFirebase } from '../context/Firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {getAuth ,signInWithEmailAndPassword} from 'firebase/auth'


function Login({setIsAuth}) {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
    const signinWithEmailPassword = () => {
        console.log("User Signing in with Email and Password....");
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setIsAuth(true);
            console.log("User Logged in with Email and Password");
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
     <div className='login'>
      <p className="display-4">Login With Email and Password</p>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className='btn' onClick={signinWithEmailPassword}>
        Login with Email and Password
      </button>
    </div>
  )
}

export default Login