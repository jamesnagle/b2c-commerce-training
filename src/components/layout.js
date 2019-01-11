import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
//import { withStyles } from '@material-ui/core/styles'
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';
import withRoot from '../withRoot';
import PrimaryAppBar from './PrimaryAppBar'
import GridContainer from './GridContainer'

class Layout extends React.Component {

  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/firestore');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }


  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <FirebaseContext.Provider value={this.state.firebase}>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <PrimaryAppBar />
            <AppWithAuthentication {...this.props} />
          </FirebaseContext.Provider>
        )}
      />
    )
  }
}

const AppWithAuthentication = withAuthentication(({ children }) => (
  <GridContainer children={children} />
));

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withRoot(Layout)