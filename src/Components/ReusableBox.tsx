import * as React from 'react';
import Box from '@mui/material/Box';
import {InputBase, styled} from "@mui/material";

interface ReusableBoxProps {
    imgUrl: string
    label: string
    onClick: () => void
    greyLabel: boolean
    price?: number
}
interface DivProps {
    greyLabel: boolean;
}

const LabelContainer = styled('div')<DivProps>(({ theme, greyLabel }) => ({
    backgroundColor: greyLabel ? '#E3E3E3' : '#FFFFFF',
    width: '227px',
    marginLeft: greyLabel ? '-221px' : '',
    height: greyLabel ? '30px' : '50px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    position: 'sticky',
    lineHeight: greyLabel ? 0 : '10px',
    textAlign: 'center'
}));

const FixedPriceContainer =styled('div')({
    position: 'sticky',
    marginBottom: '190px',
    marginLeft: '160px',
});

const CustomizedInput = styled(InputBase)({
    '& .MuiInputBase-input': {
        borderRadius: 6,
        position: 'relative',
        backgroundColor: '#E3E3E3',
        width: '45px',
        padding: '4px 8px',
        textAlign: 'center',
    },

});

function ReusableBox(props: ReusableBoxProps ) {
    return (
        <Box
            sx={{
                width: 227,
                height: 227,
                margin:'30px',
                borderRadius: '10px',
                backgroundSize: 'contain',
                backgroundImage: "url(" + props.imgUrl + ")",
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
                display: 'flex',
                alignItems: 'flex-end'
            }}
        onClick={props.onClick}
        >
            {props.price && <FixedPriceContainer>
                <CustomizedInput
                    value={props.price.toString() + '€'}
                    id="counter-input"
                    readOnly
                />
                </FixedPriceContainer>}
            <LabelContainer greyLabel={props.greyLabel}>
                <h3 style={{marginTop: props.greyLabel? '15px' : ''}}>{props.label}</h3>
            </LabelContainer>
        </Box>
    );
}

export default ReusableBox