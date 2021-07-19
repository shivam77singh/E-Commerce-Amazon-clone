import React, { useContext, useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { StateContext } from "../contexts/StateContext.jsx";

const Product = ({ title, price, image, rating, id, count }) => {
  const [{ basket, user }, dispatch] = useContext(StateContext);
  const [inCart, setInCart] = useState(false);
  const history = useHistory();
  const [style, setStyle] = useState({
    transition: "all 1.2s ease",
    transform: "translateY(60px)",
  });

  useEffect(() => {
    setStyle({
      ...style,
      transform: "translateY(0)",
    });
  }, []);

  const addToBasket = () => {
    console.log("add", basket);
    if (!user) {
      alert("You need to Sign In first");
      return;
    }
    ![...basket].some((item) => item.id === id) &&
      dispatch({
        type: "ADD_ITEM_TO_BASKET",
        item: { title, price, image, rating, id, count: count + 1 },
      });
  };
  useEffect(() => {
    const incart = [...basket].some((item) => item.id === id);
    setInCart(incart);
  }, [basket]);

  return (
    <div className="product" style={style}>
      <div className="product-info">
        <p>{title}</p>
        <div className="product-price">
          <strong>${price}</strong>
          <p className="product-rating">
            {Array(rating)
              .fill()
              .map(() => (
                <AiFillStar />
              ))}
          </p>
        </div>
      </div>
      <img className="product-image" src={image} alt="" />
      <Link to={user ? "/checkout" : "/signin"}>
        <button className="add-to-basket-btn" onClick={addToBasket}>
          <p>{inCart ? "In Basket" : "Add to Basket"}</p>
        </button>
      </Link>
    </div>
  );
};
export default Product;
