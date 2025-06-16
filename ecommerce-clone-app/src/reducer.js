export const initialState = {
  basket: [],
  user: null, // Firebase authentication user info
  contactInfo: "", // This is the Mobile number or email field
  password: "",
  name: "", // Name from Firestore database // This can be removed if not used elsewhere; used for greeting
  userAddress: "Your City 00000", // Default single string address
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        userAddress: action.user?.address || state.userAddress,
        name: action.user?.displayName || state.name, // Set the user's name if available
      };
    // clear user, userAddress, and name (implemented in Header.jsx)
    case "CLEAR_USER":
      return {
        ...state,
        user: null,
        userAddress: "Your City 00000",
        name: "",
      };

    // When removing SET_USER_NAME, email will show in header for greeting instead of name
    case "SET_USER_NAME":
      return {
        ...state,
        name: action.name,
      };
    // for independent future implementaion
    case "SET_USER_ADDRESS":
      return {
        ...state,
        userAddress: action.address,
      };
    case "SET_INPUT_VALUE":
      return {
        ...state,
        [action.name]: action.value,
      };
    // --for firestore--
    case "SET_BASKET":
      return {
        ...state,
        basket: action.basket,
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "UPDATE_BASKET_QUANTITY":
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.uniqueId === action.uniqueId // Changed to uniqueId
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (uniqueId: ${action.uniqueId}) as it's not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket, // Return the updated basket in the state
      };

    default:
      return state;
  }
};

export default reducer;
