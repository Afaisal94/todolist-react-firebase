import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
} from "firebase/firestore";

function Create() {
  let navigate = useNavigate();
  const [item, setItem] = useState("");
  let status = false;
  const todosCollectionRef = collection(db, "todos");

  useEffect(() => {
    // check isLogin
    if(!localStorage.getItem('isLogin')) {
      navigate('/login');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addDoc(todosCollectionRef, { item: item, status: status });
    navigate("/");
  };
  return (
    <div className="container">
      <center>
        <h2 className="mt-3">Create Todo</h2>
      </center>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Todo Item</label>
          <input
            type="text"
            className="form-control"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default Create;
