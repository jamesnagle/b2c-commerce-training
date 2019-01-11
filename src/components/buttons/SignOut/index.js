import React from 'react'
import { withFirebase } from '../../Firebase' 
import IconButton from '@material-ui/core/IconButton'
import SignOutIcon from '@material-ui/icons/ExitToApp'

const SignOutButton = ({ firebase }) => (
    <>
        {firebase && firebase.auth.currentUser &&
        <IconButton color="inherit">
            <SignOutIcon onClick={firebase.doSignOut} />
        </IconButton>}
    </>
)

export default withFirebase(SignOutButton);

