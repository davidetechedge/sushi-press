import * as React from 'react';
import Box from '@mui/material/Box';
import {styled} from "@mui/material";

interface ReusableBoxProps {
    imgUrl: string
    label: string
    onClick: () => void
    greyLabel: boolean
}
interface DivProps {
    greyLabel: boolean;
}

const LabelContainer = styled('div')<DivProps>(({ theme, greyLabel }) => ({
    backgroundColor: greyLabel ? '#E3E3E3' : '#FFFFFF',
    width: '100%',
    height: greyLabel ? '30px' : '50px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

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
            <LabelContainer greyLabel={props.greyLabel}>
                <h3>{props.label}</h3>
            </LabelContainer>
        </Box>
    );
}

export default ReusableBox