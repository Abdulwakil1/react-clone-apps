// src/api/paymentService.js
import instance from "./axios"; // Adjust the path accordingly

// Function to create a payment
export const createPayment = async (total) => {
  try {
    const response = await instance.post("/payments/create", null, {
      params: { total },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

// Example usage (you can remove or comment this out if using it elsewhere)
// createPayment(1196)
//   .then((data) => console.log('Payment created:', data))
//   .catch((error) => console.error('Payment creation failed:', error));
