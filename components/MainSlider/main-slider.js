import s from './main-slider.module.scss'
import Slider from 'react-slick'
import { v4 as uuidv4 } from 'uuid'
import icons from '../../public/fixture'

const SliderPrevArrow = (props) => (
  <div
    className={s.sliderPrevArrow}
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowLeft }}
  />
)

const SliderNextArrow = (props) => (
  <div
    className={s.sliderNextArrow}
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowRight }}
  />
)

const settings = {
  dots: true,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
}

const MainSlider = ({ SliderData, productMod }) => (
  <section className={!productMod ? `topSlider` : `productSlider`}>
    <Slider {...settings}>
      {SliderData.map((v) => (
        <div key={uuidv4()} className={`${s.slider} slider`}>
          <div
            style={{
              backgroundImage: `url(${v.original})`,
            }}
            className={`${s.sliderImg}`}
          ></div>
        </div>
      ))}
    </Slider>
  </section>
)
export default MainSlider
