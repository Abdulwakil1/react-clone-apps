import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import "../Checkout.css";
import { collection, doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../firebase"; // Firestore instance

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchBasket = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Set the basket from Firestore to the global state
            dispatch({
              type: "SET_BASKET",
              basket: userData.basket || [],
            });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching basket from Firestore: ", error);
        }
      }
    };

    fetchBasket();
  }, [user, dispatch]);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="add-image"
        />
        {basket?.length === 0 ? (
          <div>
            <h2>Your shopping Basket is empty</h2>
            <p>
              You have no items in your basket. To buy one or more items, click
              "Add to basket" next to the item.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="checkout__title">Your shopping Basket</h2>
            {/* List out all of the Checkout Products */}
            {basket?.map((item) => (
              <CheckoutProduct
                key={item.uniqueId} // Use the unique ID as the key
                uniqueId={item.uniqueId} // Pass the uniqueId to the component
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        )}
      </div>
      {basket.length > 0 && (
        <div className="checkout__right">
          {/* <h1>Subtotal</h1> */}
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
