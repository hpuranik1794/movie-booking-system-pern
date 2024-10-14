import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ email, pwd, accessToken });
      setEmail('');
      setPwd('');
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  } 

  return (
    <section>
      <p 
        ref={errRef} 
        className={errMsg ? "errmsg" : "offscreen"} 
        aria-live="assertive">
          {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
          type="text"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
      />

      <label htmlFor="password">Password:</label>
      <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
      />
      <button disabled={!email || !pwd ? true : false}>Sign In</button>
    </form>
    <p>
        Need an Account?<br />
        <Link to="/register">Sign Up</Link>
    </p>
    </section>
  )
}

export default Login;

