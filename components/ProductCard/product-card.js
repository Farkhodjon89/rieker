import s from './product-card.module.scss'
import ImageGallery from 'react-image-gallery'
import icons from '../../public/fixture'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getPrice, getFormat, getDiscount } from '../../utils'
import ProductsList from '../../components/ProductsList'
import SectionTitle from '../SectionTitle'
import ProductSlider from '../ProductSlider'
import InstantBuyModal from '../InstantBuyModal'
import OfferTwo from '../OfferTwo'
import MainSlider from '../MainSlider'
import Link from 'next/link'

const ProductCard = ({
  product,
  contacts,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  getActiveStatus,
}) => {
  const [scroll, setScroll] = useState(0)
  const [productTop, setProductTop] = useState(0)

  useEffect(() => {
    const addToCartMobile = document.querySelector('#addToCart')
    setProductTop(addToCartMobile.offsetTop)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  const [selectedProductId, setSelectedProductId] = useState(
    product.variations
      ? product.variations.nodes[0].databaseId
      : product.databaseId
  )

  const [selectedProductStock, setSelectedProductStock] = useState(1)

  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variations
      ? product.variations.nodes[0].size.nodes[0]?.value
      : product.paSizes.nodes[0]?.name
  )

  const cartItem = cartItems.filter(
    (cartItem) => cartItem.selectedProductId === selectedProductId
  )[0]
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0]
  const [selectedProductImage, setSelectedProductImage] = useState(
    product.variations
      ? product.variations.nodes[0].image
        ? product.variations.nodes[0].image.sourceUrl
        : null
      : product.image.sourceUrl
  )

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.paColors.nodes.length != 0 ? product.paColors.nodes[0].name : null
  )

  const galleryImages = product.galleryImages.nodes.map(({ sourceUrl }) => ({
    original: sourceUrl,
    thumbnail: sourceUrl,
  }))
  const images = [
    {
      original: selectedProductImage,
      thumbnail: selectedProductImage,
    },
    ...galleryImages,
  ]

  const [windowWidth, setWindowWidth] = useState()
  const [stockStatus, setStockStatus] = useState(false)
  let resizeWindow = () => {
    setWindowWidth(window.screen.width)
  }
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const { normalPrice, salePrice } = getPrice(product)
  const normalPriceFront = [getFormat(normalPrice), 'UZS'].join(' ')
  const salePriceFront = [getFormat(salePrice), 'UZS'].join(' ')
  const discountPrice = getDiscount(normalPrice, salePrice)

  const [buy, setBuy] = useState(false)
  let sizes = []

  const changeSize = (e) => {
    const moki = product.variations.nodes.filter(
      (r) => r.size.nodes[0].value === e && r
    )[0]
    setSelectedProductSize(e)
    setSelectedProductId(moki.databaseId)
  }

  return (
    <section className={s.productCard}>
      <div className={s.mobileProductImage}>
        <MainSlider SliderData={images} productMod={true} />
      </div>
      <div className='container'>
        <div className={s.card}>
          <div className={s.left}>
            <div className={s.imageGallery}>
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                autoPlay={false}
                showNav={false}
                thumbnailPosition={windowWidth >= 1023 ? 'left' : 'bottom'}
              />
            </div>
          </div>
          <div className={s.right}>
            <div className={s.details}>
              <div className={s.name}>
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
                {/* <div className={s.sizeChart}>
                Таблица размеров
              </div> */}
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
              <button
                className={`${s.addToCart} ${cartItem ? s.active : ''}  `}
                id='addToCart'
                onClick={
                  cartItem
                    ? () => deleteFromCart(selectedProductId)
                    : () => {
                        addToCart(
                          product,
                          selectedProductColor,
                          selectedProductSize,
                          selectedProductId
                        )
                        getActiveStatus(true)
                        process.env.NODE_ENV === 'production' &&
                          fbq('track', 'AddToCart', {
                            value: product.onSale
                              ? product.woocsSalePrice
                              : product.woocsRegularPrice,
                          })
                      }
                }
                disabled={!selectedProductStock}
              >
                {!selectedProductStock
                  ? 'Нет в наличии'
                  : cartItem
                  ? 'Добавлено в корзину'
                  : 'Добавить в корзину'}
              </button>
              <div className={s.twobuttons}>
                <button className={s.OneClick} onClick={() => setBuy(!buy)}>
                  Купить сейчас
                </button>
                <InstantBuyModal
                  buy={buy}
                  setBuy={setBuy}
                  product={product}
                  selectedProductId={selectedProductId}
                  selectedProductColor={selectedProductColor}
                  selectedProductSize={selectedProductSize}
                  selectedProductStock={selectedProductStock}
                  normalPriceFront={normalPriceFront}
                  salePriceFront={salePriceFront}
                  discountPrice={discountPrice}
                  normalPrice={normalPrice}
                  salePrice={salePrice}
                  changeSize={changeSize}
                />
                <button
                  className={`${s.addToWishlist} ${
                    wishlistItem ? s.active : null
                  }`}
                  onClick={
                    wishlistItem
                      ? () => deleteFromWishlist(product)
                      : () => addToWishlist(product)
                  }
                  dangerouslySetInnerHTML={{ __html: icons.heart }}
                />
              </div>
              {/* <button
                className={s.stockStatus}
                onClick={() => setStockStatus(!stockStatus)}></button> */}

              <Link href='//t.me/Riekeruz'>
                <a className={s.title} target='_blank'>
                  <img src='/product/tg.svg' alt='' />
                  <span className={s.lastTg}>
                    Написать консультанту в Telegram
                  </span>
                </a>
              </Link>

              <div className={s.content}>
                Бесплатная доставка при заказе свыше <br />1 000 000 сум по
                Ташкенту осуществляется в течении 24 часов с момента заказа
              </div>
              <OfferTwo />
              <div
                className={`${s.addToCartMobile} ${
                  scroll > productTop + 480 && !buy ? s.sticky : ''
                }`}
                id='addToCartMobile'
              >
                <div className={s.top}>
                  <div
                    className={s.image}
                    style={{ background: `url(${images[0].original})` }}
                  ></div>
                  <div>
                    <div className={s.name}>{product.name}</div>
                  </div>
                </div>
                <div className={s.bottom}>
                  <div className={s.sizeSelection}>
                    {product.variations ? (
                      <select
                        value={selectedProductSize}
                        name='Выберите размер'
                        onChange={(e) => changeSize(e.target.value)}
                      >
                        {product.variations.nodes.map((product) => (
                          <option>{product.size.nodes[0].value}</option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                  <div className={s.twobuttons}>
                    <button className={s.OneClick} onClick={() => setBuy(!buy)}>
                      Купить сейчас
                    </button>
                    <button
                      className={`${s.addToCart} ${cartItem ? s.active : ''}  `}
                      onClick={
                        cartItem
                          ? () => deleteFromCart(selectedProductId)
                          : () => {
                              addToCart(
                                product,
                                selectedProductColor,
                                selectedProductSize,
                                selectedProductId
                              ),
                                getActiveStatus(true)
                            }
                      }
                      disabled={!selectedProductStock}
                    >
                      {!selectedProductStock
                        ? 'Нет в наличии'
                        : cartItem
                        ? 'В корзине'
                        : 'В корзину'}
                    </button>
                  </div>
                </div>
              </div>

              {/* {windowWidth <= 1023 && product.description ? (
                <div className={s.productInfo}>
                  <div className={s.productDescription}>
                    <h3 className={s.title}>Описание товара</h3>
                    <div
                      className={s.descriptionContent}
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
        <SectionTitle title='Похожие товары' />
        {windowWidth >= 1023 ? (
          <ProductsList products={product.related.nodes} related={true} />
        ) : (
          <ProductSlider products={product.related.nodes} />
        )}
      </div>
    </section>
  )
}
export default ProductCard
