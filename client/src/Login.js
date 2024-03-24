// import { useState } from "react";
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";


// const Login = ({ setAuth }) => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: ""
//   });

//   const { email, password } = inputs;

//   const onChange = (e) => {
//     setInputs({...inputs, [e.target.name]: e.target.value});
//   }

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     try {
//       const body = {email, password};
//       const response = await fetch("http://localhost:5000/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(body)
//         }
//       );

//       const parseResponse = await response.json();
//       if (parseResponse.token) {
//         localStorage.setItem("token", parseResponse.token);
//         setAuth(true);
//         toast.success("Logged in Successfully");
//       } else {
//         setAuth(false);
//         toast.error(parseResponse);
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   return (
//     <div>
//       <h1 className="mt-5 text-center">Login</h1>
//       <form onSubmit={onSubmitForm}>
//         <label htmlFor="email">email</label>
//         <input
//           type="text"
//           name="email"
//           value={email}
//           onChange={e => onChange(e)}
//           className="form-control my-3"
//         />
//         <label htmlFor="password">password</label>
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={e => onChange(e)}
//           className="form-control my-3"
//         />
//         <button className="btn btn-success btn-block">Submit</button>
//       </form>
//       <Link to="/register">register</Link>
//     </div>
//   )
// }

// export default Login;

import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthContext"
import { Link } from "react-router-dom";

import axios from "./api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

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

