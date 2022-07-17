import s from './header-two.module.scss'
import Link from 'next/link'
import icons from '../../public/fixture'

const HeaderTwo = ({ orderPage }) => (
  <header className={s.header}>
    <div className='container'>
      <div className={s.content}>
        <Link href='/'>
          <a>
            <span
              className={s.logo}
              dangerouslySetInnerHTML={{ __html: icons.logoTwo }}
            />
          </a>
        </Link>

        <div>
          <span dangerouslySetInnerHTML={{ __html: icons.phone }} />
          Заказ по телефону:{' '}
          <Link href='tel:+998990662850'>
            <a>(99) 066 28 50</a>
          </Link>{' '}
          <Link href='tel:+998900412850'>
            <a>(90) 041 28 50</a>
          </Link>
        </div>
      </div>
    </div>
  </header>
)

export default HeaderTwo
