import React from 'react';
import { useFirebase } from '../context/Firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../context/Firebase';

function Loginn({ setIsAuth }) {
  const navigate = useNavigate();

  const signupWithGoogle = () => {
    console.log("User Signing in....");
    signInWithPopup(auth, provider)
      .then((res) => {
        setIsAuth(true);
        console.log("User Logged with Google");
        localStorage.setItem("User", res.user.email);
        console.log(res.user.email);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  return (
    <div className="login flex flex-col items-center justify-center h-screen">
      <p className="text-4xl font-bold mb-8">Sign up with Google</p>
      <button
        className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
        onClick={signupWithGoogle}
      >
        <i className="material-icons" style={{ width: "20px", height: "auto" }}>
          Google
        </i>{' '}
        Sign Up!
      </button>
    </div>
  );
}

export default Loginn;
