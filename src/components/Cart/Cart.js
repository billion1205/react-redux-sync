import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useSelector} from "react-redux";

const Cart = (props) => {
  const cart=useSelector(state=>state.cart);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart {cart.totalQuantity>0 && <p> 총 {cart.totalQuantity}개의 아이템이 있습니다.</p>}</h2>
      <ul>
        {cart.items.map(item=>{
          return <CartItem key={item.id} item={item}/>
        })}
      </ul>
    </Card>
  );
};

export default Cart;
