import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SignOutButton from './buttons/SignOut'

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    } 
});

const PrimaryAppBar = ({ classes }) => (      
    <div className={classes.root}>
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" color="inherit" fontFamily="sans-serif" noWrap>
                    PixelMEDIA B2C Commerce Training
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <SignOutButton />
                </div>
            </Toolbar>
        </AppBar>
    </div>
);

PrimaryAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimaryAppBar);