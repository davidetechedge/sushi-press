import {IconButton, InputAdornment, InputBase, styled} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { resetOrder } from "../store/actions/orders";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import CommonDrawer from "../Components/CommonDrawer";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import * as React from "react";


const MyMenuContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const FixedHeaderContainer =styled('div')({
    position: 'fixed',
    right: '40px',
    top: '18px',
    width: '100%',
    textAlign: 'right'
});

const CustomizedInput = styled(InputBase)({
    '& .MuiInputBase-input': {
        borderRadius: 6,
        position: 'relative',
        backgroundColor: '#FFFFFF',
        width: '65px',
        padding: '4px 8px',
        textAlign: 'center',
        fontWeight: 'bold'
    },

});


const MenuContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { type: orderType, menu } = useAppSelector(state => state.orders);
    const [menuCategories, setMenuCategories] = useState<string[]>([])
    const [cartValue, setCartValue] = useState<string>('')
    
    useEffect(() => {
        if ( typeof orderType === "undefined" ) {
            navigate(`/`);
        }
    }, [navigate, orderType])

    useEffect(() => {
        if(menu.data && menu.data.length > 0)
            setMenuCategories(menu.data.map (elem => elem.category))
    }, [menu])

    useEffect(() => {
        if(orderType && orderType==='all-you-can-eat')
            setCartValue('24,99 €')
        else
            setCartValue('2,50 €')
    }, [orderType])

    return (
        <MyMenuContainer>
            <FixedHeaderContainer>
                <CustomizedInput
                    value={cartValue}
                    id="counter-input"
                    readOnly
                />
                <IconButton aria-label="cart" sx={{ color: '#282828' }} onClick={()=>{}}>
                    <LocalGroceryStoreIcon fontSize={'large'} />
                </IconButton>
            </FixedHeaderContainer>
            <CommonDrawer items={menuCategories} goBack={() => dispatch(resetOrder())} type={orderType || ""}/>
        </MyMenuContainer>)
}

export default MenuContainer;