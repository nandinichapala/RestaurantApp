import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {restoName} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let quantityVal = 0

        cartList.map(each => (quantityVal += each.quantity))
        console.log(quantityVal)

        return (
          <nav className="nav-container">
            <h1 className="nav-heading">{restoName}</h1>
            <div className="cart-text-img-container">
              <p className="my-orders-text">My Orders</p>
              <AiOutlineShoppingCart className="cart-image" />
              <div className="quantity-container">
                <p className="quantity-count">{quantityVal}</p>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Header
