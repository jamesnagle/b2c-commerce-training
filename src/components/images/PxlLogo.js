import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const PxlLogo = () => (
    <StaticQuery
        query={graphql`
      query {
        pxlLogo: file(relativePath: { eq: "Pxl.png" }) {
          childImageSharp {
            fluid(maxWidth: 224) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
        render={data => <Img fluid={data.pxlLogo.childImageSharp.fluid} style={{width: '224px'}} />}
    />
)
export default PxlLogo
