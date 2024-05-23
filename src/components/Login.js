import React, { useState, useContext, cloneElement } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "./login-context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState(null);
  const history = useNavigate();

  const { dispatch, showError, showToast } = useContext(AuthContext);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
          type: "LOGIN",
          payload: user,
        });
        // console.log(userCredential);
        history("/dashboard");
        showToast("Login successful!");
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

        // alert(errorMessage);
        showError(errorMessage);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      //alert("Please enter your email address to reset your password.");
      showError("Please enter your email address to reset your password.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // alert("Password reset email sent! Check your inbox.");
        showToast("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = "An error occurred.";

        // Check for specific error codes
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email.";
            break;
          default:
            errorMessage = "An error occurred.";
        }

        //alert(errorMessage);
        showError(errorMessage);
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
      <p style={{ textAlign: "center" }}>
        <button
          onClick={handleForgotPassword}
          style={{
            textDecoration: "underline",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          Forgot Password?
        </button>
      </p>
    </>
  );
}

export default Login;
