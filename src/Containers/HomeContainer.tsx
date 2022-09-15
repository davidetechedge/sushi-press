import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material'
import ReusableBox from '../Components/ReusableBox'
import allyoucaneat from '../Assets/Images/allyoucaneat.png'
import alacarte from '../Assets/Images/alacarte.png'
import logo from '../Assets/Images/logo_nobg.png'
import ReusableCounter from '../Components/ReusableCounter'
import { useAppDispatch, useAppSelector } from '../store'
import { getMenu, setOrderPeople, setOrderType } from '../store/actions/orders'
import { OrderType } from '../store/types/orders'

const MyHomeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const LogoContainer = styled('div')({
  position: 'fixed',
  top: '50px',
  textAlign: 'center',
})

const ItemsContainer = styled('div')({
  width: '600px',
  height: '500px',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
})

const FlexContainerBoxes = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})

const FlexContainerCounter = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
})

const FooterTextContainer = styled('div')({
  position: 'fixed',
  left: '30px',
  bottom: '30px',
  width: '100%',
  textAlign: 'left',
})

const HomeContainer = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { people: peopleCounter, type: orderType } = useAppSelector((state) => state.orders)

  React.useEffect(() => {
    dispatch(getMenu())
  }, [dispatch])

  React.useEffect(() => {
    if (typeof orderType !== 'undefined') {
      navigate(`/menu`)
    }
  }, [navigate, orderType])

  return (
    <MyHomeContainer>
      <LogoContainer>
        <img src={logo} style={{ maxWidth: '40%', height: 'auto' }} alt="SushiPress Logo" />
      </LogoContainer>
      <ItemsContainer>
        <FlexContainerBoxes>
          <ReusableBox
            allowClick
            imgUrl={allyoucaneat}
            label="All you can eat *"
            onClick={() => dispatch(setOrderType(OrderType.AYCE))}
            greyLabel={false}
          />
          <ReusableBox
            allowClick
            imgUrl={alacarte}
            label="A la carte **"
            onClick={() => dispatch(setOrderType(OrderType.CARTE))}
            greyLabel={false}
          />
        </FlexContainerBoxes>
        <FlexContainerCounter>
          <ReusableCounter
            label="PEOPLE"
            counter={peopleCounter}
            onClickAdd={() => dispatch(setOrderPeople(peopleCounter + 1))}
            onClickRemove={() => dispatch(setOrderPeople(peopleCounter - 1))}
          />
        </FlexContainerCounter>
      </ItemsContainer>
      <FooterTextContainer>
        <h5>* All you can eat menu has a fixed cost of 24,99€ per person</h5>
        <h5>** Á la carte menu has a fixed cost of 2,50€ per person</h5>
      </FooterTextContainer>
    </MyHomeContainer>
  )
}

export default HomeContainer
