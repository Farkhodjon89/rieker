import s from './categories-block.module.scss'
import Link from 'next/link'
import icons from '../../public/fixture'

const CategoriesBlock = ({ categories, quantity }) => (
  <section className={quantity == 4 ? s.fourBlock : s.fiveBlock}>
    {categories.map((category) => (
      <Link href={category.link}>
        <a className={s.banner}>
          <div style={{ backgroundImage: `url(${category.image.sourceUrl})` }}>
            <div className={s.title}>{category.title}</div>
            <span className={s.link}>
              К покупке
              <span dangerouslySetInnerHTML={{ __html: icons.fullArrowLeft }} />
            </span>
          </div>
        </a>
      </Link>
    ))}
  </section>
)

export default CategoriesBlock
