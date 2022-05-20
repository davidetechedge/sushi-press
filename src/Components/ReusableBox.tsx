import * as React from 'react';
import Box from '@mui/material/Box';
import {styled, Typography} from "@mui/material";

interface ReusableBoxProps {
    imgUrl: string,
    allowClick?: boolean,
    squared?: boolean,
    label: string,
    onClick: () => void,
    greyLabel: boolean,
    price?: number
}
interface DivProps {
    greylabel?: "true" | "false";
    squared?: "true" | "false";
}

const LabelContainer = styled('div')<DivProps>((props) => ({
    backgroundColor: props.greylabel === "true" ? '#E3E3E3' : '#FFFFFF',
    width: '100%',
    borderBottomLeftRadius: props.squared === "true" ? 0 : '10px',
    borderBottomRightRadius: props.squared === "true" ? 0 : '10px',
    position: 'sticky',
    lineHeight: props.greylabel === "true" ? 0 : '10px',
    textAlign: 'center'
}));

const FixedPriceContainer =styled('div')({
    position: 'absolute',
    right: 8,
    top: 16,
    backgroundColor: '#E3E3E3',
    padding: '4px 8px',
    borderRadius: 6,
    textAlign: 'center'
});


function ReusableBox(props: ReusableBoxProps ) {
    return (
        <Box
            sx={{
                minWidth: 227,
                height: 227,
                margin: '30px',
                borderRadius: props.squared ? 0 : '10px',
                backgroundSize: 'cover',
                backgroundImage: "url(" + props.imgUrl + ")",
                backgroundRepeat: 'no-repeat',
                '&:hover': {
                    opacity: props.allowClick ? [0.9, 0.8, 0.7] : 1,
                },
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative'
            }}
            onClick={props.onClick}
        >
            {typeof props.price !== "undefined" && (
                <FixedPriceContainer>
                    <Typography variant="body1" display="block">
                        {props.price.toFixed(2) + '€'}
                    </Typography>
                </FixedPriceContainer>
            )}
            <LabelContainer greylabel={props.greyLabel ? "true" : "false"} squared={props.squared ? "true" : "false"}>
                <h3 style={{marginTop: props.greyLabel? '15px' : ''}}>{props.label}</h3>
            </LabelContainer>
        </Box>
    );
}

export default ReusableBox