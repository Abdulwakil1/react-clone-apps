import React from "react";
import { useIntl } from "react-intl";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";
import "../Subtotal.css";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }] = useStateValue();
  const intl = useIntl();

  const total = getBasketTotal(basket);
  const formattedTotal = intl.formatNumber(total, {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="subtotal">
      <p>
        {intl.formatMessage(
          { id: "subtotal", defaultMessage: "Subtotal ({itemCount} items):" },
          { itemCount: basket.length }
        )}
        <strong>{formattedTotal}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" />{" "}
        {intl.formatMessage({
          id: "containsGift",
          defaultMessage: "This order contains a gift",
        })}
      </small>
      <button onClick={() => navigate("/payment")}>
        {intl.formatMessage({
          id: "proceedToCheckout",
          defaultMessage: "Proceed to Checkout",
        })}
      </button>
    </div>
  );
}

export default Subtotal;
