import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  updateDoc,
  doc,
  getDoc
} from "firebase/firestore";

function Edit() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const docRef = doc(db, "todos", id);

  useEffect(() => {
    // check isLogin
    if(!localStorage.getItem('isLogin')) {
      navigate('/login');
    }
    
    const getTodo = async () => {
      const data = await getDoc(docRef);
      setItem(data.data().item);
      setStatus(data.data().status);
      setIsLoading(false);
    };

    getTodo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const todoDoc = doc(db, "todos", id);
    const newFields = { item: item, status: status };
    await updateDoc(todoDoc, newFields);
    navigate("/");
  };
  return (
    <div className="container">
      <center>
        <h2 className="mt-3">Edit Todo</h2>
      </center>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Todo Item</label>
          
          {isLoading ? (
            <input
              type="text"
              className="form-control"
              value="Loading ..."
            />
          ) : (
            <input
              type="text"
              className="form-control"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          )}
          
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default Edit;
