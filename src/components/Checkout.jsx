import React, { useContext, useState, useEffect } from "react";
import "../Css/Checkout.css";
import { StateContext } from "../contexts/StateContext.jsx";
import CartItem from "../components/CartItem.jsx";

const Checkout = () => {
  const [{ basket, user, userName }, dispatch] = useContext(StateContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let price = basket?.reduce(
      (amount, item) => item.price * item.count + amount,
      0
    );
    let count = basket?.reduce((amount, item) => item.count + amount, 0);

    setTotalPrice((Math.round(price * 100) / 100).toFixed(2));
    setTotalCount(count);
  }, [basket]);

  return (
    <div className="checkout-container">
      <div className="shopping-cart">
        {!basket.length ? (
          <div>
            <h2
              style={{
                marginBottom: "1rem",
                fontSize: "clamp(0.9rem,2vw,1.3rem)",
              }}
            >
              Hello {userName ? userName : ""}
            </h2>
            <h1 style={{ fontSize: "clamp(1.2rem,3vw,2.4rem)" }}>
              Your Shopping Basket is Empty
            </h1>
          </div>
        ) : (
          <h1>Shopping Cart</h1>
        )}

        <div className="cart-items">
          {basket.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="subtotal">
        <div className="subtotal-items">
          <p>
            Subtotal ({totalCount} itmes):
            <strong>${totalPrice}</strong>
          </p>
          <div className="checkbox">
            <input type="checkbox" id="check" />
            <p>This order contains a gift</p>
          </div>
        </div>
        <button className="checkout-btn">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
