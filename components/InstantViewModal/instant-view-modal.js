import React, { useState } from 'react'
import s from './instant-view-modal.module.scss'
import ReactModal from 'react-modal'
import ReactImageGallery from 'react-image-gallery'
import { getDiscount, getFormat, getPrice } from '../../utils'
import Link from 'next/link'
import { connect } from 'react-redux'
import { addToCart } from '../../redux/actions/cartActions'

const InstantViewModal = ({ buy, setBuy, product, addToCart }) => {
  const { normalPrice, salePrice } = getPrice(product)
  const normalPriceFront = [getFormat(normalPrice), 'UZS'].join(' ')
  const salePriceFront = [getFormat(salePrice), 'UZS'].join(' ')
  const discountPrice = getDiscount(normalPrice, salePrice)
  const [selectedProductId, setSelectedProductId] = useState(
    product.variations
      ? product.variations.nodes[0].databaseId
      : product.databaseId
  )

  const galleryImages = product.galleryImages.nodes.map(({ sourceUrl }) => ({
    original: sourceUrl,
    thumbnail: sourceUrl,
  }))
  const images = [
    {
      original: product.image.sourceUrl,
      thumbnail: product.image.sourceUrl,
    },
    ...galleryImages,
  ]

  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variations
      ? product.variations.nodes[0].size.nodes[0]?.value
      : product.paSizes.nodes[0]?.name
  )

  let sizes = []

  const changeSize = (e) => {
    const moki = product.variations.nodes.filter(
      (r) => r.size.nodes[0].value === e && r
    )[0]
    setSelectedProductSize(e)
    setSelectedProductId(moki.databaseId)
  }

  const selectedProductColor =
    product.paColors.nodes.length != 0 ? product.paColors.nodes[0].name : null

  const add = () => {
    addToCart(
      product,
      selectedProductColor,
      selectedProductSize,
      selectedProductId
    )
  }

  return (
    <ReactModal
      isOpen={buy}
      onRequestClose={() => setBuy(false)}
      ariaHideApp={false}
      overlayClassName={s.modalOverlay}
      className={s.modalContent}
    >
      <div style={{ display: 'flex' }}>
        <ReactImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          autoPlay={false}
          showNav={false}
          thumbnailPosition='left'
        />
        <div style={{ minWidth: '45%', paddingLeft: 30 }}>
          <div style={{ fontWeight: 500 }}>
            {product.name}
            <span style={{ marginLeft: '1rem' }}>
              {product.variations
                ? product.variations.nodes[0].sku
                : product.sku}
            </span>
          </div>
          <div className={s.price}>
            {product.onSale ? (
              <>
                <span className={s.salePrice}> {salePriceFront} </span>
                <span className={s.normalPrice}>{normalPriceFront}</span>
                <span className={s.discountPrice}>-{discountPrice}%</span>
              </>
            ) : (
              <span>{normalPriceFront}</span>
            )}
          </div>
          <div className={s.color}>
            Цвет:{' '}
            <span>
              {product.paColors.nodes.length != 0
                ? product.paColors.nodes[0].name
                : null}
            </span>
          </div>
          <div className={s.size}>
            <div className={s.selectedSize}>
              Размер: <span>{selectedProductSize}</span>
            </div>
          </div>
          <div className={s.sizeSelection}>
            {product.variations ? (
              <select
                value={selectedProductSize}
                name='Выберите размер'
                onChange={(e) => changeSize(e.target.value)}
              >
                {product.variations.nodes.map((product) => {
                  sizes.push(product.size.nodes[0].value)
                  return <option>{product.size.nodes[0].value}</option>
                })}
              </select>
            ) : null}
          </div>
          <Link href='/application'>
            <a className={s.link} onClick={add}>
              Заказать сейчас
            </a>
          </Link>
          <button
            className={s.cart}
            onClick={() => {
              add()
              setBuy(false)
            }}
          >
            Добавить в корзину
          </button>
          <Link href={'/product/' + product.slug}>
            <a className={s.product}>Больше информации о товаре</a>
          </Link>
        </div>
      </div>
    </ReactModal>
  )
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
  }
}
export default connect(null, mapDispatchToProps)(InstantViewModal)
