import gql from 'graphql-tag'

const CONTACTS = gql`
  query CONTACTS {
    paColors {
      nodes {
        name
        brands_settings {
          address
          facebook
          instagram
          telegram
          mapLink
          officeid
          phones {
            phone
          }
          image {
            sourceUrl
          }
        }
      }
    }
  }
`
export default CONTACTS
