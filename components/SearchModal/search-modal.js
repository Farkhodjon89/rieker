import s from './search-modal.module.scss'
import { chunk } from '../../utils'
import Link from 'next/link'
import Tabs from '../Tabs'
import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import client from '../../apollo/apollo-client'
import PRODUCTS from '../../queries/products'
import ProductSlider from '../ProductSlider'

const SearchModal = ({ loading, searchResults, searchQuery }) => {
  return (
    <div className={`${s.searchResults} subCategoryMenu`}>
      <div className='container'>
        {loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          searchResults.length <= 3 ? (
            <ProductsList products={searchResults} catalogMod={true} />
          ) : (
            <ProductSlider products={searchResults} quantity={4} />
          )
        ) : null}
        {/* <Tabs
          data={tabs}
          mobileCategory={true}
          setSearchActiveTab={setSearchActiveTab}
        /> */}
      </div>
    </div>
  )
}

export default SearchModal
