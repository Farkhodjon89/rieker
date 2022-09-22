import s from './main-slider.module.scss'
import Slider from 'react-slick'
import { v4 as uuidv4 } from 'uuid'

const settings = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  speed: 3000,
  cssEase: 'linear',
}

const MainSlider = ({ SliderData }) => (
  <Slider {...settings}>
    {SliderData.map((v) => (
      <div key={uuidv4()} className={`${s.slider} slider`}>
        <div
          style={{
            backgroundImage: `url(${v})`,
          }}
          className={`${s.sliderImg}`}
        ></div>
      </div>
    ))}
  </Slider>
)
export default MainSlider
