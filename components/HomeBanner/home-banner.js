import s from './home-banner.module.scss'
import { useState } from 'react'
import icons from '../../public/fixture'
import Link from 'next/link'

const HomeBanner = () => (
  <Link href='/catalog?onSale=sale'>
    <a className={s.home}></a>
  </Link>
)

export default HomeBanner
