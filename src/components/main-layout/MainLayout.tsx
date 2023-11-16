import React from 'react';
import './MainLayout.css';
import { Drawer, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar';

function MainLayout() {
    const [state, setState] = React.useState({ open: false });
    const [page, setPage] = React.useState('');
    const remoteSetPage = (newPage: string) => setPage(newPage);

    const ANCHOR = 'left';
    const WIDTH = 225;

    const toggleDrawer =
        (isOpen: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
                    return;
                }

                setState({ ...state, open: isOpen });
            };

    return (
        <div>
            <Drawer
                anchor={ANCHOR}
                open={state.open}
                onClose={toggleDrawer(false)}
                variant="permanent"
            >
                <Navbar 
                    width={ WIDTH }
                    page={ page }
                    setPage={ remoteSetPage } 
                />
            </Drawer>
            <div style={{ paddingLeft: WIDTH }}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
