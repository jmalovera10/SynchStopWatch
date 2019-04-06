import {withStyles} from "@material-ui/core";
import React from "react";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        paddingTop: "5%",
        paddingBottom: "5%",
        margin: theme.spacing.unit*2,
    },
    h1: {
        fontSize: "4vw"
    },
    grid:{
        textAlign: "center"
    }
});

function LoadingPage(props) {
    const {classes} = props;
    return (
        <Grid container spacing={12} justify="center">
            <Grid item xs={12} className={classes.grid}>
                <CircularProgress className={classes.progress}
                                  color={"primary"}
                                  size={"20%"}/>
                <h1 className={classes.h1}>Loading</h1>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(LoadingPage);