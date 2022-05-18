import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeOrderItem } from '../store/actions/orders';
import { useNavigate } from 'react-router-dom';

const ListWrapper = styled('div')({
    padding: 40
})

export const CartContainer: React.VFC = () => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector(state => state.orders);
    const navigate = useNavigate();

    useEffect(() => {
        if ( !items.length )
            navigate("/menu");
    }, [ items, navigate ]);

    return (
        <ListWrapper>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {items.map((item, index) => (
                    <ListItem key={index} 
                        alignItems="flex-start" 
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
        </ListWrapper>
    )
}