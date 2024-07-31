import { AppBar, Button, Toolbar, Typography, makeStyles } from "@mui/material";
import { NavLink } from "react-router-dom";
import getUser from "../../../helper/User";
import AccountMenu from "../../../Components/Menu/AccountMenu";
const token = false;



export default function HeaderAdmin(props) {
    const user = getUser();
    return (
        <header style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',background:'#071952',color:'white'}}>
           <div style={{background: '#071952',flexDirection:'column',display:'flex',width:'20%'}} >
                <Toolbar style={{justifyContent:'space-between'}}>
                    <div className="logo">
                            <Typography variant="h4">
                                STUDY4
                            </Typography>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyItems:'flex-end'}}>
                        <div className="nav-link">
                            <NavLink to={"test-simulator"} className="navbar-button">
                                Đề Toeic
                            </NavLink>
                            <NavLink className="navbar-button">
                                Khóa Học
                            </NavLink>
                            <NavLink className="navbar-button">
                                Flash Card
                            </NavLink>
                        </div>
                    </div>
                    
                </Toolbar>
           </div>
        </header>
    );
}