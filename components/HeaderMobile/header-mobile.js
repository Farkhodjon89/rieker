import icons from '../../public/fixture'
import s from './header-mobile.module.scss'
import MobileCategories from '../MobileCategories'
import Tabs from '../Tabs'
import Link from 'next/link'

const HeaderMobile = ({
  activeStatus,
  getActiveStatus,
  categories,
  wishlistItems,
}) => {
  const men = categories.find((category) => category.slug === 'dlya-muzhchin')
  const woman = categories.find(
    (category) => category.slug === 'dlya-zhenshhin'
  )
  const unisex = categories.find((category) => category.slug === 'uniseks')

  const mobileCategoryTabs = [
    {
      id: 0,
      name: 'Мужчины',
      icon: null,
      content: (
        <MobileCategories
          categories={men}
          parentCategory='dlya-muzhchin'
          saleCategoryImage={
            men.category_settings.mobilesaleimage
              ? men.category_settings.mobilesaleimage.sourceUrl
              : null
          }
          getActiveStatus={getActiveStatus}
        />
      ),
    },
    {
      id: 1,
      name: 'Женщины',
      icon: null,
      content: (
        <MobileCategories
          categories={woman}
          parentCategory='dlya-zhenshhin'
          saleCategoryImage={
            woman.category_settings.mobilesaleimage
              ? woman.category_settings.mobilesaleimage.sourceUrl
              : null
          }
          getActiveStatus={getActiveStatus}
        />
      ),
    },
    {
      id: 2,
      name: 'Унисекс',
      icon: null,
      content: (
        <MobileCategories
          categories={unisex}
          parentCategory='uniseks'
          saleCategoryImage={
            unisex.category_settings.mobilesaleimage
              ? unisex.category_settings.mobilesaleimage.sourceUrl
              : null
          }
          getActiveStatus={getActiveStatus}
        />
      ),
    },
    {
      id: 3,
      name: 'Скидки',
      icon: null,
      link: '/catalog/sale',
    },
  ]
  return (
    <section className={`${s.wrapper}  ${activeStatus && s.active}`}>
      <div className={s.mobileMenu}>
        <Tabs data={mobileCategoryTabs} mobileCategory={true} />
        <ul className={s.list}>
          {/* <li className={`${s.user} ${s.item}`}>
                <Link href='/'>
                  <a >
                    <span dangerouslySetInnerHTML={{__html: icons.user }}  /> 
                    <h4 className={s.title}>Войти</h4>
                  </a>
                </Link>
              </li> */}
          <li className={`${s.wishlist} ${s.item}`}>
            <Link href='/wishlist'>
              <a className={s.mobileWishlist}>
                <span dangerouslySetInnerHTML={{ __html: icons.wishlist }} />
                {wishlistItems.length > 0 && (
                  <span className={s.wishlistQuantity}>
                    {wishlistItems.length}
                  </span>
                )}
                <span className={s.title}>Избранное</span>
              </a>
            </Link>
          </li>

          <li className={`${s.help} ${s.item}`}>
            <Link href='/contacts'>
              <a>
                <span dangerouslySetInnerHTML={{ __html: icons.help }} />
                <h4 className={s.title}>Помощь</h4>
              </a>
            </Link>
          </li>
          <li className={`${s.phone} ${s.item}`}>
            <Link href='tel:+998990662850'>
              <a>
                <span dangerouslySetInnerHTML={{ __html: icons.phone }} />
                +998990662850
              </a>
            </Link>
          </li>
        </ul>
        <div className={s.social}>
          <div className={s.title}>Мы в социальных сетях</div>
          <ul className={s.list}>
            <li className={s.item}>
              <Link href='https://t.me/riekeruzbekistan'>
                <a dangerouslySetInnerHTML={{ __html: icons.telegram }} />
              </Link>
            </li>
            <li className={s.item}>
              <Link href='https://www.facebook.com/riekertashkent/'>
                <a dangerouslySetInnerHTML={{ __html: icons.facebook }} />
              </Link>
            </li>
            <li className={s.item}>
              <Link href='https://www.instagram.com/rieker_tashkent/'>
                <a dangerouslySetInnerHTML={{ __html: icons.instagram }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.apply}>
        <button
          onClick={() => getActiveStatus(false)}
          dangerouslySetInnerHTML={{ __html: icons.times }}
        />
      </div>
    </section>
  )
}

export default HeaderMobile
