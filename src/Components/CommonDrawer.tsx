import * as React from 'react';
import {Button, Drawer, List, ListItem, styled} from "@mui/material";
import {resetOrder} from "../store/actions/orders";

interface CommonDrawerProps {
    items: string[]
    goBack : () => void
}

const drawerWidth = 300;

function CommonDrawer(props: CommonDrawerProps ) {
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
            <List>
                {props.items.map((text, index) => (
                    <ListItem key={text}>
                        <Button variant="outlined" disabled>
                            {text}
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Button onClick={props.goBack}>Go back</Button>
        </Drawer>
    );
}

export default CommonDrawer