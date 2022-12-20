import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./../../firebase-config";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");

  useEffect(() => {
    // check isLogin
    if(localStorage.getItem('isLogin')) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        console.log(user._tokenResponse);
        //set token on localStorage
        localStorage.setItem('isLogin', true);
        //redirect to TodoList
        navigate('/');
      } catch (error) {
        console.log(error.message);
        //assign error to state "validation"
        setValidation(error.message);
      }  
  };

  return (
    <div className="container">
      <center>
        <h2 className="mt-3">Login User</h2>
      </center>

      {validation ? (
        <div className="alert alert-danger">{validation}</div>
      ): null}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p className="mt-3">Dont have an Account ? <Link to={'/register'}>Register Here</Link></p>
      
    </div>
  );
}

export default Login;
