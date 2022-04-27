import {Button, Drawer, List, ListItem, ListItemIcon, ListItemText, styled,} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useParams} from "react-router-dom";


const MyMenuContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const drawerWidth = 300;


const MenuContainer = () => {

    const { type_id } = useParams();


    return (
        <MyMenuContainer>
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
                <List>
                    {['hosomaki', 'soups', 'salads', 'uramaki'].map((text, index) => (
                        <ListItem key={text}>
                            <Button variant="outlined" disabled>
                                {text}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </MyMenuContainer>)
}

export default MenuContainer;