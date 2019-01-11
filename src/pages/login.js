import React from 'react'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/layout'
import SignInForm from '../components/SignIn';
import PxlLogo from '../components/images/PxlLogo';

const LoginPage = () => (
    <Layout>
        <Grid item xs={12}>
            <div style={{
                background: '#2570cb',
                width: '348px',
                margin: '60px auto 0',
                padding: '60px'
            }}>
                <Grid container>
                    <Grid item xs={12}>
                        <PxlLogo />
                    </Grid>
                    <Grid item xs={12} style={{marginTop: '30px'}}>
                        <SignInForm />
                    </Grid>
                </Grid>
            </div>
        </Grid>
    </Layout>
)

export default LoginPage;