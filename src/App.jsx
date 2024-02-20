import { useState } from 'react'
import './App.css'
import Home from "./components/Home"
import Create from './components/Create'
import Loginn from './components/Loginn'
import MyPosts from './components/MyPosts'
import { signOut } from 'firebase/auth'
import {useNavigate,Link,Routes,Route } from "react-router-dom"
import {auth} from './context/Firebase'
function App() {

  const navigate = useNavigate();
  const [isAuth,setIsAuth] = useState(false);

  const Signout = ()=>{
    signOut(auth)
    .then(
      ()=>{
        localStorage.clear();
        setIsAuth(true);
        console.log("User logged out");
        navigate("/loginn");
      })
      .catch(error=>console.log(error))
  }

  return (
    <>
    <div className="App">
  <nav className="bg-blue-100 p-4">
    <a className="text-lg font-bold" href="#">Navbar</a>
    <button className="lg:hidden ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="block w-6 h-6 border-t border-gray-800 mx-auto"></span>
      <span className="block w-6 h-6 border-t border-gray-800 mx-auto mt-1"></span>
      <span className="block w-6 h-6 border-t border-gray-800 mx-auto mt-1"></span>
    </button>
    <div className="hidden lg:flex lg:items-center lg:ml-auto" id="navbarNavAltMarkup">
      <div className="lg:flex lg:justify-end">
        <Link className="nav-item nav-link active" to="/">Home </Link>

        {!isAuth ? 
          <>
            <Link className="nav-item nav-link" to="/login">Login</Link>
          </>
          :
          <>
            <Link className="nav-item nav-link" to="/userposts">My Posts</Link>
            <Link className="nav-item nav-link" to="/create">Create</Link>
            <button className="btn" onClick={Signout}>Logout!</button>
          </>
        }
      </div>
    </div>
  </nav>

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Loginn setIsAuth={setIsAuth} />} />
    <Route path="/create" element={<Create isAuth={isAuth} />} />
    <Route path="/userposts" element={<MyPosts isAuth={isAuth} />} />
  </Routes>
</div>

    </>
  )
}

export default App
