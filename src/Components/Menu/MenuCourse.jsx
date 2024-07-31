import { Button, Menu } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
export default function MenuCourse (props)  {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
          transformOrigin={{vertical: "top", horizontal: "left"}}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/toeic-course" onClick={handleClose}>
              <MenuItem>TOEIC</MenuItem>
          </Link>
          <Link to="/ielts-course" onClick={handleClose}>
              <MenuItem>IELTS</MenuItem>
          </Link>
          <Link to="/toefl-course" onClick={handleClose}>
              <MenuItem>TOEFL</MenuItem>
          </Link>
          <Button>
             Đăng Nhập
          </Button>
        </Menu>
    )
}