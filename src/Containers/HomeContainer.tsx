import ReusableBox from "../Components/ReusableBox";
import {styled} from "@mui/material";
import allyoucaneat from '../Assets/Images/allyoucaneat.png'
import alacarte from '../Assets/Images/alacarte.png'
import logo from '../Assets/Images/logo.png'
import ReusableCounter from "../Components/ReusableCounter";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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

    const [peopleCounter, setPeopleCounter] = useState<number>(1)
    let navigate = useNavigate();


    const onClickRemove = () => {
        if(peopleCounter > 1)
            setPeopleCounter(peopleCounter - 1)
    }


    return (
        <MyHomeContainer>
        <LogoContainer>
            <img src={logo} style={{maxWidth: '30%', height: 'auto'}}/>
        </LogoContainer>
    <ItemsContainer>
        <FlexContainerBoxes>
            <ReusableBox
                imgUrl={allyoucaneat}
                label={"All you can eat *"}
                onClick={()=>navigate("/menu/all-you-can-eat")}
            />
            <ReusableBox
                imgUrl={alacarte}
                label={"A la carte **"}
                onClick={()=>navigate("/menu/a-la-carte")}
            />
        </FlexContainerBoxes>
        <FlexContainerCounter>
            <ReusableCounter
                label={'PEOPLE'}
                counter={peopleCounter}
                onClickAdd={() => setPeopleCounter(peopleCounter + 1)}
                onClickRemove={onClickRemove}
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