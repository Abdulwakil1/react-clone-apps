import React from "react";
import "../CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

function CheckoutProduct({ uniqueId, id, title, image, price, rating }) {
  const [{ user, basket }, dispatch] = useStateValue();

  const removeFromBasket = async () => {
    // Remove item from basket in global state
    dispatch({
      type: "REMOVE_FROM_BASKET",
      uniqueId: uniqueId, // Use the unique ID to remove the correct item
    });

    // Remove item from Firestore if the user is logged in
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const itemToRemove = basket.find((item) => item.uniqueId === uniqueId);

      try {
        await updateDoc(userRef, {
          basket: arrayRemove(itemToRemove),
        });
      } catch (error) {
        console.error("Error removing item from basket: ", error.message);
        // Optionally, we can re-add the item to the global state if the Firestore update fails
        dispatch({
          type: "ADD_TO_BASKET",
          item: itemToRemove,
        });
      }
    } else {
      console.log("User not logged in; unable to remove item from Firestore.");
    }
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="product-image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>
        <button className="checkoutProduct__remove" onClick={removeFromBasket}>
          Remove from basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
