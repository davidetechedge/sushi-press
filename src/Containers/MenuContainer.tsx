import { Alert, Grid, IconButton, InputBase, Snackbar, styled } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { resetOrder } from '../store/actions/orders'
import CommonDrawer from '../Components/CommonDrawer'
import { MenuCategoryItem, OrderType } from '../store/types/orders'
import { OrderItem } from '../Components/OrderItem'

const MyMenuContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const RightMenuContainer = styled('div')({
  margin: '80px 50px',
  display: 'block',
  width: '100%',
})

const FixedHeaderContainer = styled('div')({
  position: 'fixed',
  right: '40px',
  top: '18px',
  width: '100%',
  textAlign: 'right',
})

const CustomizedInput = styled(InputBase)({
  '& .MuiInputBase-input': {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    width: '65px',
    padding: '4px 8px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

const CustomizedSnackbar = styled(Snackbar)({
  backgroundColor: '#D3CD00',
})

const CustomizedAlert = styled(Alert)({
  backgroundColor: '#D3CD00',
  '& 	.MuiAlert-icon': {
    color: '#1E4620',
  },
})

const MenuContainer = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    type: orderType,
    menu,
    items: orderItems,
    billPrice,
  } = useAppSelector((state) => state.orders)
  const [menuCategories, setMenuCategories] = React.useState<string[]>([])
  const [menuItems, setMenuItems] = React.useState<MenuCategoryItem[]>([])
  const [notifications, setNotifications] = React.useState<number>(0)

  const onClickCategory = React.useCallback(
    (cat: string) => {
      setMenuItems(menu?.data?.find((elem) => elem.category === cat)?.items || [])
      navigate(`/menu/${cat}`)
    },
    [menu?.data, navigate],
  )

  React.useEffect(() => {
    if (typeof orderType === 'undefined') {
      navigate(`/`)
    }
  }, [navigate, orderType])

  React.useEffect(() => {
    if (menu.data && menu.data.length > 0) setMenuCategories(menu.data.map((elem) => elem.category))
  }, [menu])

  React.useEffect(() => {
    if (menuCategories.length > 0 && !menuItems.length) onClickCategory(menuCategories[0])
  }, [menuCategories, menuItems.length, onClickCategory])

  const cartValue = orderItems.reduce((totalPrice, item) => {
    if (orderType === OrderType.AYCE && item.included) {
      return totalPrice
    }

    return totalPrice + item.price * item.quantity
  }, billPrice)

  React.useEffect(() => {}, [notifications])
  return (
    <MyMenuContainer>
      {new Array(notifications).fill(0).map((_, index) => (
        <CustomizedSnackbar
          key={`${index + Math.random() * 10}`}
          open
          autoHideDuration={6000}
          onClose={() => setNotifications((prev) => prev - 1)}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <CustomizedAlert
            onClose={() => setNotifications((prev) => prev - 1)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Item added to cart!
          </CustomizedAlert>
        </CustomizedSnackbar>
      ))}

      <FixedHeaderContainer>
        <CustomizedInput value={`${cartValue.toFixed(2)}€`} id="cart-price" readOnly />
        <IconButton
          aria-label="cart"
          sx={{ color: '#282828' }}
          onClick={() => navigate('/cart')}
          disabled={!orderItems.length}
        >
          <LocalGroceryStoreIcon fontSize="large" />
        </IconButton>
      </FixedHeaderContainer>
      <CommonDrawer
        items={menuCategories}
        goBack={() => dispatch(resetOrder())}
        type={orderType || OrderType.AYCE}
        onClickCategory={onClickCategory}
      />
      <RightMenuContainer>
        <Grid
          container
          direction="row"
          spacing={4}
          alignItems="flex-start"
          justifyContent="left"
          aria-label="items-grid"
        >
          {menuItems.map((item) => (
            <OrderItem
              key={JSON.stringify(item)}
              data={item}
              onAdd={() => setNotifications((prev) => prev + 1)}
            />
          ))}
        </Grid>
      </RightMenuContainer>
    </MyMenuContainer>
  )
}

export default MenuContainer
