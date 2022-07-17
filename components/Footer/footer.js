import s from './footer.module.scss';
import Link from 'next/link';

import icons from '../../public/fixture';

const Footer = () => (
  <footer>
    <a className="contact-tg" href="https://t.me/rieker_work" target="_blank">
      <img src="/telegram-logo.svg" alt="Telegram logo" className="mr-2" width="30" height="30" />
      <div>Написать нам</div>
    </a>
    <section className={s.footer}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={s.menu}>
              <div className="row">
                <div className="col-lg-3">
                  <ul className={s.list}>
                    <li className={s.title}>О КОМПАНИИ</li>
                    <li className={s.item}>
                      <Link href="/about">
                        <a>О нас</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/contacts">
                        <a>Контакты</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/guarantee">
                        <a>Гарантия</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <ul className={s.list}>
                    <li className={s.title}>КАТЕГОРИИ</li>
                    <li className={s.item}>
                      <Link href="/catalog/dlya-muzhchin">
                        <a>Мужчины</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/catalog/dlya-zhenshhin">
                        <a>Женщины</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/catalog/uniseks">
                        <a>Унисекс</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <ul className={s.list}>
                    <li className={s.title}>ПОМОЩЬ</li>
                    <li className={s.item}>
                      <Link href="/how-order">
                        <a>Как оформить заказ</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/payment">
                        <a>Способы оплаты</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/delivery">
                        <a>Условия доставки</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <ul className={s.list}>
                    <li className={s.title}>ИНФОРМАЦИЯ</li>
                    <li className={`${s.phone} ${s.item}`}>
                      <Link href="tel:+998990662850">
                        <a>
                          <span dangerouslySetInnerHTML={{ __html: icons.phone }} />
                          +998990662850
                        </a>
                      </Link>
                    </li>
                    <li className={s.title}>Мы в социальных сетях</li>
                    <ul className={s.socialList}>
                      <li className={s.item}>
                        <Link href="https://t.me/rieker_work">
                          <a dangerouslySetInnerHTML={{ __html: icons.telegram }} />
                        </Link>
                      </li>
                      <li className={s.item}>
                        <Link href="https://www.facebook.com/riekertashkent/">
                          <a dangerouslySetInnerHTML={{ __html: icons.facebook }} />
                        </Link>
                      </li>
                      <li className={s.item}>
                        <Link href="https://www.instagram.com/rieker.uzbekistan/">
                          <a
                            dangerouslySetInnerHTML={{
                              __html: icons.instagram,
                            }}
                          />
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className={s.copyright}>
              <div className="row">
                <div className={`col-lg-3 col-xl-3 col-md-4 col-sm-12 ${s.left}`}>
                  2021 © Rieker-shop.uz — интернет магазин <br /> немецкой обуви и аксессуаров. Все
                  права защищены.
                </div>
                <div className={`col-lg-6 col-xl-6 col-md-4  col-sm-12 ${s.center}`}>
                  <ul className={s.list}>
                    <li className={s.item}>
                      <span dangerouslySetInnerHTML={{ __html: icons.click }} />{' '}
                    </li>
                    <li className={s.item}>
                      <span dangerouslySetInnerHTML={{ __html: icons.payme }} />{' '}
                    </li>
                    {/* <li className={s.item}>
                      <span dangerouslySetInnerHTML={{ __html: icons.visa }} />{' '}
                    </li> */}
                    <li className={s.item}>
                      <span dangerouslySetInnerHTML={{ __html: icons.apelsin }} />{' '}
                    </li>
                  </ul>
                </div>
                <div className={`col-lg-3 col-xl-3 col-md-4 col-sm-12 ${s.right}`}>
                  <Link href="https://billz.uz">
                    <a target="_blank">
                      E-commerce решение от
                      <span dangerouslySetInnerHTML={{ __html: icons.billzLogo }} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
);

export default Footer;
