import React, {useState, useEffect} from 'react';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import decode from 'jwt-decode';
import memories from '../../images/memories.png';
import {useDispatch} from 'react-redux';
import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
    
        navigate('/');
    
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Flyr</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    // what the user sees if user is defined (aka logged in)
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : ( 
                    // what user sees if not logged in
                    <Button component={Link} to ="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;