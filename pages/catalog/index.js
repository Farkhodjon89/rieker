import Layout from '../../components/Layout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Catalog from '../../components/Catalog'
import SectionTitile from '../../components/SectionTitle'
import client from '../../apollo/apollo-client'
import PRODUCTS from '../../queries/products'
import { StaticDataSingleton } from '../../utils/staticData'
import { v4 as uuidv4 } from 'uuid'
import { HeadData } from '../../components/Head'

const CatalogPage = ({
  pageInfo,
  products,
  category,
  categories,
  activeTerms,
}) => {
  const categoriesFilter = [
    {
      name: 'Для женщин',
      link: '/catalog/dlya-zhenshhin',
    },
    {
      name: 'Для мужчин',
      link: '/catalog/dlya-muzhchin',
    },
    {
      name: 'Унисекс',
      link: '/catalog/uniseks',
    },
    {
      name: 'Скидки',
      link: '/catalog?onSale=sale',
    },
  ]

  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Каталог',
      link: `/catalog`,
    },
  ]

  return (
    <>
      <HeadData />
      <Layout categories={categories}>
        <div className='container'>
          <Breadcrumbs path={breadcrumbs} />
          <SectionTitile title='Каталог' />
          <Catalog
            key={uuidv4()}
            products={products}
            categories={categoriesFilter}
            pageInfo={pageInfo}
            category={category}
            activeTerms={activeTerms}
          />
        </div>
      </Layout>
    </>
  )
}

export default CatalogPage

export async function getStaticProps({ query }) {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = staticData.getRootCategories()

  const productsResponse = await client.query({
    query: PRODUCTS,
    variables: { first: 9, onSale: query?.onSale === 'sale' ? true : false },
  })

  return {
    props: {
      products: productsResponse.data.products.nodes,
      pageInfo: productsResponse.data.products.pageInfo,
      activeTerms: productsResponse.data.products.activeTerms,
      categories: categories.allCategories,
    },
    revalidate: 60,
  }
}
