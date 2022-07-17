import React from 'react'
import s from './loader.module.scss'

const Loader = ({coupon}) => (
    coupon ? (
        <div className={s.wrapper}>
          <div className={s.ldsHourglass}></div>
        </div>
    ) : (
        <div className={s.wrapper}>
          <div className={s.ldsHourglass}></div>
        </div>
    )

)

export default Loader
