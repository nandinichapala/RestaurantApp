import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItemCart: () => {},
  removeItemCart: () => {},
  deleteCartItem: () => {},
})

export default CartContext
