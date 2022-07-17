import gql from 'graphql-tag'

const SEARCHPRODUCT = gql`
  query SEARCHPRODUCT($first: Int, $categories: [String], $search: String, $sku: String) {
    products(
      first: $first
      where: {
        status: "publish"
        categoryIn: $categories
        search: $search
        stockStatus: IN_STOCK
        sku: $sku
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        databaseId
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`
export default SEARCHPRODUCT
