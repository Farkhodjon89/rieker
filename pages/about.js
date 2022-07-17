import React from 'react'
import client from '../apollo/apollo-client'
import Layout from '../components/Layout'
import { PAGES, GETPAGEBYSLUG } from '../queries/pages'
import { StaticDataSingleton } from '../utils/staticData'
import SectionTitle from '../components/SectionTitle'
import { useRouter } from 'next/router'
import Breadcrumbs from '../components/Breadcrumbs'
import PageContent from '../components/PageContent'
import PageInfo from '../components/PageInfo/page-info'
import { HeadData } from '../components/Head'

const AboutUs = ({ categories, pageContent }) => {
  const path = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'О нас',
      link: 'about',
    },
  ]
  return (
    <>
      <HeadData title={'О нас'} pageUrl={`/about`} />
      <Layout categories={categories}>
        <div className='container'>
          <Breadcrumbs path={path} />
          <div className='jokiAbout'>
            <h2 dangerouslySetInnerHTML={{ __html: pageContent.title }} />
            <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = staticData.getRootCategories()

  const page = await client.query({
    query: GETPAGEBYSLUG,
    variables: {
      id: 115934,
    },
  })

  return {
    props: {
      categories: categories.allCategories,
      pageContent: page.data.page,
    },
    revalidate: 60,
  }
}

export default AboutUs
