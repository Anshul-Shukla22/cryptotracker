import React from 'react'
import { CryptoState } from "../CryptoContext";
import { useNavigate } from 'react-router-dom';
import { Container, ThemeProvider } from '@mui/system';
import { AppBar, createTheme, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import './Header.css'
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
const Header = () => {
    const { currency, setCurrency, user } = CryptoState();
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    return (
        <ThemeProvider theme={darkTheme} >
            <AppBar color="transparent" position="static" >
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate(`/`)}
                            variant="h6"
                            className='title'
                        >
                            Crypto Tracker
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        <Select
                            className='select'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currency}
                            color="secondary"
                            style={{ width: 100, height: 40, marginLeft: 15, color: '#fff' }}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                        {user ? <UserSidebar/> : <AuthModal />}

                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header