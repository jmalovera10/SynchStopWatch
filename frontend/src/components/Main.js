import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {Route, Redirect, Switch} from 'react-router-dom'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: undefined,
            offset: undefined,
            startTime: undefined,
            isStarted: false
        };
        this.handleCode = this.handleCode.bind(this);
    }


    componentDidMount() {
        this.handleCode()
    }

    handleCode() {
        if (!this.state.code) {
            let cookies = new Cookies();
            let code = cookies.get("STOPWATCH_CODE", {path: '/'});
            if (code) {
                axios.get(`/API/info/${code}`)
                    .then((res) => {
                        return res.data;
                    })
                    .then((data) => {
                        console.log(data);
                        this.setState({
                            code: code,
                            offset: data.offset,
                            startTime: data.startTime,
                            isStarted: data.isStarted
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                axios.get('/API/code')
                    .then((res) => {
                        return res.data.data;
                    })
                    .then((data) => {
                        console.log(data);
                        cookies.set("STOPWATCH_CODE", data.code, {path: '/'});
                        this.setState({
                            code: data.code,
                            offset: data.offset,
                            startTime: data.startTime,
                            isStarted: data.isStarted
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }

    render() {
        return (
            <div className='content'>
                <Switch>
                    <Route exact path='/' render={() => (this.state.code ? (<Redirect to={`/${this.state.code}`}/>) : (
                        <h1>Normal</h1>))}/>
                    <Route exact path='/:code' render={() => (this.state.code ? (<h1>Normal</h1>) : (
                        <Redirect to={`/`}/>))}/>
                </Switch>
            </div>
        );
    }
}