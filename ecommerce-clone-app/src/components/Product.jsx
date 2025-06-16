import { v4 as uuidv4 } from "uuid"; // Import a UUID generator library
import React, { useState } from "react";
import "../Product.css";
import { useStateValue } from "./StateProvider";
import { db } from "../firebase";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";

function Product({ id, title, image, price, rating }) {
  const [{ user }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(1); // State to hold the selected quantity

  const addToBasket = async () => {
    const items = []; // Array to hold items

    // Create items based on the selected quantity
    for (let i = 0; i < quantity; i++) {
      const uniqueId = uuidv4(); // Generate a unique ID for each item

      const item = {
        uniqueId: uniqueId, // unique ID as key
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      };

      // Add each item to the basket
      items.push(item);

      // Update the global state with each item
      dispatch({
        type: "ADD_TO_BASKET",
        item: item,
      });
    }

    // Update the database with all items
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, {
          basket: arrayUnion(...items),
        });
      } catch (error) {
        console.error("Error adding items to basket: ", error);
        // Optionally, roll back the UI change or notify the user of the error
        items.forEach((item) => {
          dispatch({
            type: "REMOVE_FROM_BASKET",
            uniqueId: item.uniqueId, // Remove using the unique ID
          });
        });
      }
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />

      {/* Quantity Selection Dropdown */}
      <div className="product__quantity">
        <label htmlFor={`quantity_${id}`}>Quantity:</label>
        <select
          id={`quantity_${id}`}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[...Array(10).keys()].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
