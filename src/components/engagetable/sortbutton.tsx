// Stuff for sort buttons
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SortMenu({ stateHandler, menuOptions, currentOption }: { stateHandler: any, menuOptions: any[][], currentOption: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option: string) => {
    return () => {
      stateHandler(option);
      setAnchorEl(null);
    }
  };
  // Styling and controls used for the button
  return (
    <div>
      <Button
        style={{
          borderRadius: 20,
          backgroundColor: "#f0f0f0",
          color: "#6466e9",
          padding: "5px 20px",
          fontSize: "16px",
          margin: 20
        }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {currentOption}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuOptions.map(option => <MenuItem onClick={handleClose(option[1])}>{option[0]}</MenuItem>)}
      </Menu>
    </div>
  );
}