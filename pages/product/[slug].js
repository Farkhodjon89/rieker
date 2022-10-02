import Layout from '../../components/Layout'
import Breadcrumbs from '../../components/Breadcrumbs'
import ProductCard from '../../components/ProductCard'
import client from '../../apollo/apollo-client'
import { useState } from 'react'
import PRODUCT from '../../queries/product'
import { PRODUCTS_SLUG } from '../../queries/products'
import { connect } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import { StaticDataSingleton } from '../../utils/staticData'
import { HeadData } from '../../components/Head'

const Product = ({
  product,
  contacts,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  categories,
}) => {
  const [openCart, setOpenCart] = useState(false)

  const path = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: product.name,
      link: `/product/${product.slug}`,
    },
  ]
  return (
    <>
      <HeadData
        title={`${product.name} | Rieker`}
        description={product.description}
        image={product?.image?.sourceUrl}
        product={product}
      />
      <Layout
        parentCategory={
          product.productCategories.nodes.length != 0 &&
          product.productCategories.nodes[0].slug
        }
        categories={categories}
        openCart={openCart}
        setOpenCart={setOpenCart}
      >
        <div className='container'>
          <Breadcrumbs path={path} />
        </div>
        <ProductCard
          key={product.id}
          product={product}
          contacts={contacts}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
          addToWishlist={addToWishlist}
          deleteFromWishlist={deleteFromWishlist}
          getActiveStatus={(r) => setOpenCart(r)}
        />
      </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = []

  const fetchSlugs = async (after) => {
    const slugs = await client.query({
      query: PRODUCTS_SLUG,
      variables: {
        first: 10,
        ...(after ? { after } : {}),
      },
    })

    paths.push(
      ...slugs.data.products.nodes.map((product) => ({
        params: { slug: product.slug },
      }))
    )

    if (slugs.data.products.pageInfo.hasNextPage) {
      await fetchSlugs(slugs.data.products.pageInfo.endCursor)
    }
  }

  if (process.env.NODE_ENV === 'production') {
    await fetchSlugs()
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = staticData.getRootCategories()

  const response = await client.query({
    query: PRODUCT,
    variables: { id: params.slug },
  })

  return {
    props: {
      product: response.data.product,
      categories: categories.allCategories,
    },
    revalidate: 60,
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      selectedProductColor,
      selectedProductSize,
      selectedProductId
    ) => {
      dispatch(
        addToCart(
          item,
          selectedProductColor,
          selectedProductSize,
          selectedProductId
        )
      )
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)
