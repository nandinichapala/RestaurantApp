import './App.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from './components/Header'
import TabListItem from './components/TabListItem'
import DishItem from './components/DishItem'
import CartContext from './context/CartContext'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apisStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class App extends Component {
  state = {
    activeApiStatus: apisStatus.initial,
    activeCategoryId: '11',
    dishesList: [],
    cartList: [],
    restaurantName: '',
  }

  componentDidMount() {
    this.getDishesList()
  }

  getDishesList = async () => {
    this.setState({activeApiStatus: apisStatus.inProgress})
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()

    const updatedList = data[0].table_menu_list.map(eachObj => ({
      menuCategory: eachObj.menu_category,
      menuCategoryId: eachObj.menu_category_id,
      menuCategoryImage: eachObj.menu_category_image,
      categoryDishes: eachObj.category_dishes.map(each => ({
        addonCat: each.addonCat,
        dishAvailability: each.dish_Availability,
        dishType: each.dish_Type,
        dishCalories: each.dish_calories,
        dishCurrency: each.dish_currency,
        dishDescription: each.dish_description,
        dishId: each.dish_id,
        dishImage: each.dish_image,
        dishName: each.dish_name,
        dishPrice: each.dish_price,
      })),
    }))
    this.setState({
      restaurantName: data[0].restaurant_name,
      dishesList: updatedList,
      activeApiStatus: apisStatus.success,
    })
  }

  onChangeActiveTabId = menuCategoryId => {
    this.setState({activeCategoryId: menuCategoryId})
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoadingView = () => (
    <div>
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {dishesList, activeCategoryId, restaurantName} = this.state

    const categoryWiseObj = dishesList.find(
      each => each.menuCategoryId === activeCategoryId,
    )
    const {categoryDishes} = categoryWiseObj

    return (
      <div className="main-container">
        <Header restoName={restaurantName} />
        <div className="content-container">
          <ul className="tabs-list-container">
            {dishesList.map(eachItem => (
              <TabListItem
                key={eachItem.menuCategoryId}
                eachTabItemDetails={eachItem}
                activeCategoryId={activeCategoryId === eachItem.menuCategoryId}
                onChangeActiveTabId={this.onChangeActiveTabId}
              />
            ))}
          </ul>
          <ul className="dish-list-container">
            {categoryDishes.map(eachDishItem => (
              <DishItem key={eachDishItem.dishId} dishDetails={eachDishItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderDishesItemCarts = () => {
    const {activeApiStatus} = this.state
    switch (activeApiStatus) {
      case apisStatus.inProgress:
        return this.renderLoadingView()
      case apisStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  deleteCartItem = dishId => {
    const {cartList} = this.state
    const updatedList = cartList.filter(each => each.dishId !== dishId)
    this.setState({cartList: updatedList})
  }

  addItemCart = dish => {
    const {cartList} = this.state
    const dishObject = cartList.find(each => each.dishId === dish.dishId)

    if (dishObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (dishObject.dishId === eachItem.dishId) {
            const updatedQuantity = dishObject.quantity + 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      const updatedList = [...cartList, {...dish, quantity: 1}]
      this.setState({cartList: updatedList})
    }
  }

  removeItemCart = dish => {
    const {cartList} = this.state
    const dishObj = cartList.find(each => each.dishId === dish.dishId)

    if (dishObj.quantity > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (dish.dishId === each.dishId) {
            const updatedQuantity = each.quantity - 1
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      this.deleteCartItem(dish.dishId)
      const updatedList = [...cartList, {...dish, quantity: 0}]
      this.setState({cartList: updatedList})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addItemCart: this.addItemCart,
          removeItemCart: this.removeItemCart,
          deleteCartItem: this.deleteCartItem,
          increamentCartItem: this.increamentCartItem,
        }}
      >
        <>{this.renderDishesItemCarts()}</>
      </CartContext.Provider>
    )
  }
}

export default App
