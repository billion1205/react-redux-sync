import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {uiActions} from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial=true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible)
  //cart state를 가져옴
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  //cart가 다른곳에서 리듀서를 통해 변경될때마다 fetch가 일어난다~
  useEffect(() => {

    const sendCarData = async () => {

      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending....',
        message: 'Sending cart Data'
      }))

      const response = await fetch('https://myrest-cbfee-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
          {method: 'PUT', body: JSON.stringify(cart)})

      if (!response.ok) {
        throw new Error('Sending cart data failed!')
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!!',
        message: 'Sent car data successfully'
      }))
    }//end func

    if(isInitial){
      isInitial=false;
      return;
    }

    sendCarData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
      }))
    })
  }, [cart, dispatch])

  return (
      <>
        {notification && <Notification status={notification.status}
        title={notification.title} message={notification.message}/>}
        <Layout>
          {showCart && <Cart/>}
          <Products/>
        </Layout>
      </>
  );
}

export default App;
