import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../header/style.css';
import React, { useState, useCallback } from "react";
import getUser from "../../helper/User";
import AccountMenu from "../Menu/AccountMenu";

// Lazy load modal components
const LoginModal = React.lazy(() => import("../Modal/Auth/ModalLogin"));
const RegisterModal = React.lazy(() => import("../Modal/Auth/ModalRegister"));
const RegisterValidOTP = React.lazy(() => import("../Modal/Auth/ModalValidOTP"));
const ModalForgotPassWord = React.lazy(() => import("../Modal/Auth/ModalForgotPassword"));

export default function Header() {
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showModalValidOTP, setShowModalValidOTP] = useState(false);
    const [showModalForgotPassword, setShowModalForgotPassword] = useState(false);

    const user = getUser();
    const navigation = useNavigate();

    // Modal handlers
    const handleShowModalValidOTP = useCallback(() => {
        setShowModalRegister(false);
        setShowModalValidOTP(true);
    }, []);

    const handleCloseModalValidOTP = useCallback(() => {
        setShowModalValidOTP(false);
    }, []);

    const handleShowModalRegister = useCallback(() => {
        setShowModalLogin(false);
        setShowModalRegister(true);
    }, []);

    const handleCloseModalRegister = useCallback(() => {
        setShowModalRegister(false);
    }, []);

    const handleShowModalLogin = useCallback(() => {
        setShowModalRegister(false);
        setShowModalLogin(true);
    }, []);

    const handleCloseModalLogin = useCallback(() => {
        setShowModalLogin(false);
    }, []);

    const handleShowModalForgotPassword = useCallback(() => {
        setShowModalForgotPassword(true);
        setShowModalLogin(false);
    }, []);

    const handleCloseModalForgotPassword = useCallback(() => {
        setShowModalForgotPassword(false);
    }, []);

    // Navigation
    const handleNavigate = useCallback((path) => {
        navigation(path);
    }, [navigation]);

    return (
        <header>
            <AppBar style={{ background: '#071952' }} position="static">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div className="logo">
                        <Typography variant="h4" style={{ cursor: 'pointer' }} onClick={() => handleNavigate('/')}>
                            STUDY4
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div className="nav-link">
                            <span className="navbar-button" onClick={() => handleNavigate('/test-simulator')}>
                                Thi Thử
                            </span>
                            {/* <span className="navbar-button">
                                Role Play
                            </span> */}
                            <span className="navbar-button" onClick={() => handleNavigate('/flash-card')}>
                                Flash Card
                            </span>
                        </div>
                        {user ?
                            <AccountMenu className="navbar-button" />
                            : <Button variant="contained" style={{ backgroundColor: '#088395' }} onClick={handleShowModalLogin}>Đăng nhập</Button>}
                    </div>
                </Toolbar>
            </AppBar>
            <React.Suspense fallback={<div>Loading...</div>}>
                {showModalLogin && (
                    <LoginModal
                        show={showModalLogin}
                        handleClose={handleCloseModalLogin}
                        handleShowModalRegister={handleShowModalRegister}
                        handleShowModalForgotPassword={handleShowModalForgotPassword}
                    />
                )}
                {showModalRegister && (
                    <RegisterModal
                        show={showModalRegister}
                        handleClose={handleCloseModalRegister}
                        handleShowModalLogin={handleShowModalLogin}
                        handleShowRegisterValidOTP={handleShowModalValidOTP}
                    />
                )}
                {showModalValidOTP && (
                    <RegisterValidOTP
                        show={showModalValidOTP}
                        handleClose={handleCloseModalValidOTP}
                    />
                )}
                {showModalForgotPassword && (
                    <ModalForgotPassWord
                        show={showModalForgotPassword}
                        handleClose={handleCloseModalForgotPassword}
                    />
                )}
            </React.Suspense>
        </header>
    );
}
