import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "sending cart data!",
      })
    );
    const currentCart = async () => {
      const res = await fetch(
        "https://react-http-2ed7f-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!res.ok) throw new Error("sending cart data failed...");
    };

    try {
      await currentCart();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "sending cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: error.message,
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      const res = await fetch(
        "https://react-http-2ed7f-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) throw new Error("Cannot get cart data...");
      const data = await res.json();
      return data;
    };

    try {
      const cartData = await fetchCartData();
      dispatch(
        cartActions.replaceCart({
          totalQuantity: cartData.totalQuantity,
          cartItems: cartData.cartItems || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: error.message,
        })
      );
    }
  };
};
