import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Alert, AlertTitle} from "@material-ui/lab";
import {Redirect} from 'react-router';

const axios = require('axios').default;
const useStyles = makeStyles((theme) => ({
    custom_tf: {
        width: '300px',
        margin: '10px'
    },
    hide: {
        display: 'none'
    },
    custom_alert: {
        position: 'absolute',
        top: '20px',
        right: '0',
        animation: `$err_alert 4000ms ${theme.transitions.easing.easeIn}`
    },
    '@keyframes err_alert': {
        '0%': {
            width: '200px',
            opacity: 0
        },
        '10%': {
            width: '350px',
            opacity: 1
        },
        '80%' : {
            width: '250px',
            opacity: 0.4
        },
        '100%': {
            width: '200px',
            opacity: 0
        }
    }
}));



export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [openAni, setOpenAni] = useState(false);
    const [go2Home, setGo2Home] = useState(false);
    const classes = useStyles();

    function HandleLogin(e) {
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
            setErrMsg("Fill all fields");
            setOpenAni(true);
            setGo2Home(false);
            return;
        }
        axios({
            method: 'post',
            url: process.env.REACT_APP_BASE_URL + "login",
            data: {
                email: email,
                pass: password
            }
        })
            .then(function (resp) {
                if (resp.status === 200) {
                    if (resp.data.isErr) {
                        setErrMsg(resp.data.msg);
                        setOpenAni(true);
                        setGo2Home(false);
                    }
                    else {
                        localStorage.setItem("email", resp.data.email);
                        localStorage.setItem("token", resp.data.token);
                        localStorage.setItem("pub", resp.data.pub);
                        localStorage.setItem("username", resp.data.username);
                        setErrMsg("");
                        setGo2Home(true);
                    }
                }
            })
            .catch(err => console.log(err));
    }

    if (go2Home) return <Redirect to={{pathname: "/home"}}/>

    return(
        <div>
            <Alert
                onAnimationEnd={() => setOpenAni(false)}
                className={openAni ? classes.custom_alert: classes.hide}
                severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{errMsg}</strong>
            </Alert>
            <form onSubmit={HandleLogin}>
                <div>
                    <TextField
                        id="outlined-basic"
                        size="medium"
                        value={email}
                        className={classes.custom_tf}
                        label="Email"
                        type="text"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        size="medium"
                        value={password}
                        className={`${classes.custom_tf}`}
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit">Login</Button>
            </form>
        </div>
    );
}