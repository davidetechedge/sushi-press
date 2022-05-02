import * as React from 'react';
import {Button, Drawer, List, ListItem, styled} from "@mui/material";
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


interface CommonDrawerProps {
    items: string[]
    goBack : () => void
    type: string
    onClickCategory : (cat: string) => void
}
interface DivProps {
    active: boolean;
}

const CustomList = styled(List)({
    margin: '40px 0 50px 0'
});

const CustomButton = styled(ButtonUnstyled)<DivProps>(({ theme, active }) => ({
    fontWeight: 'bold',
    fontSize: '0.875rem',
    color: '#282828',
    width: '260px',
    borderRadius: '10px',
    backgroundColor: active ? '#C9C9C9' : '#F8F8F8',
    padding: '12px 24px',
    cursor: 'pointer',
    border: 'none',
    '&:hover': {
        backgroundColor: '#C9C9C9'
    }
}));

const drawerWidth = 300;

function CommonDrawer(props: CommonDrawerProps ) {

    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState<string>('')

    useEffect(() => {
        const pathArray = location.pathname.split('/')
        console.log(pathArray[pathArray.length-1])
        setActiveCategory(pathArray[pathArray.length-1])
    }, [location])

    return (
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
            <CustomList>
                {props.items.map((text) => (
                    <ListItem key={text}>
                        <CustomButton variant="outlined" active={text === activeCategory} onClick={() => props.onClickCategory(text)}>
                            {text.toUpperCase()}
                        </CustomButton>
                    </ListItem>
                ))}
            </CustomList>
            <h4 style={{margin: '0 0 0 30px'}}>{`Menu: ${props.type === 'all-you-can-eat' ? 'all you can eat' : 'à la carte'}` }</h4>
            <Button onClick={props.goBack}><h3 style={{margin: 0}}>{'GO BACK TO MENU SELECTION'}</h3></Button>
        </Drawer>
    );
}

export default CommonDrawer