import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {Route, Redirect, Switch} from 'react-router-dom';
import Toolbar from './Toolbar';
import LoadingPage from './LoadingPage';
import StopWatch from './StopWatch';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: undefined,
            offset: undefined,
            startTime: undefined,
            isStarted: false,
            loaded: false,
            intervalId: null
        };
        this.handleCode = this.handleCode.bind(this);
        this.initInterval = this.initInterval.bind(this);
        this.resumeCallback = this.resumeCallback.bind(this);
        this.resetCallback = this.resetCallback.bind(this);
    }


    componentDidMount() {
        if (!this.state.loaded)
            this.handleCode();
        this.initInterval();
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    initInterval(){
        let intervalId = setInterval(() => {
            axios.get(`/API/info/${this.state.code}`)
                .then((res) => {
                    return res.data;
                })
                .then((res) => {
                    return res[0];
                })
                .then((data) => {
                    console.log(data);
                    if(data) {
                        this.setState({
                            offset: data.offset,
                            startTime: data.startTime,
                            isStarted: data.isStarted,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 1000);
        this.setState({intervalId: intervalId})
    }

    handleCode() {
        let url = window.location.href;
        url = new URL(url);
        let code_url = url.pathname.replace('/','');
        let code = undefined;
        let cookies = new Cookies();
        if(code_url!==''){
            code = code_url
        }else{
            code = cookies.get("STOPWATCH_CODE", {path: '/'});
        }
        console.log(code);
        if (code) {
            axios.get(`/API/info/${code}`)
                .then((res) => {
                    return res.data;
                })
                .then((res) => {
                    console.log(res);
                    return res[0];
                })
                .then((data) => {
                    console.log(data);
                    this.setState({
                        code: code,
                        offset: data.offset,
                        startTime: data.startTime,
                        isStarted: data.isStarted,
                        loaded: true
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios.get('/API/code')
                .then((res) => {
                    console.log(res);
                    return res.data.data;
                })
                .then((data) => {
                    console.log(data);
                    cookies.set("STOPWATCH_CODE", data.code, {path: '/'});
                    this.setState({
                        code: data.code,
                        offset: data.offset,
                        startTime: data.startTime,
                        isStarted: data.isStarted,
                        loaded: true
                    });
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    resumeCallback() {
        if (!this.state.isStarted) {
            axios.post(`/API/start/${this.state.code}`)
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    console.log(data);
                    this.setState({
                        offset: data.offset,
                        startTime: data.startTime,
                        isStarted: data.isStarted,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios.post(`/API/stop/${this.state.code}`)
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    console.log(data);
                    this.setState({
                        offset: data.offset,
                        startTime: data.startTime,
                        isStarted: data.isStarted,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    resetCallback() {
        axios.post(`/API/reset/${this.state.code}`)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    offset: data.offset,
                    startTime: data.startTime,
                    isStarted: data.isStarted,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Toolbar/>
                <Switch>
                    <Route exact path='/' render={() => (this.state.code ? (<Redirect to={`/${this.state.code}`}/>) : (
                        <LoadingPage/>))}/>
                    <Route exact path='/:code'
                           render={(props) => {
                               return <StopWatch isStarted={this.state.isStarted} startTime={this.state.startTime}
                                                 offset={this.state.offset}
                                                 resetCallback={this.resetCallback} resumeCallback={this.resumeCallback}
                               />
                           }}/>
                </Switch>
            </div>
        );
    }
}