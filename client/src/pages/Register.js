import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register";

const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const validEmail = EMAIL_REGEX.test(email);
  const validPwd = PWD_REGEX.test(pwd);
  const validMatch = pwd === matchPwd;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validEmail) {
      setErrMsg("Invalid email");
      return;
    }
    if (!validPwd) {
      setErrMsg("Password does not meet criteria");
      return;
    }
    if (!validMatch) {
      setErrMsg("Passwords don't match!");
      return;
    }

    try {
      const response = axios.post(REGISTER_URL,
        { email, pwd },
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true,
        }
      );
      console.log(response?.data);
      setEmail('');
      setPwd('');
      setMatchPwd('');
      navigate('/');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 409) {
        setErrMsg('Account already exists')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing credentials')
      } else {
        setErrMsg('Registration failed');
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email"
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password"
          ref={emailRef}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input 
          type="password" 
          id="confirmPassword"
          ref={emailRef}
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
        />
        <button disabled={false}>Sign Up</button>
      </form>
      <p>
          Have an account?<br />
          <Link to="/">Sign In</Link>
      </p>
    </section>
  )

}

export default Register;

