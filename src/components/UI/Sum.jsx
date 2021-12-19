import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

export default function PositionedMenu({ ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          border: "1px solid #C2E0FF",
        }}
      >
        {(((props.water + props.light + props.gas) * 100) / 100).toFixed(2)} руб.
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Газ {props.gas} руб.</MenuItem>
        <MenuItem onClick={handleClose}>Вода {props.water} руб.</MenuItem>
        <MenuItem onClick={handleClose}>Свет {props.light} руб.</MenuItem>
      </Menu>
    </div>
  );
}
