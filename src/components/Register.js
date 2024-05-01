/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState(null);
  const history = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    if (password.length > 1 && password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password) && password.length > 1) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/\d/.test(password) && password.length > 1) {
      alert("Password must contain at least one number.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history("/login");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = "An error occurred.";

        // Check for specific error codes
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "The email address is already in use by another account.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "The password is too weak.";
            break;
          case "auth/missing-email":
          case "auth/missing-password":
            errorMessage = "Please fill in all fields.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }

        alert(errorMessage);
      });
  };

  return (
    <div>
      <section id="welcome" className="header-welcome">
        <div className="welcome-text">
          <p className="intro-text">Welcome to</p>
          <p className="web-name" style={{ marginBottom: "20px" }}>
            JOYLISA WEB
          </p>
        </div>
      </section>

      <section id="logo" className="grid">
        <div className="logo-image" style={{ display: "flex" }}>
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

      <section className="grid">
        <div className="alternative">
          <p>
            Do you have an account?
            <Link to="/login" className="alternative">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
