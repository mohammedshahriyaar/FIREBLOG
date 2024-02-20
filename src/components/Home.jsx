import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";

function Home() {
  const firebase = useFirebase();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    firebase.AllPosts(setAllPosts);
  }, []);

  return (
    <div className="Home container mx-auto p-4">
      <h3 className="text-4xl text-center mb-6">Welcome</h3>
      {allPosts &&
        allPosts.map((postObj, id) => (
          <div key={id} className="bg-white rounded shadow p-4 mb-4">
            <div className="mb-4">
              <p className="font-bold text-xl mb-2">
                <span className="text-blue-500">Title:</span> {postObj.data().title}
              </p>
              <p>
                <span className="text-blue-500">Author:</span> {postObj.data().Author?.name}
              </p>
            </div>
            <p className="text-2xl font-bold mb-2">Content:</p>
            <p className="text-gray-800">{postObj.data().postData}</p>
          </div>
        ))}
    </div>
  );
}

export default Home;
