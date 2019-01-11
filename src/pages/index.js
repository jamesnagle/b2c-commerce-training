import React from 'react'
import { compose } from 'recompose';
import Layout from '../components/layout'
import Home from '../components/Home'

import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session'

const condition = authUser => authUser;

const IndexPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(Home);

export default () => (
  <Layout >
    <IndexPage />
  </Layout>
);

