import React from 'react'
import s from './instant-buy-modal2.module.scss'
import ReactModal from 'react-modal'
import ProductsList from '../../components/ProductsList'
import Link from 'next/link'
const InstantBuyModal2 = ({
  buy,
  setBuy,
  product,
  selectedProductColor,
  selectedProductSize,
  normalPriceFront,
  salePriceFront,
  salePrice,
  cartItemsLength,
}) => {
  return (
    <>
      <ReactModal
        isOpen={buy}
        onRequestClose={() => setBuy(false)}
        ariaHideApp={false}
        overlayClassName={s.modalOverlay}
        className={s.modalContent}
      >
        <div className={s.modalTop}>Успешно добавлено в корзину!</div>
        <div className={s.inner}>
          <div className={s.product}>
            <div className={s.image}>
              <img
                src={product.image ? product.image.sourceUrl : null}
                alt=''
              />
            </div>
            <div className={s.details}>
              <div>{product.name}</div>
              <div className={s.color}>
                Цвет: <span> {selectedProductColor}</span>
              </div>
              <div className={s.color}>
                Размер: <span> {selectedProductSize}</span>
              </div>
              <div className={s.color}>
                Количество: <span>1</span>
              </div>
              <div className={s.price}>
                <span>{salePrice ? salePriceFront : normalPriceFront}</span>
              </div>
            </div>
          </div>
          <div className={s.right}>
            <div>
              <div>Ваша корзина:</div>
              <div>{cartItemsLength} предмет</div>
            </div>
            <div>
              <div>Общая стоимость продукта:</div>
              <div>{salePrice ? salePriceFront : normalPriceFront}</div>
            </div>
            <div>
              <div>Общая стоимость доставка:</div>
              <div>БЕСПЛАТНО</div>
            </div>
            <hr />
            <div>
              <div>Итого до налогообложения:</div>
              <div>{salePrice ? salePriceFront : normalPriceFront}</div>
            </div>
            <Link href='/application'>
              <a className={s.application}>Заказать сейчас</a>
            </Link>
            <Link href='/cart'>
              <a className={s.cart}>Перейти в корзину</a>
            </Link>
          </div>
        </div>
        {/* <div style={{ margin: '16px 0' }}>С этим будут идеально сочетаться</div>
        <ProductsList products={product.related.nodes} related={true} /> */}
      </ReactModal>
    </>
  )
}

export default InstantBuyModal2
