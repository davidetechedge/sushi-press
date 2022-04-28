import {Button, Drawer, List, ListItem, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { resetOrder } from "../store/actions/orders";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import CommonDrawer from "../Components/CommonDrawer";


const MyMenuContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});


const MenuContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { type: orderType, menu } = useAppSelector(state => state.orders);
    const [menuCategories, setMenuCategories] = useState<string[]>([])
    
    useEffect(() => {
        if ( typeof orderType === "undefined" ) {
            navigate(`/`);
        }
    }, [navigate, orderType])

    useEffect(() => {
        if(menu.data && menu.data.length > 0)
            setMenuCategories(menu.data.map (elem => elem.category))
    }, [menu])

    return (
        <MyMenuContainer>
            <CommonDrawer items={menuCategories} goBack={() => dispatch(resetOrder())}/>
        </MyMenuContainer>)
}

export default MenuContainer;