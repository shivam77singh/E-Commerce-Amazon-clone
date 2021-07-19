import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import "../Css/Home.css";
import bg1 from "../images/amazon-bg.jpg";
import bg2 from "../images/amazon-bg1.jpg";
import bg3 from "../images/amazon-bg3.jpg";
import bg4 from "../images/amazon-bg4.jpg";
import bg5 from "../images/amazon-bg5.jpg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Home = () => {
  const [order, setOrder] = useState([bg1, bg2, bg3, bg4, bg5]);

  const incrementCount = () => {
    let arr = [...order].slice(1, 5);
    arr.push(order[0]);
    setOrder(arr);
  };

  const decrementCount = () => {
    let arr = [...order].slice(0, 4);
    arr.splice(0, 0, order[4]);
    setOrder(arr);
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-slider">
          {order.map((bg) => (
            <img src={bg} key={bg} alt="" className="home-bg" />
          ))}
          <IoIosArrowBack className="arrow-back" onClick={decrementCount} />
          <IoIosArrowForward
            className="arrow-forward"
            onClick={incrementCount}
          />
        </div>
      </div>
      <div className="home-row">
        <Product
          id="12321341"
          key="12321341"
          title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
          price={11.96}
          rating={5}
          count={0}
          image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
        />
        <Product
          id="49538094"
          key="49538094"
          title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
          price={239.0}
          rating={4}
          count={0}
          image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
        />
        <Product
          id="4903850"
          key="4903850"
          title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
          price={199.99}
          rating={3}
          count={0}
          image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
        />
        <Product
          id="23445930"
          key="23445930"
          title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
          price={98.99}
          rating={5}
          count={0}
          image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
        />
        <Product
          key="3254354345"
          id="3254354345"
          title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
          price={598.99}
          rating={4}
          count={0}
          image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
        />
        <Product
          key="90829332"
          id="90829332"
          title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
          price={1094.98}
          rating={4}
          count={0}
          image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
        />
      </div>
    </div>
  );
};
export default Home;
