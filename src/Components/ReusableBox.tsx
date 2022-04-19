import * as React from 'react';
import Box from '@mui/material/Box';

interface ReusableBoxProps {
    imgUrl: string
}


function ReusableBox(props: ReusableBoxProps ) {
    return (
        <Box
            sx={{
                width: 227,
                height: 227,
                margin:'30px',
                borderRadius: '10px',
                backgroundImage: "url(" + props.imgUrl + ")",
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        />
    );
}

export default ReusableBox