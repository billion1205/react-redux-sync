import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  // const cartNum=useSelector((state)=>(
  //     state.cart.items.reduce((prevValue,item)=>{
  //       return prevValue+item.quantity
  //     },0)
  // ));
  const cartNum=useSelector((state)=>state.cart.totalQuantity)

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  }

  return (
      <button className={classes.button} onClick={toggleCartHandler}>
        <span>My Cart</span>
        <span className={classes.badge}>{cartNum}</span>
      </button>
  );
};

export default CartButton;
