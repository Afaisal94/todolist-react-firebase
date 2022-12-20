import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./../../firebase-config";

function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      //assign error to state "validation"
      setValidation(error.message);
    }
  };

  return (
    <div className="container">
      <center>
        <h2 className="mt-3">Register User</h2>
      </center>

      {validation.message && (
        <div className="alert alert-danger">{validation.message}</div>
      )}

      <form onSubmit={handleRegister}>
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

      <p className="mt-3">I have an Account, <Link to={'/login'}>Login Now</Link></p>
    </div>
  );
}

export default Register;
