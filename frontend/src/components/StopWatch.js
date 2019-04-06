import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none',
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingRight: '10%',
        paddingLeft: '10%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    progress: {
        margin: theme.spacing.unit,
    },
    h1: {
        fontSize: "5vw"
    }
});

function StopButton(props) {
    const {classes} = props;
    return (
        <Button variant="contained" color="primary" size="large" onClick={props.resumeCallback}
                className={classes.button}>{props.isStarted ? 'STOP' : 'START'}</Button>
    );
}

function ResetButton(props) {
    const {classes} = props;
    return (
        <Button variant="contained" color="secondary" size="large" onClick={props.resetCallback}
                className={classes.button}>RESET</Button>
    );
}

let StopButtonComponent = withStyles(styles)(StopButton);
let ResetButtonComponent = withStyles(styles)(ResetButton);

function SWGrid(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={24} justify="center">
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={24} justify="center">
                            <Grid item xs={4}>
                                <CircularProgress className={classes.progress} variant="static"
                                                  value={(Number(props.hours) * 100 / 24)}
                                                  size={"30%"}/>
                            </Grid>
                            <Grid item xs={4}>
                                <CircularProgress className={classes.progress} variant="static"
                                                  value={(Number(props.minutes) * 100 / 60)}
                                                  size={"30%"}/>
                            </Grid>
                            <Grid item xs={4}>
                                <CircularProgress className={classes.progress} variant="static"
                                                  value={(Number(props.seconds) * 100 / 60)}
                                                  size={"30%"}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24} justify="center">
                            <Grid item xs={3}>
                                <h1 className={classes.h1}>{props.hours}</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <h1 className={classes.h1}>:</h1>
                            </Grid>
                            <Grid item xs={4}>
                                <h1 className={classes.h1}>{props.minutes}</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <h1 className={classes.h1}>:</h1>
                            </Grid>
                            <Grid item xs={3}>
                                <h1 className={classes.h1}>{props.seconds}</h1>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24} justify="center">
                            <Grid item xs={6}>
                                <StopButtonComponent isStarted={props.isStarted} resumeCallback={props.resumeCallback}/>
                            </Grid>
                            <Grid item xs={6}>
                                <ResetButtonComponent resetCallback={props.resetCallback}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

let SWGridComponent = withStyles(styles)(SWGrid);

export default class StopWatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secondProgress: 0,
            minuteProgress: 0,
            hourProgress: 0
        }
    }

    render() {
        let timestamp = 0;
        if (this.props.offset) {
            timestamp += this.props.offset
        }
        if (this.props.startTime) {
            timestamp += Date.now() - this.props.startTime;
        }

        let date = new Date(timestamp);
        let timeString = date.toISOString().split('T')[1].split('.')[0];
        let timeArray = timeString.split(':');

        return (
            <SWGridComponent isStarted={this.props.isStarted} resumeCallback={this.props.resumeCallback}
                             resetCallback={this.props.resetCallback} hours={timeArray[0]} minutes={timeArray[1]}
                             seconds={timeArray[2]}/>
        );
    }
}
