import { Avatar, Box, Button, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Modal, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeOrderItem, sendOrder } from '../store/actions/orders';
import { useNavigate } from 'react-router-dom';
import { OrderType } from '../store/types/orders';
import { ButtonUnstyled } from '@mui/base';
import sushiGif from '../Assets/Images/sushi.gif';


const CustomButton = styled(ButtonUnstyled)({
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

const ListWrapper = styled('div')<{ grow?: boolean }>((props) => ({
    padding: '0 40px',
    flexGrow: props.grow ? 1 : 0
}))

const SpacedRow = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '30px 0',
    marginRight: '20px',
    flexGrow: '0'
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
    const { type: orderType, items: orderItems, billPrice } = useAppSelector(state => state.orders);
    const [ showSendOrderModal, setShowSendOrderModal ] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if ( !orderItems.length )
            navigate("/menu");
    }, [ orderItems, navigate ]);

    const cartValue = orderItems.reduce((totalPrice, item) => {
        if ( orderType === OrderType.AYCE && item.included ) {
            return totalPrice;
        }

        return totalPrice + (item.price * item.quantity);
    }, billPrice);
    
    const handleSendOrder = () => {
        dispatch(sendOrder());
        setShowSendOrderModal(false);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '20px', height: 'calc(100vh - 30px)' }}>
            <Modal
                open={showSendOrderModal}
                onClose={handleSendOrder}
            >
               <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#D3CD00',
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center'
               }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Your order is on your way!
                    </Typography>
                   <img src={sushiGif} style={{width: '50%'}} alt="loading..." />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Now you can close this modal and continue your experience.
                    </Typography>
                </Box>
            </Modal>

            <ListWrapper>
                <Button onClick={() => navigate("/menu")}><h3 style={{margin: 0, marginBottom: '10px'}}>{'GO BACK'}</h3></Button>
            </ListWrapper>

            <ListWrapper grow>
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
                                            {item.quantity}x{((orderType === OrderType.AYCE && item.included) ? 0 : item.price).toFixed(2)}€
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </ListWrapper>

            <ListWrapper>
                <SpacedRow>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <h4 style={{ margin: 0, marginRight: '10px' }}>Total price:</h4>
                        <CustomizedInput
                            value={cartValue.toFixed(2) + '€'}
                            id="counter-input"
                            readOnly
                        />
                    </div>
                    <CustomButton variant="outlined" onClick={() => setShowSendOrderModal(true)}>
                        SEND ORDER
                    </CustomButton>
                </SpacedRow>
            </ListWrapper>
        </div>
    )
}