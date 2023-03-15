import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://myrest-cbfee-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      return await response.json();
    }; //end func
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items:cartData.items || [],
        totalQuantity:cartData.totalQuantity,
        totalAmount:cartData.totalAmount,
      }));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Sent car data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    //비동기 시작전 시작을 알리는 액션발동
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending....",
        message: "Sending cart Data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://myrest-cbfee-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.totalAmount,
          }),
        }
      ); //cart 클로저  매개변수사용

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      //비동기 호출
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Sent car data successfully",
        })
      ); //이코드 까지 넘어오면 데이터가 잘 받아진것이다.
    } catch (e) {
      //에러가 발생했을때 액션
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
