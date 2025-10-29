import {Component} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

class DishItem extends Component {
  state = {quantity: 0}

  render() {
    const {dishDetails} = this.props
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addonCat,
            dishAvailability,
            dishCurrency,
            dishCalories,
            dishDescription,
            dishImage,
            dishName,
            dishId,
            dishPrice,
            dishType,
          } = dishDetails
          const {addItemCart, removeItemCart, cartList} = value
          const {quantity} = this.state
          const onIncreamentQuantity = () => {
            addItemCart({...dishDetails, quantity})
          }

          const onDecreamentQuantity = () => {
            removeItemCart({...dishDetails, quantity})
          }

          const dishObj = cartList.find(each => each.dishId === dishId)
          let quantityValue = quantity
          console.log(dishObj)
          if (dishObj) {
            quantityValue = dishObj.quantity
          }

          return (
            <li className="list-item-container">
              <div className="veg-or-nonveg-details-description-container">
                {dishType === 2 ? (
                  <div className="green-label-container">
                    <div className="green-dot-container" />
                  </div>
                ) : (
                  <div className="red-label-container">
                    <div className="red-dot-container" />
                  </div>
                )}
                <div className="description-details-container">
                  <h1 className="dish-name">{dishName}</h1>
                  <p className="dish-price">
                    {dishCurrency} {dishPrice}
                  </p>
                  <p className="dish-description">{dishDescription}</p>
                  {dishAvailability ? (
                    <div className="increase-decrease-btn-container">
                      <button
                        className="quantity-btn"
                        type="button"
                        onClick={onDecreamentQuantity}
                      >
                        -
                      </button>
                      <p className="qantity">{quantityValue}</p>
                      <button
                        className="quantity-btn"
                        type="button"
                        onClick={onIncreamentQuantity}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <p className="not-available-text">Not available</p>
                  )}
                  {addonCat.length !== 0 ? (
                    <p className="custom-text">Customizations available</p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <p className="dish-calories">{dishCalories} calories</p>
              <img src={dishImage} className="dish-image" />
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem
