import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState(null);
  const history = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid credentials. Please try again.");
      });
  };

  return (
    <>
      <section id="welcome" className="header-welcome">
        <div className="welcome-text">
          <p className="intro-text">Welcome to</p>
          <p className="web-name">JOYLISA WEB</p>
        </div>
      </section>

      <section id="logo" className="grid">
        <div className="logo-image">
          <img src="assets/images/farm-logo.png" alt="farm-logo" />
        </div>
      </section>

      <section id="login-panel" className="login-body">
        <div className="login-box">
          {error && <p>{error}</p>}
          <form autoSave="off" id="login" onSubmit={signIn}>
            <h1>Log in</h1>
            <label htmlFor="enter-username">Enter username</label>
            <input
              type="email"
              placeholder="User Email"
              id="username"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="enter-password">Enter password</label>
            <input
              type="password"
              placeholder="********"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Lets Go →</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
