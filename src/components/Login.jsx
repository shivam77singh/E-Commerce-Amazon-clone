import React, { useState, useEffect, useContext } from "react";
import "../Css/login.css";
import { auth, db } from "../Firebase.jsx";
import { Link, useHistory } from "react-router-dom";
import { StateContext } from "../contexts/StateContext.jsx";

function Login() {
  const [{ basket, user, userName }, dispatch] = useContext(StateContext);
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const signUpCheckEvent = (e) => {
    if (e.target.checked) {
      setLogin(false);
    }
  };
  const logInCheckEvent = (e) => {
    if (e.target.checked) {
      setLogin(true);
    }
  };

  const handleSigIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          db.collection("users")
            .doc(auth.user.uid)
            .get()
            .then((doc) => {
              console.log(doc.data());
              dispatch({
                type: "SET_USER",
                userId: doc.data().userId,
                userEmail: doc.data().userEmail,
                userName: doc.data().userName,
                basket: doc.data().basket,
                user: true,
              });
            });
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          db.collection("users")
            .doc(auth.user.uid)
            .set({
              userId: auth.user.uid,
              userEmail: auth.user.email,
              userName: name.trim(),
              basket: [],
            })
            .then(() => {
              dispatch({
                type: "SET_USER",
                userId: auth.user.uid,
                userEmail: auth.user.email,
                userName: name,
                user: true,
                basket: [],
              });
            });
          console.log(
            "account created succesfully",
            auth.user.uid,
            auth.user.email
          );
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="user-form">
      <div className="signup-form">
        <div className="form-message">
          <input
            type="checkbox"
            name=""
            id="signup-checkbox"
            checked={!login}
            onChange={(e) => signUpCheckEvent(e)}
          />
          <h3>Create account</h3>
          <p>New to Amazon?</p>
        </div>

        {!login && (
          <div className="form-input">
            <div className="input">
              <p>Your Name</p>
              <input
                type="name"
                name=""
                id="signup-email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input">
              <p>Email</p>
              <input
                type="email"
                name=""
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <p>Password</p>
              <input
                type="password"
                name=""
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input">
              <p>Re-enter password</p>
              <input type="password" name="" id="signup-confirm-password" />
            </div>
            <button
              type="submit"
              className="signup-btn"
              onClick={(e) => handleSignUp(e)}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      <div className="login-form">
        <div className="form-message">
          <input
            type="checkbox"
            name=""
            id="login-checkbox"
            checked={login}
            onChange={(e) => logInCheckEvent(e)}
          />
          <h3>Sign In</h3>
          <p>Already a customer?</p>
        </div>
        {login && (
          <div className="form-input">
            <div className="input">
              <p>Your Email</p>
              <input
                type="email"
                name=""
                id="signin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <p>Password</p>
              <input
                type="password"
                name=""
                id="signin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="signin-btn"
              onClick={(e) => handleSigIn(e)}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
