import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function PaymentWindow() {
  //const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/v1/payment").then((res) => {
      let endpoint = res.data.data.url;

      window.location.href = endpoint;
    });
  };

  return (
    <div style={{ padding: "10%", float: "right" }}>
      <form onSubmit={handleForm}>
        <h1>Shopping Cart</h1>
        <h3>Node.js and Express book</h3>
        <p>price : LKR 50.00</p>
        <p>Quantity: 1</p>
        <h2>---------------------</h2>

        <h3>My love book</h3>
        <p>price : LKR 300.00</p>
        <p>Quantity: 2</p>
        <button type="submit">proceed to checkout</button>
      </form>
    </div>
  );
}

export default PaymentWindow;
