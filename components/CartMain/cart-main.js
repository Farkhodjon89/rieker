import s from './cart-main.module.scss'
import Link from 'next/link'
import SectionTitle from '../SectionTitle'
import icons from '../../public/fixture'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
} from '../../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import { getPrice, getFormat, getDiscount } from '../../utils'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import OfferTwo from '../OfferTwo'
import client from '../../apollo/apollo-client'
import Breadcrumbs from '../Breadcrumbs'
import COUPON from '../../queries/coupon'
import OrderReview from '../OrderReview'
import Loader from '../Loader'

const path = [
  { link: '/', name: 'Главная' },
  { link: '/cart', name: 'Корзина' },
]

const CartMain = ({
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  addToWishlist,
  deleteFromWishlist,
}) => {
  const [loadCupon, { data, loading, error }] = useLazyQuery(COUPON, {
    client,
  })

  const [name, setName] = useState('')
  const [myCoupon, setMyCoupon] = useState(
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('coupon'))
      : ' '
  )
  const sendCupon = () => {
    loadCupon({
      variables: {
        id: name,
      },
    })
  }

  useEffect(() => {
    if (data && data.coupon) {
      localStorage.setItem('coupon', JSON.stringify(data.coupon))
      setMyCoupon(JSON.parse(localStorage.getItem('coupon')))
    }
  }, [data])

  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => {
    setWindowWidth(window.screen.width)
  }
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === cartItems.id
  )[0]

  let orderReviewData = {
    price: 0,
    sale: 0,
    totalPrice: 0,
    button: (
      <Link href='/application'>
        <a className='orderReviewButton'>Оформить заказ</a>
      </Link>
    ),
  }

  let couponFront
  let cartTotalPrice = 0

  if (myCoupon && myCoupon.amount) {
    switch (myCoupon.discountType) {
      case 'FIXED_CART':
        cartTotalPrice -= myCoupon.amount
        couponFront = getFormat(myCoupon.amount) + ' сум'
        break
      case 'PERCENT':
        cartTotalPrice = Math.round(
          cartTotalPrice - cartTotalPrice * (myCoupon.amount / 100)
        )
        couponFront = myCoupon.amount + ' %'
        break
      default:
        break
    }
    localStorage.setItem('cartTotalPriceFront', cartTotalPrice)
  }

  return cartItems.length >= 1 ? (
    <div className='container'>
      <Breadcrumbs path={path} />
      <SectionTitle title='Корзина' />
      <div className={`row ${s.cards}`}>
        <div className={`${s.left} col-lg-8`}>
          <div className={s.hide}></div>

          <div className={s.cardlist}>
            {cartItems.map((product) => {
              const { normalPrice, salePrice } = getPrice(product)
              const normalPriceFront = getFormat(normalPrice) + ' UZS'
              const salePriceFront = getFormat(salePrice) + ' UZS'
              const discountPrice = getDiscount(normalPrice, salePrice)

              const wishlistItem = wishlistItems.filter(
                (wishlistItem) => wishlistItem.id === product.id
              )[0]

              orderReviewData.price += parseInt(normalPrice) * product.quantity
              orderReviewData.sale +=
                parseInt(normalPrice) - parseInt(salePrice) * product.quantity
              orderReviewData.totalPrice =
                orderReviewData.price - orderReviewData.sale

              return (
                <div className={s.card} key={uuidv4()}>
                  <img
                    src={product.image ? product.image.sourceUrl : null}
                    alt=''
                    className={s.img}
                  />
                  <img
                    src='/removeMobile.svg'
                    alt=''
                    className={s.removeImg}
                    onClick={() => deleteFromCart(product.selectedProductId)}
                  />
                  <div className={s.details}>
                    <div className={s.title}>
                      <div>
                        {product.paBrands?.nodes[0]?.name
                          ? product.paBrands?.nodes[0]?.name
                          : null}
                      </div>
                      <div className={s.price}>
                        {product.onSale ? (
                          <>
                            <span className={s.salePrice}>
                              {' '}
                              {salePriceFront}{' '}
                            </span>
                            <span className={s.normalPrice}>
                              {normalPriceFront}
                            </span>
                            <span className={s.discountPrice}>
                              -{discountPrice}%
                            </span>
                          </>
                        ) : (
                          <span>{normalPriceFront}</span>
                        )}
                      </div>
                    </div>
                    <div className={s.name}>
                      <div>{product.name}</div>
                    </div>
                    <div className={s.color}>
                      Цвет: <span> {product.selectedProductColor}</span>
                    </div>
                    <div className={s.flex}>
                      <div className={s.size}>
                        Размер: {product.selectedProductSize}
                        {/* {product.variations ?
                          <select name="sizes" value={product.selectedProductSize}>
                            {product.variations.nodes.map(
                                  product =>
                                    (
                                      <option value={product.selectedProductSize}>{ product.size.nodes[0].value}</option>
                                  )
                            )}
                          </select>
                        : <span> {product.selectedProductSize}</span>}
                         */}
                      </div>
                      <div className={s.stock}>
                        Кол-во: 1
                        {/* Кол-во: <select name="quantity" >
                          <option >1</option>
                          <option >2</option>
                          <option >3</option>
                          <option >4</option>
                          <option >5</option>
                        </select> */}
                      </div>
                    </div>
                    <div className={s.cardBottom}>
                      <div
                        className={`${s.wishlist} ${
                          wishlistItem ? s.active : null
                        }`}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: icons.heart }}
                        />
                        <button
                          onClick={
                            wishlistItem
                              ? () => deleteFromWishlist(product)
                              : () => addToWishlist(product)
                          }
                        >
                          {wishlistItem ? 'В избранном' : 'В избранное'}
                        </button>
                      </div>
                      <div className={s.remove}>
                        <div
                          dangerouslySetInnerHTML={{ __html: icons.times }}
                        />
                        <button
                          onClick={() =>
                            deleteFromCart(product.selectedProductId)
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`${s.right} col-lg-4`}>
          <div className={s.rightInner}>
            <OrderReview couponFront={couponFront} data={orderReviewData} />
            {/* <div className={s.rightTitle}>Итог заказа</div>
            <div className={s.rightList}>
              <div>Подытог</div>
              <div>{getFormat(price) + ' UZS'}</div>
            </div>
            <div className={s.rightList}>
              <div>Скидки</div>
              <div>
                <div>{'-' + getFormat(sale) + ' UZS'}</div>
              </div>
            </div>
            <div className={s.rightList}>
              <div>Доставка:</div>
              <div>{'30 500' + ' UZS'}</div>
            </div>

            <div className={s.rightListLast}>
              <div>Итого </div>
              <div>{getFormat(totalPrice) + ' UZS'}</div>
            </div>
            <Link href='/application'>
              <a>
                Оформить заказ
              </a>
            </Link> */}
            <div className={s.methodsText}>Принимаем к оплате:</div>
            <div className={s.methodsImages}>
              <span dangerouslySetInnerHTML={{ __html: icons.click }} />
              <span dangerouslySetInnerHTML={{ __html: icons.payme }} />
              {/* <span dangerouslySetInnerHTML={{ __html: icons.visa }} /> */}
            </div>
          </div>
          <div className={s.promoCode}>У вас есть промокод?</div>
          {loading ? (
            <Loader coupon />
          ) : myCoupon ? (
            <div className={s.activatedPromoCode}>
              Промокод <div>{myCoupon.code}</div> активирован!
              <button
                onClick={() => {
                  setMyCoupon(localStorage.removeItem('coupon'))
                  setName('')
                }}
              >
                Отменить
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className={s.wrongPromoCode}>Неправильный промокод</div>
              )}
              <div className={s.sendPromoCode}>
                <input
                  type='text'
                  placeholder='Введите промокод'
                  onChange={(e) => setName(e.target.value)}
                />
                <button onClick={sendCupon}>Применить</button>
              </div>
            </>
          )}
          {/* <div className={s.promoCode}>
            <div className={s.title}>Использовать промокод</div>
            <div className={s.promoCodeAction}>
              <button>Активировать</button>
            </div>
          </div> */}

          <OfferTwo />
        </div>
      </div>

      {/* <SectionTitle title="Возможно вам понравится" />
      {windowWidth >= 1023 ? (
        <ProductsList products={products} related={true} />
      ) : (
        <ProductSlider products={products} />
      )} */}
    </div>
  ) : (
    <div className={s.emptyCart}>
      Корзина пуста
      <Link href='/catalog'>
        <a>Начать покупки</a>
      </Link>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCart(item))
    },
    decreaseQuantity: (item, joki) => {
      dispatch(decreaseQuantity(item, joki))
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

export default connect(mapStateToProps, mapDispatchToProps)(CartMain)
