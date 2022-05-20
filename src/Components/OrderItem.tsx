import { Grid, styled } from '@mui/material';
import React, { useState } from 'react';
import { MenuCategoryItem, OrderType } from "../store/types/orders"
import ReusableBox from './ReusableBox';
import ReusableCounter from "./ReusableCounter";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { useAppDispatch, useAppSelector } from '../store';
import { addOrderItem } from '../store/actions/orders';

const FlexContainerCounter = styled('div')({
    display: 'flex',
    justifyContent: 'center'
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

const OrderContainer = styled('div')({
    padding: 8,
    paddingTop: 0,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden'
});

const OrderHeader = styled('div')({
    margin: -38,
    marginBottom: 0
})

export type OrderItemProps = {
    data: MenuCategoryItem
}

export const OrderItem: React.VFC<OrderItemProps> = ({ data }) => {
    const [ quantity, setQuantity ] = useState<number>(1);
    const dispatch = useAppDispatch();
    const { type } = useAppSelector(state => state.orders)

    const addOrder = () => {
        dispatch(addOrderItem({
            ...data,
            quantity
        }));
    }
    return (
        <Grid item>
            <OrderContainer>
                <OrderHeader>
                    <ReusableBox
                        imgUrl={data.img}
                        label={data.name}
                        onClick={() => {}}
                        greyLabel
                        price={(type === OrderType.AYCE && data.included) ? 0 : data.price}
                        squared
                    />
                </OrderHeader>
                <FlexContainerCounter>
                    <ReusableCounter
                        label={'QUANTITY'}
                        counter={quantity}
                        onClickAdd={() => setQuantity(counter => counter + 1)}
                        onClickRemove={() => setQuantity(counter => Math.max(1, counter - 1))}
                    />
                </FlexContainerCounter>
                <FlexContainerCounter>
                    <CustomButton variant="outlined" onClick={addOrder}>
                        ADD TO CART
                    </CustomButton>
                </FlexContainerCounter>
            </OrderContainer>
        </Grid>
    );
}