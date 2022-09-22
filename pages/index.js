import Layout from '../components/Layout'
import Offer from '../components/Offer'
import PRODUCTS from '../queries/products'
import SectionTitle from '../components/SectionTitle'
import { StaticDataSingleton } from '../utils/staticData'
import HOMESETTINGS from '../queries/homePageSettings'
import CategoriesBlock from '../components/CategoriesBlock'
import client from '../apollo/apollo-client'
import { HeadData } from '../components/Head'
import ProductSlider from '../components/ProductSlider'
import MainSlider from '../components/MainSlider2/main-slider'

const Index = ({ categories, categoriesblock, newProduct }) => (
  <>
    <HeadData />
    <Layout categories={categories}>
      <MainSlider SliderData={['1.png', '2.png', '3.png']} />
      <div className='container'>
        <SectionTitle title='популярные Категории' />
        <CategoriesBlock categories={categoriesblock} />
        <SectionTitle title='новые поступления' />
        <ProductSlider products={newProduct} />
        <Offer />
      </div>
    </Layout>
  </>
)

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)

  const categories = staticData.getRootCategories()

  const pageSettings = await client.query({
    query: HOMESETTINGS,
    fetchPolicy: 'no-cache',
  })

  const newProducts = await client.query({
    query: PRODUCTS,
    fetchPolicy: 'no-cache',
    variables: {
      first: 10,
    },
  })

  return {
    props: {
      newProduct: newProducts.data.products.nodes,
      categoriesblock:
        pageSettings.data.themeGeneralSettings.global_settings
          .popularCategories,
      categories: categories.allCategories,
    },
    revalidate: 60,
  }
}

export default Index
