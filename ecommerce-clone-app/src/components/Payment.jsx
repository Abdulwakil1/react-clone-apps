import React, { useState, useEffect } from "react";
import "../Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useIntl, FormattedMessage } from "react-intl";
import { getBasketTotal } from "../reducer";
import { createPayment } from "../api/paymentService"; // New import

function Payment() {
  const [{ basket, user, userAddress, name }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const intl = useIntl();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const paymentData = await createPayment(getBasketTotal(basket) * 100); // Using createPayment function
        setClientSecret(paymentData.clientSecret); // Set the clientSecret from the response
      } catch (error) {
        console.error("Error getting client secret:", error);
      }
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      // Create payment and get client secret
      const paymentData = await createPayment(getBasketTotal(basket) * 100); // Use the createPayment function

      // Confirm card payment
      const payload = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      // Database interaction inside a try block
      try {
        await db
          .collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(payload.paymentIntent.id)
          .set({
            basket: basket,
            amount: payload.paymentIntent.amount,
            created: payload.paymentIntent.created,
          });
      } catch (dbError) {
        // Handle database errors
        throw new Error(`Database operation failed: ${dbError.message}`);
      }

      // Handle successful payment
      setSucceeded(true);
      setError(null);
      dispatch({
        type: "CLEAR_BASKET",
      });
      navigate("/orders", { replace: true });
    } catch (error) {
      // Handle errors from payment or database operations
      setError(`Payment failed: ${error.message}`);
    } finally {
      // Set processing to false after handling the response
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          <FormattedMessage
            id="checkout.title"
            defaultMessage="Checkout ({count} items)"
            values={{ count: basket?.length }}
          />
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>
              <FormattedMessage
                id="payment.deliveryAddress.title"
                defaultMessage="Delivery Address"
              />
            </h3>
          </div>
          <div className="payment__address">
            <p>{intl.formatMessage({ id: "email" }, { email: user?.email })}</p>
            <p>{intl.formatMessage({ id: "greeting" }, { name })}</p>
            <p>
              {intl.formatMessage(
                { id: "deliveringTo" },
                { address: userAddress || "Default Address" }
              )}
            </p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>
              <FormattedMessage
                id="payment.reviewItems.title"
                defaultMessage="Review items and delivery"
              />
            </h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.uniqueId}
                uniqueId={item.uniqueId}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>
              <FormattedMessage
                id="payment.paymentMethod.title"
                defaultMessage="Payment Method"
              />
            </h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <h3>
                  <FormattedMessage
                    id="payment.orderTotal"
                    defaultMessage="Order Total: {total}"
                    values={{
                      total: intl.formatNumber(getBasketTotal(basket), {
                        style: "currency",
                        currency: "USD",
                      }),
                    }}
                  />
                </h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>
                    {processing ? (
                      <FormattedMessage
                        id="payment.processing"
                        defaultMessage="Processing"
                      />
                    ) : (
                      <FormattedMessage
                        id="payment.buyNow"
                        defaultMessage="Buy Now"
                      />
                    )}
                  </span>
                </button>
              </div>

              {/* Display any errors */}
              {error && <div className="payment__error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
