import {Grid, IconButton, InputAdornment, InputBase, styled} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import {resetOrder, setOrderPeople} from "../store/actions/orders";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import CommonDrawer from "../Components/CommonDrawer";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import * as React from "react";
import {MenuCategoryItem} from "../store/types/orders";
import ReusableBox from "../Components/ReusableBox";
import ReusableCounter from "../Components/ReusableCounter";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";


const MyMenuContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const RightMenuContainer = styled('div')({
    margin: '50px',
    display: 'block',
    width: '1000px',
    height: '1000px',

})

const FlexContainerCounter = styled('div')({
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

const CustomButton = styled(ButtonUnstyled)({
    marginTop: '30px',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    color: '#282828',
    width: '200px',
    borderRadius: '10px',
    backgroundColor:  '#D3CD00',
    padding: '12px 24px',
    cursor: 'pointer',
    border: 'none',
    '&:hover': {
        backgroundColor: '#C9C9C9'
    }
});


const MenuContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { type: orderType, menu } = useAppSelector(state => state.orders);
    const [menuCategories, setMenuCategories] = useState<string[]>([])
    const [cartValue, setCartValue] = useState<string>('')
    const [menuItems, setMenuItems] = useState<MenuCategoryItem[]>([])
    
    useEffect(() => {
        if ( typeof orderType === "undefined" ) {
            navigate(`/`);
        }
    }, [navigate, orderType])

    useEffect(() => {
        if(menu.data && menu.data.length > 0)
            setMenuCategories(menu.data.map(elem => elem.category))
    }, [menu])

    useEffect(() => {
        if(menuCategories.length >0)
            onClickCategory(menuCategories[0])
    }, [menuCategories])

    useEffect(() => {
        if(orderType && orderType==='all-you-can-eat')
            setCartValue('24,99 €')
        else
            setCartValue('2,50 €')
    }, [orderType])

    const onClickCategory = (cat: string) => {
        console.log(cat, menu.data?.find((elem) => elem.category === cat)?.items)
        setMenuItems(menu?.data?.find((elem) => elem.category === cat)?.items || [])
        navigate(`/menu/`+ cat);
    }

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
            <CommonDrawer
                items={menuCategories}
                goBack={() => dispatch(resetOrder())}
                type={orderType || ""}
                onClickCategory={onClickCategory}/>
            <RightMenuContainer>
                <Grid container
                    direction="row"
                    spacing={4}
                    alignItems="flex-start"
                    justifyContent="center"
                    style={{ minHeight: '1000px' }}>
                {menuItems.map((item, index) => (
                        <Grid item key={index}>
                            <ReusableBox
                                imgUrl={item.img}
                                label={item.name}
                                onClick={() => {}}
                                greyLabel
                                price={item.price}
                            />
                            <FlexContainerCounter>
                                <ReusableCounter
                                    label={'QUANTITY'}
                                    counter={1}
                                    onClickAdd={() => {}}
                                    onClickRemove={() => {}}
                                />
                            </FlexContainerCounter>
                            <FlexContainerCounter>
                            <CustomButton variant="outlined" onClick={() => {}}>
                                ADD TO CART
                            </CustomButton>
                            </FlexContainerCounter>
                        </Grid>
                    ))}
                </Grid>
            </RightMenuContainer>
        </MyMenuContainer>)
}

export default MenuContainer;