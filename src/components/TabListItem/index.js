import './index.css'

const TabListItem = props => {
  const {eachTabItemDetails, activeCategoryId, onChangeActiveTabId} = props
  const {menuCategoryId, menuCategory} = eachTabItemDetails
  const onClickActiveTabItem = () => {
    onChangeActiveTabId(menuCategoryId)
  }

  const activeBtn = activeCategoryId ? 'active-btn' : ''
  return (
    <li className="tab-item-main-container">
      <button
        className={`tab-item-btn ${activeBtn}`}
        type="button"
        onClick={onClickActiveTabItem}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabListItem
