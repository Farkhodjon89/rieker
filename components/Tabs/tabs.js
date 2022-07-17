import s from './tabs.module.scss';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import icons from '../../public/fixture';
import Link from 'next/link';

const SliderPrevArrow = (props) => (
  <div
    className={s.sliderPrevArrow}
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowLeft }}
  />
);

const SliderNextArrow = (props) => (
  <div
    className={s.sliderNextArrow}
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowRight }}
  />
);

const settings = {
  dots: true,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        dots: false,
      },
    },
  ],
};

const Tabs = ({ data, mobileCategory, setSearchActiveTab }) => {
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = (id) => {
    setActiveTab(id);
  };

  return (
    <section className={`${s.tab} tab`}>
      <ul className={`${mobileCategory ? s.mobileCategory : null} ${s.tabHeader}`}>
        {mobileCategory ? (
          data.map(({ id, name, icon, link }) => {
            if (!link) {
              return (
                <li
                  onClick={() => {
                    changeTab(id), setSearchActiveTab ? setSearchActiveTab(id) : null;
                  }}
                  key={id}
                  className={id === activeTab ? s.active : ''}>
                  <span dangerouslySetInnerHTML={{ __html: icon }} className={s.icon} /> {name}
                </li>
              );
            } else {
              return (
                <li className={s.dicount}>
                  <Link href={link}>
                    <a>{name}</a>
                  </Link>
                </li>
              );
            }
          })
        ) : (
          <Slider {...settings}>
            {data.map((tab, i) => (
              <li
                onClick={() => changeTab(tab.id)}
                key={tab.id}
                className={tab.id === activeTab ? s.active : ''}>
                {tab.icon ? (
                  <span dangerouslySetInnerHTML={{ __html: tab.icon }} className={s.icon} />
                ) : null}{' '}
                {tab.name}
              </li>
            ))}
          </Slider>
        )}
      </ul>
      <div className={s.tabContent}>
        {data.map((tab, i) => {
          if (tab.id == activeTab) {
            return tab.content;
          }
        })}
      </div>
    </section>
  );
};

export default Tabs;
