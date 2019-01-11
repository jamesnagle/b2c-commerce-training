import React, { Component } from 'react';
import { navigate } from 'gatsby';
import TextField from '@material-ui/core/TextField'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    field: {
        background: '#fff',
        width: '100%'
    },
    button: {
        marginTop: '10px',
        width: '100%',
        "&:disabled": {
            background: theme.palette.secondary.dark
        }
    }
})

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                navigate(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const { classes } = this.props;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    value={email}
                    onChange={this.onChange}
                    variant="filled" 
                    margin="normal"
                    className={classes.field}
                />
                <TextField 
                    id="password"
                    name="password"
                    label="Password"
                    value={password}
                    type="password"
                    onChange={this.onChange}
                    variant="filled"
                    margin="normal"
                    className={classes.field}
                />
                <Button 
                    disabled={isInvalid} 
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    size="large"
                >Sign In</Button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = withFirebase(SignInFormBase);

export default withStyles(styles)(SignInForm);