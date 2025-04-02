import { Link, useLocation } from "react-router-dom";
import Logo from "../images/logo/logo_blue_nobg.png";
import styles from "../styles/Navbar.module.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Person from '@mui/icons-material/Person';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Logout from '@mui/icons-material/Logout';

function Navbar() {
    const location = useLocation();
    const { userData, logout} = useContext(AppContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <nav>
                <div className={styles.navbar}>
                    <div className={styles.navbarImg}>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                            <img src={Logo} alt="Auto GO" />
                        </Link>
                    </div>

                    <ul className={styles.navbarLinks}>
                        <li>
                            <Link
                                className={`${styles.homeLink} ${
                                    location.pathname === "/" ? styles.activePage : ""
                                }`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={` ${
                                    location.pathname === "/cars" ? styles.activePage : ""
                                }`}
                                to="/cars"
                            >
                                Cars
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${
                                    location.pathname === "/testimonials" ? styles.activePage : ""
                                }`}
                                to="/testimonials"
                            >
                                Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${
                                    location.pathname === "/contact" ? styles.activePage : ""
                                }`}
                                to="/contact"
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${
                                    location.pathname === "/about" ? styles.activePage : ""
                                }`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    {userData ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="My account">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{
                                        ml: 2,
                                        '& .MuiAvatar-root': {
                                            width: '2.3rem',
                                            height: '2.3rem',
                                            bgcolor: '#0065a1',
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: 'lighter',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        },
                                    }}
                                >
                                    <Avatar>
                                        {userData.name ? userData.name[0].toUpperCase() : "U"}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 10px 15px rgba(90, 194, 255, 0.47))',
                                            mt: 1.5,
                                            '& .MuiMenuItem-root': {
                                                padding: '.8rem 1.2rem',
                                                color: 'black',
                                                fontFamily: 'Rubik, sans-serif',
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                            },
                                            '& .MuiMenuItem-root:hover': {
                                                backgroundColor: 'grey',
                                                color: 'white',
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <Link to="/myaccount">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Person fontSize="medium" />
                                        </ListItemIcon>
                                        My Account
                                    </MenuItem>
                                </Link>
                                <Link to="/myreservations">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <BookmarkAddedIcon fontSize="medium" />
                                        </ListItemIcon>
                                        My Reservations
                                    </MenuItem>
                                </Link>
                                <Divider />
                                { !userData.isVerified && <Link to="/verify-email">
                                    <MenuItem>
                                        <ListItemIcon>
                                            <VerifiedUserIcon fontSize="medium"/>
                                        </ListItemIcon>
                                        Verify your email
                                    </MenuItem>
                                </Link>}
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        <Logout fontSize="medium" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <div className={styles.navbarButtons}>
                            <Link to="/login" className={styles.signInButton}>
                                Login
                            </Link>
                            <Link to="/signup" className={styles.registerButton}>
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;