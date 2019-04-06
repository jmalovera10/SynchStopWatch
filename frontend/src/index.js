import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import Main from "./components/Main";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0d47a1',
        },
    },
    typography: {
        useNextVariants: true,
    },
});


ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <Main/>
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
