import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '64px'
    },   
});

const GridContainer = ({ classes, children }) => (
    <div className={classes.root}>
        <Grid container spacing={8}>
            {children}
        </Grid>
    </div>
);

GridContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridContainer);