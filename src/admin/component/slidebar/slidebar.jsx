import React from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
  CDBIcon,
} from 'cdbreact';
import { Typography } from '@mui/material';
import AccountMenu from '../../../Components/Menu/AccountMenu';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <c textColor="white" backgroundColor="#071952"  style={{  height: '100vh' }}>  
      <CDBSidebarHeader textColor="white" prefix={<CDBIcon icon="bars" size="lg" style={{ color: 'white' }} />}>
        <Typography variant="h6" color="white">STUDY4</Typography>
      </CDBSidebarHeader>

      <CDBSidebarContent>
        <CDBSidebarMenu textColor="white">
          <CDBSidebarMenuItem
            icon="th-large"
            textColor="white"
          >
            <Link to={"/admin/flash-card"} style={{color:'white'}}>Flash Card</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="sticky-note"
            textColor="white"
          >
            <Link to={"/admin/test"} style={{color:'white'}}>Đề Thi Thử Toeic</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="sticky-note"
            textColor="white"
          >
            <Link to={"/admin/test"} style={{color:'white'}}>Flash-Card</Link>
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center', color: 'white' }}>
        <div className="sidebar-btn-wrapper" style={{paddingBottom:'10px'}}>
           <AccountMenu/>
        </div>
      </CDBSidebarFooter>
    </c>
  );
};

export default Sidebar;
