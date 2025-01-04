import React from "react";

//Creating Storing the context values
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart:() =>{},
});
//END
export default CartContext;
