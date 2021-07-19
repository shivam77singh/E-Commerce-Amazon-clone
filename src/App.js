import React, { useEffect, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import { auth, db } from "./Firebase.jsx";
import { StateContext } from "./contexts/StateContext.jsx";

function App() {
  const [{ basket, user, userName, userId }, dispatch] = useContext(
    StateContext
  );
  useEffect(() => {
    if (user) {
      db.collection("users").doc(userId).update({
        basket: basket,
      });
      console.log("basket updated", basket.length);
    }
  }, [basket]);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/signin" component={Login} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
