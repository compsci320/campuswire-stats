import React from 'react';
import './navbar.css';
import { ListItem, ListItemButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import MovingIcon from '@mui/icons-material/Moving';
import TrafficIcon from '@mui/icons-material/Traffic';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AnalyticsIcon from '@mui/icons-material/Analytics';

interface NavbarProps {
  width: number;
  page: string;
  setPage: (newPage: string) => void;
}

function Navbar(props: NavbarProps) {
  const navigateTo = useNavigate();
  const location = useLocation();

  const pages = [
    {
      path: '/trends',
      title: 'Trends',
      icon: <MovingIcon sx={{ fontSize: 25, marginRight: 2 }} />
    },
    {
      path: '/traffic',
      title: 'Traffic',
      icon: <TrafficIcon sx={{ fontSize: 25, marginRight: 2 }} />
    },
    {
      path: '/engagement',
      title: 'Engagement',
      icon: <Diversity3Icon sx={{ fontSize: 25, marginRight: 2 }} />
    },
  ];

  return (
    <div style={{ width: props.width }} className="navbar">
      <AnalyticsIcon sx={{ fontSize: 60, marginLeft: 1, marginTop: 1, marginBottom: 3, color: '#F0F0F0' }} />
      {
        pages.map(page => (
          <ListItem disablePadding={true} key={page.title}>
            <div className="navbar-item" style={{ 
                backgroundColor: location.pathname === page.path ? "#222c40" : "rgb(0, 0, 0, 0)"
              }}
            >
                <ListItemButton 
                    sx={{
                      "&.Mui-focusVisible": { backgroundColor: "#222c40", color: "#F0F0F0" },
                      "&:hover": { backgroundColor: "#222c40", color: "#F0F0F0" },
                      borderRadius: 2,
                      padding: 1.4 
                    }} 
                    onClick={() => navigateTo(page.path)}
                >
                { page.icon }
                { page.title }
                </ListItemButton>
            </div>
          </ListItem>
        ))
      }
    </div>
  );
}

export default Navbar;