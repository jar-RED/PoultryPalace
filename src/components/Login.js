import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
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
        let errorMessage = "An error occurred.";

        // Check for specific error codes
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Please fill in the required fields";
            break;
          case "auth/user-disabled":
            errorMessage = "The user has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "The password is incorrect.";
            break;
          case "auth/invalid-credential":
            errorMessage = "Invalid credentials. Please try again.";
            break;
          case "auth/missing-password":
            errorMessage = "Please enter your password and try again.";
            break;
          case "auth/network-request-failed":
          default:
            errorMessage = "An error occurred.";
        }

        alert(errorMessage);
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
        <div className="logo-image" style={{ display: "flex" }}>
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
}

export default Login;
