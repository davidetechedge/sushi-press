import ReusableBox from "../Components/ReusableBox";
import {styled} from "@mui/material";
import allyoucaneat from '../Assets/Images/allyoucaneat.png'
import alacarte from '../Assets/Images/alacarte.png'
import logo from '../Assets/Images/logo.png'
import ReusableCounter from "../Components/ReusableCounter";
import {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setOrderPeople, setOrderType } from "../store/actions/orders";
import { OrderType } from "../store/types/orders";
import { useNavigate } from "react-router-dom";

const MyHomeContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const LogoContainer = styled('div')({
    position: 'fixed',
    top: '50px',
    textAlign: 'center',
});

const ItemsContainer = styled('div')({
    width: '600px',
    height: '500px',
    position: 'absolute',
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'

});

const FlexContainerBoxes = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

const FlexContainerCounter = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const FooterTextContainer =styled('div')({
    position: 'fixed',
    left: '30px',
    bottom: '30px',
    width: '100%',
    textAlign: 'left'
});

const HomeContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { people: peopleCounter,  type: orderType } = useAppSelector(state => state.orders);

    useEffect(() => {
        if ( typeof orderType !== "undefined" ) {
            navigate(`/${orderType}`);
        }
    }, [navigate, orderType])

    return (
        <MyHomeContainer>
            <LogoContainer>
                <img src={logo} style={{maxWidth: '30%', height: 'auto'}} alt="SushiPress Logo" />
            </LogoContainer>
            <ItemsContainer>
                <FlexContainerBoxes>
                    <ReusableBox
                        imgUrl={allyoucaneat}
                        label={"All you can eat *"}
                        onClick={() => dispatch(setOrderType(OrderType.AYCE))}
                    />
                    <ReusableBox
                        imgUrl={alacarte}
                        label={"A la carte **"}
                        onClick={() => dispatch(setOrderType(OrderType.CARTE))}
                    />
                </FlexContainerBoxes>
                <FlexContainerCounter>
                    <ReusableCounter
                        label={'PEOPLE'}
                        counter={peopleCounter}
                        onClickAdd={() => dispatch(setOrderPeople(peopleCounter + 1))}
                        onClickRemove={() => dispatch(setOrderPeople(peopleCounter - 1))}
                    />
                </FlexContainerCounter>
            </ItemsContainer>
            <FooterTextContainer>
                <h5>{'* All you can eat menu has a fixed cost of 24,99€ per person'}</h5>
                <h5>{'** Á la carte menu has a fixed cost of 2,50€ per person'}</h5>
            </FooterTextContainer>
        </MyHomeContainer>)
}

export default HomeContainer;