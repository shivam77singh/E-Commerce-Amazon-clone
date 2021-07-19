import React, { useContext, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { StateContext } from "../contexts/StateContext.jsx";

function CartItem({ item }) {
  const [{ basket }, dispatch] = useContext(StateContext);
  const { title, price, image, id, count } = item;
  const [deleteItemStyle, setDeleteItemStyle] = useState({});

  const removeItem = () => {
    const newStyle = {
      animation: "animate 0.4s ease forwards",
    };
    setDeleteItemStyle({ ...deleteItemStyle, ...newStyle });
    setTimeout(() => {
      dispatch({
        type: "DELETE_ITEM_FROM_BASKET",
        id,
      });
    }, 400);
  };

  const decrementCount = () => {
    if (count - 1 === 0) {
      removeItem();
    }
    dispatch({
      type: "SET_COUNT_OF_ITEM",
      id,
      count: count - 1 >= 0 ? count - 1 : 0,
    });
  };
  const incrementCount = () => {
    dispatch({
      type: "SET_COUNT_OF_ITEM",
      id,
      count: count + 1,
    });
  };

  return (
    <div className="cart-item" style={deleteItemStyle}>
      <img src={image} alt="" />
      <div className="item-info">
        <div className="item-title">
          <h3>{title}</h3>

          <strong>${price}</strong>
        </div>
        <div className="manupulate-item">
          <div className="manupulate-btn">
            <button className="decrement-item" onClick={decrementCount}>
              <BiMinus />
            </button>
            <button>{count}</button>
            <button className="increment-item" onClick={incrementCount}>
              <BiPlus />
            </button>
          </div>
          <button className="delete-btn" onClick={removeItem}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
