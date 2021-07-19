import React, { useContext, useState, useEffect } from "react";
import Logo from "../images/amazon.png";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GrSearch } from "react-icons/gr";
import "../Css/Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { StateContext } from "../contexts/StateContext.jsx";
import { auth, db } from "../Firebase";

const Navbar = () => {
  const [{ basket, user, userName }, dispatch] = useContext(StateContext);
  const [totalCount, setTotalCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let count = basket?.reduce((amount, item) => item.count + amount, 0);
    setTotalCount(count);
  }, [basket]);

  const handleSignOut = () => {
    if (user) {
      auth.signOut().then(() => {
        console.log("user,signed out", userName);
        dispatch({
          type: "SET_USER",
          basket: [],
          userId: "",
          userEmail: "",
          userName: "",
          user: false,
        });
        history.push("/");
        console.log("user removed from local", userName);
      });
      alert("You are successfully Sign Out");
    }
  };

  return (
    <div className="navbar">
      <div className="first-section">
        <Link to="/">
          <div className="nav-logo">
            <img src={Logo} alt="" />
          </div>
        </Link>

        <Link to={user ? "/" : "/signin"}>
          {user ? (
            <div className="address" style={{ color: "white" }}>
              <p>
                Deliver <MdLocationOn />
              </p>
              <h4>to India</h4>
            </div>
          ) : (
            <div className="address" style={{ color: "white" }}>
              <p>
                Hello <MdLocationOn />
              </p>
              <h4>Select Your address</h4>
            </div>
          )}
        </Link>

        <div className="nav-form">
          <form action="" id="form">
            <select className="category">
              <option value="">Electronics</option>
              <option value="">Fashion</option>
              <option value="">Kitchen</option>
              <option value="">Deals</option>
              <option value="">Computers</option>
            </select>
            <input type="text" id="text-input" />
            <input type="submit" value=" " id="search-input" />
            <GrSearch className="search-btn" />
          </form>
        </div>
      </div>

      <div className="second-section">
        <Link to={!user && "/signin"}>
          <div
            onClick={handleSignOut}
            className="second-option"
            style={{ color: "white" }}
          >
            <p>Hello {userName ? userName.trim().split(" ")[0] : " Guest"}</p>
            <h4>{user ? "Sign Out" : "Sign In"}</h4>
          </div>
        </Link>
        <Link
          to={user ? "/" : "/signin"}
          style={{ color: "white", textDecoration: "none" }}
        >
          <div
            className="second-option"
            onClick={() => !user && alert("You need to SigIn first")}
          >
            <p>Returns</p>
            <h4>& Orders</h4>
          </div>
        </Link>
        <Link to={user ? "/checkout" : "/signin"}>
          <div
            className="cart"
            onClick={() => !user && alert("You need to SigIn first")}
          >
            <FaShoppingCart style={{ color: "white", fontSize: "1rem" }} />
            <h4>Cart</h4>
            <p className="tot-items">
              {totalCount ? totalCount : user ? "0" : ""}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
