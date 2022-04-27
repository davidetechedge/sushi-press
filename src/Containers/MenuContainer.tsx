import {Button, Drawer, List, ListItem, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { resetOrder } from "../store/actions/orders";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const MyMenuContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const drawerWidth = 300;


const MenuContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { type: orderType } = useAppSelector(state => state.orders);
    
    useEffect(() => {
        if ( typeof orderType === "undefined" ) {
            navigate(`/`);
        }
    }, [navigate, orderType])

    return (
        <MyMenuContainer>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    '& .MuiListItem-root': {
                        justifyContent: 'center',
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    {['hosomaki', 'soups', 'salads', 'uramaki'].map((text, index) => (
                        <ListItem key={text}>
                            <Button variant="outlined" disabled>
                                {text}
                            </Button>
                        </ListItem>
                    ))}
                </List>

                <Button onClick={() => dispatch(resetOrder())}>Go back</Button>
            </Drawer>
        </MyMenuContainer>)
}

export default MenuContainer;