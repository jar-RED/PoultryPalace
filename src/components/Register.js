/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState(null);
  const history = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history("/login");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        alert("Please enter a valid email address and password.");
      });
  };

  return (
    <div>
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

      <section id="register-panel" className="register-body">
        <div className="register-box">
          {error && <p>{error}</p>}
          <form autoSave="off" onSubmit={signUp}>
            <h1>Register</h1>
            <label htmlFor="create-username">Create username</label>
            <input
              type="email"
              placeholder="User Email"
              id="username"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="create-password">Create password</label>
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

      <section class="grid">
        <div class="alternative">
          <p>
            Do you have an account?
            <Link to={"/login"} className="alternative">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
