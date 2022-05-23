import { Avatar, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeOrderItem } from '../store/actions/orders';
import { useNavigate } from 'react-router-dom';
import { OrderType } from '../store/types/orders';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

const ListWrapper = styled('div')({
    padding: '40px',
    overflow: 'auto',
    maxHeight: '60vh'
})

const ReversedRow = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '30px',
    gap: '10px'
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

export const CartContainer: React.VFC = () => {
    const dispatch = useAppDispatch();
    const { type: orderType, items: orderItems, people } = useAppSelector(state => state.orders);
    const navigate = useNavigate();

    useEffect(() => {
        if ( !orderItems.length )
            navigate("/menu");
    }, [ orderItems, navigate ]);

    const cartValue = orderItems.reduce((totalPrice, item) => {
        if ( orderType === OrderType.AYCE && item.included ) {
            return totalPrice;
        }

        return totalPrice + item.price;
    }, (orderType === OrderType.AYCE ? 24.99 : 2.50) * people);

    return (
        <ListWrapper>
            <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '10px' }}>
                {orderItems.map((item, index) => (
                    <ListItem key={index} 
                        alignItems="flex-start" 
                        sx={{ 
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                            '&:last-of-type': {
                                borderBottomWidth: 0
                            }
                        }}
                        secondaryAction={
                            <IconButton 
                                edge="end" 
                                aria-label="comments" 
                                onClick={() => dispatch(removeOrderItem(index))}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar src={item.img} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {item.quantity}x{(item.included ? 0 : item.price).toFixed(2)}€
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <ReversedRow>
                <h4>Total price:</h4>
                <CustomizedInput
                    value={cartValue.toFixed(2) + '€'}
                    id="counter-input"
                    readOnly
                />
            </ReversedRow>
        </ListWrapper>
    )
}