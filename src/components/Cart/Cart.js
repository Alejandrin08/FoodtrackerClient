import React, { useContext } from "react";
import CartItem from "./CartItem";
import Modal from "../Ui/Modal";
import TheButton from "../Ui/TheButton";
import classes from "./Cart.module.css";
import CartContext from "../store/cartcontext";
//import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  // Using useContext hooks
  const cartCtx = useContext(CartContext);
  // ENDS
  //const navigate = useNavigate();
  //Converting Total amount to two decimal places

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  //ENDS

  //Checking if there is any cart item in the cart

  const hasItems = cartCtx.items.length > 0;

  //ENDS

  //Function is called when items are being added or removed from the cart

  const onAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onRemoveHandler = (id) => {
    cartCtx.removeItem(id);
    /*if(cartCtx.items.length > 1){
      
      cartCtx.removeItem(id);
    }else{
      navigate("/");
      
    }*/
  };

  const onClearHandler =() => {
    cartCtx.clearCart();
  }

  //ENDS

  //Revceiving values via props and mapping it using useContext

  var cartItems = cartCtx.items.map((item) => (
    <CartItem
      name={item.name}
      amount={item.amount}
      price={item.price}
      key={item.id}
      src={item.src}
      restaurant={item.restaurant}
      onAdd={onAddHandler.bind(null, item)}
      onRemove={onRemoveHandler.bind(null, item.id)}
      clearCart={onClearHandler.bind(null, null)}
    />
  ));

  //ENDS

  // Rendering the Cart using the modal component

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <div className={classes.items}>
        <div className={classes.item_group}>{cartItems}</div>

        <div className={`${classes.amount} `}>
          <p>Subtotal</p>
          <p>{totalAmount}</p>
        </div>
        <div className={classes.buttons}>
          <TheButton
            onClick={props.onCloseCart}
            className={` ${classes.btn_style} me-2`}
          >
            Cerrar
          </TheButton>
          {/* Hiding the order button if there is no item in the cart using the hasitems variable as a condition */}
          {hasItems && (
            <TheButton to="/order" className={classes.btn_style2} onClick={props.onCloseCart}>
              Continuar
            </TheButton>
          )}
          {/* ENDS */}
        </div>
      </div>
    </Modal>
  );
};

// ENDS

export default Cart;
