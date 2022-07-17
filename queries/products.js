import gql from 'graphql-tag'
import { _Product, _SimpleProduct, _VariableProduct } from './fragments'

const PRODUCTS = gql`
  query PRODUCTS(
    $first: Int
    $after: String
    $categories: [String]
    $filters: [ProductTaxonomyFilterInput]
    $onSale: Boolean
    $search: String
  ) {
    products(
      first: $first
      after: $after
      where: {
        status: "publish"
        stockStatus: IN_STOCK
        onSale: $onSale
        categoryIn: $categories
        taxonomyFilter: { and: $filters }
        search: $search
      }
    ) {
      activeTerms {
        paColors {
          name
          slug
          color
        }
        paSizes {
          name
          slug
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ..._Product
        ... on SimpleProduct {
          ..._SimpleProduct
        }
        ... on VariableProduct {
          ..._VariableProduct
        }
      }
    }
  }
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`

export default PRODUCTS

export const PRODUCTS_SLUG = gql`
  query PRODUCTS($after: String) {
    products(
      first: 100
      after: $after
      where: { status: "publish", stockStatus: IN_STOCK }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        slug
      }
    }
  }
`
