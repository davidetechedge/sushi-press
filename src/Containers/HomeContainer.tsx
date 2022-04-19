import ReusableBox from "../Components/ReusableBox";
import {styled} from "@mui/material";
import allyoucaneat from '../Assets/Images/allyoucaneat.png'
import alacarte from '../Assets/Images/alacarte.png'

const MyHomeContainer = styled('div')({
    maxWidth: '600px',
    marginLeft:'auto',
    marginRight:'auto'
});

const FlexContainer = styled('div')({
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between'

});

const HomeContainer = () => {
    return (<MyHomeContainer><FlexContainer><ReusableBox imgUrl = {allyoucaneat}/><ReusableBox imgUrl = {alacarte}/></FlexContainer></MyHomeContainer>)
}

export default HomeContainer;