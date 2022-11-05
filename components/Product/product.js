import s from './product.module.scss'
import Link from 'next/link'
import { getPrice, getFormat, getDiscount } from '../../utils'
import icons from '../../public/fixture.js'
import { connect } from 'react-redux'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import InstantViewModal from '../InstantViewModal'
import { useState } from 'react'

const Product = ({
  product,
  catalogMod,
  related,
  wishlistItems,
  addToWishlist,
  deleteFromWishlist,
}) => {
  const [buy, setBuy] = useState(false)
  const { normalPrice, salePrice } = getPrice(product)
  const normalPriceFront = [getFormat(normalPrice), 'UZS'].join(' ')
  const salePriceFront = [getFormat(salePrice), 'UZS'].join(' ')
  const discountPrice = getDiscount(normalPrice, salePrice)
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0]

  return (
    <>
      <div
        className={
          related
            ? `${s.product} ${s.related} product col-lg-3`
            : `${s.product} product ${
                catalogMod
                  ? `col-lg-4 col-sm-6 col-6 col-md-6 ${s.heightMin}`
                  : null
              }`
        }
      >
        <div className={s.productTop}>
          {product.image && (
            <Link href={'/product/' + product.slug}>
              <a>
                <img src={product.image.sourceUrl} className={s.img} />
                <div className={s.label}>
                  {product.onSale ? (
                    <span className={s.sale}>-{discountPrice}%</span>
                  ) : null}
                </div>
              </a>
            </Link>
          )}
          <button
            className={s.magnifier}
            dangerouslySetInnerHTML={{ __html: icons.magnifier }}
            onClick={() => setBuy(!buy)}
          />
          <button
            className={`${s.addToWishlist} ${wishlistItem ? s.active : null}`}
            onClick={
              wishlistItem
                ? () => deleteFromWishlist(product)
                : () => addToWishlist(product)
            }
            dangerouslySetInnerHTML={{ __html: icons.wishlist }}
          />
        </div>
        <div className={s.productBottom}>
          <div className={s.title}>{product.name}</div>
          {normalPrice && (
            <div className={product.onSale ? s.sale : s.price}>
              {product.onSale ? (
                <>
                  <span className={s.salePrice}> {salePriceFront} </span>
                  <span className={s.normalPrice}>{normalPriceFront}</span>
                </>
              ) : (
                <span>{normalPriceFront}</span>
              )}
            </div>
          )}
        </div>
      </div>
      <InstantViewModal buy={buy} setBuy={setBuy} product={product} />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
