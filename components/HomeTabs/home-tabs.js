import Tabs from "../Tabs";
import icons from "../../public/fixture.js";

const data = [
  {
    id: 0,
    name: "О компании",
    icon: icons.tabInfo,
    content: (
      <div>
        <h1>FCN Group – Это не только премиальная одежда в Узбекистане.</h1>
        <p>
          Деятельность FCN Group отражает комплексный подход к созданию
          безупречного образа успешного человека и помимо магазинов одежды
          включает в себя центр красоты и здоровья Aesthetic Island fitness&spa,
          французский аффилированный салон красоты Guinot, эко-химчистку
          премиум-класса Laura Luxury Laundry. Новая страница в истории развития
          FCN Group - появление глянцевого журнала HILL, который знакомит нас с
          интересами современных успешных мужчин. Яркая иллюстрация успешной
          многосторонней деятельности компании – ежеквартальное печатное издание
          HILL о моде и не только.
        </p>
        <h2>ФИЛОСОФИЯ КОМПАНИИ FCN GROUP</h2>
        <p>
          • На протяжении многих лет мы демонстрируем устойчивое и плодотворное
          сотрудничество с самыми популярными мировыми марками одежды и являемся
          единственными официальными представителями этих марок в Узбекистане,
          открывая магазины-франчайзинги.
          <br /> • Мы тщательно отслеживаем веяния мировой моды, посещая
          выставки и модные показы, ежесезонно поставляем актуальные коллекции,
          тем самым гарантируя покупателям самую популярную fashion-продукцию.
          Каждый магазин в полной мере соответствует международным стандартам
          как в отношении дизайна и ассортимента, так и обслуживания.
          <br />• Индивидуальный подход к каждому клиенту – это главное, на чем
          базируется работа в любом направлении деятельности нашей компании,
          благодаря чему нам удалось не только заслужить доверие клиентов, но и
          удерживать лидерские позиции на рынке в течение длительного времени.
          <br />
          <br />
          Мы работаем, чтобы сделать каждого человека прекраснее!
        </p>
      </div>
    ),
  },
  {
    id: 1,
    name: "Интернет-магазин",
    icon: icons.tabStorefront,
    content: (
      <div>
        <h1>
        О покупке
        </h1>
        <p>
        Повседневная практика показывает, что сплочённость команды профессионалов обеспечивает актуальность укрепления моральных ценностей. Не следует, однако, забывать, что понимание сути ресурсосберегающих технологий требует анализа глубокомысленных рассуждений. В рамках спецификации современных стандартов, представители современных социальных резервов ограничены исключительно образом мышления.
        </p>
        <h2>
        Онлайн оплата
        </h2>
        <p>
        И нет сомнений, что стремящиеся вытеснить традиционное производство, нанотехнологии будут ограничены исключительно образом мышления. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: повышение уровня гражданского сознания играет важную роль в формировании глубокомысленных рассуждений.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    name: "Большой выбор товаров",
    icon: icons.tabPackage,
    content: (
      <div>
        <h1>
          От брендовой одежды для взрослых - до премиальной обуви для детей.
        </h1>
        <p>
          В нашем интернет-магазине, вы сможете найти незабываемый стиль, среди
          более 2000 товаров одежды и обуви для мужчин, женщин и детей.
        </p>
        <h4>Регулярные акции</h4>
        <p>
          Наши клиенты в Узбекистане уже оценили преимущества наших акций: ведь
          с ними можно купить брендовую одежду по низким ценам и вам не придется
          ходить по бутикам и тратить драгоценное время на многочасовые шопинги.
          Чтобы выглядеть стильно и без вреда для кармана, просто найдите наши
          товары по акции и применяйте промокоды.
        </p>
        <br />
        <h4>Большие скидки на бренды</h4>
        <p>
          В каталоге FCN Shop - вы сможете купить одежду от известных мировых
          брендов со скидкой до 50%. Ловите момент и заходите на сайт и
          узнавайте о новых поступлениях со скидками! Обновите свой гардероб,
          купив качественные вещи от всемирно известных брендов - не потратив
          при этом лишнего.
        </p>
        <br />
        <h4>Действующие акции: </h4>
        <p>
          На данный момент действует акция «Две по цене одной»Приобретайте
          мужскую или женскую одежду и получайте еще один товар в подарок!
          Используй промо код: FCN2021
        </p>
      </div>
    ),
  },
  
];

const HomeTabs = () => <Tabs data={data} />;
export default HomeTabs;
