import s from "./application-main.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { getPrice } from "../../utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import icons from "../../public/fixture";
import ReactTooltip from "react-tooltip";
import MaskedInput from "react-input-mask";
import OrderReview from "../OrderReview";
import sha512 from "js-sha512";
import validator from "validator";

const cities = [
  "Ташкент",
  "Республика Каракалпакстан",
  "Андижанская область",
  "Бухарская область",
  "Джизакская область",
  "Кашкадарьинская область",
  "Навоийская область",
  "Наманганская область",
  "Самаркандская область",
  "Сурхандарьинская область",
  "Сырдарьинская область",
  "Ташкентская область",
  "Ферганская область",
  "Хорезмская область",
];

const delivery = [
  { text: "Доставка курьером", value: "flat_rate" },
  { text: "Самовывоз из магазина", value: "local_pickup" },
];

const paymentMethods = [
  { img: "", value: "cash", first: true },
  {
    img: <span dangerouslySetInnerHTML={{ __html: icons.payme }} />,
    value: "payme",
  },
  {
    img: <span dangerouslySetInnerHTML={{ __html: icons.click }} />,
    value: "click",
  },
  {
    img: <img src="/kapitalbank.png" height="50px" />,
    value: "Apelsin",
  },
  {
    img: "",
    value: "zoodpay",
  },
];

const ApplicationMain = ({ cartItems }) => {
  const [order, setOrder] = useState();
  const host =
    process.env.NODE_ENV === "production"
      ? "https://rieker.uz"
      : "http://localhost:3000";

  const { register, handleSubmit, errors } = useForm();
  const [city, setCity] = useState("Ташкент");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [comment, setComment] = useState("");
  const [selectMethod, setSelectMethod] = useState(paymentMethods[0].value);
  const [selectDelivery, setSelectDelivery] = useState(delivery[0].value);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState();
  const router = useRouter();
  const lineItems = [];

  for (const product of cartItems) {
    const { normalPrice, salePrice } = getPrice(product);
    lineItems.push({
      product_id: product.databaseId,
      name: product.name,
      price: product.onSale ? salePrice : normalPrice,
      quantity: product.quantity,
      variation_id: product.variations && product.selectedProductId,
      subtotal: product.onSale
        ? (salePrice * product.quantity).toString()
        : (normalPrice * product.quantity).toString(),
      total: product.onSale
        ? (salePrice * product.quantity).toString()
        : (normalPrice * product.quantity).toString(),
    });
  }

  const sendInfo = async () => {
    setIsLoading(true);

    const orderData = {
      set_paid: false,
      currency: "UZS",
      status: selectMethod === "cash" ? "processing" : "pending",
      payment_method: selectMethod,
      payment_method_title: selectMethod,
      line_items: lineItems,
      total: orderReviewData.totalPrice,
      billing: {
        country: country,
        address_1: address,
        city: city,
        first_name: name,
        last_name: surname,
        phone: phone,
        email: email ? email : "test@mail.ru",
      },
      shipping_lines: [
        {
          method_id:
            selectDelivery === "flat_rate" ? "flat_rate" : "local_pickup",
          method_title:
            selectDelivery === "flat_rate"
              ? "Доставка курьером"
              : "Самовывоз из магазина",
          total: selectDelivery === "flat_rate" ? "30500" : "",
        },
      ],
      customer_note: comment && comment,
    };

    const response = await axios.post("/api/order", { order: orderData });

    if (response.data.status) {
      setOrder(response.data.order);

      if (selectMethod === "cash") {
        await router.replace(`/order/${response.data.order.order_key}`);
        localStorage.clear();
      } else if (selectMethod === "zoodpay") {
        axios
          .post("/api/zoodpay", {
            data: {
              customer: {
                customer_email: response.data.order.billing.email,
                customer_phone: response.data.order.billing.phone,
                first_name: response.data.order.billing.first_name,
                customer_dob: "2000-01-01",
              },
              items: response.data.order.line_items.map(
                ({ name, price, quantity }) => ({
                  categories: [["test", "test"]],
                  name: name,
                  price: price,
                  quantity: quantity,
                })
              ),
              order: {
                amount: parseInt(response.data.order.total).toFixed(2),
                currency: "UZS",
                market_code: "UZ",
                merchant_reference_no: response.data.order.id.toString(),
                service_code: "ZPI",
                lang: "ru",
                signature: sha512(
                  `R(ZdMhPQ2$u(tuQ|${response.data.order.id}|${response.data.order.total}|UZS|UZ|xp5!e/NV`
                ),
              },
              shipping: {
                address_line1: response.data.order.billing.address_1,
                country_code: "UZB",
                name: response.data.order.billing.first_name,
                zipcode: "100000",
              },
            },
          })
          .then((res) => {
            if (res.data.status === 400) {
              setIsLoading(false);
            } else {
              axios.post("/api/transaction", {
                id: response.data.order.id,
                transaction_id: res.data.data.transaction_id,
              });
              window.location.assign(res.data.data.payment_url);
              localStorage.clear();
            }
          });
      } else {
        const form = document.querySelector(`#${selectMethod}-form`);
        if (form) {
          form.submit();
        }
        localStorage.clear();
      }
    } else {
      alert(response.data.message);
      router.reload();
    }

    setIsLoading(false);
  };

  let orderReviewData = {
    price: 0,
    sale: 0,
    totalPrice: 0,
    button: (
      <button
        onClick={handleSubmit(sendInfo)}
        disabled={isLoading}
        className={s.orderButton}
      >
        {isLoading ? (
          <div className={s.loaderAnimation}></div>
        ) : (
          <>Оформить заказ</>
        )}
      </button>
    ),
  };

  for (const product of cartItems) {
    const { normalPrice, salePrice } = getPrice(product);

    orderReviewData.price += parseInt(normalPrice) * product.quantity;
    orderReviewData.sale +=
      parseInt(normalPrice) - parseInt(salePrice) * product.quantity;

    let deliveryPrice = selectDelivery === "flat_rate" ? 30500 : 0;
    orderReviewData.totalPrice =
      orderReviewData.price - orderReviewData.sale + deliveryPrice;
  }

  if (typeof window !== "undefined") {
    fbq("track", "InitiateCheckout");
  }

  const validateEmail = (e) => {
    var email = e.target.value;
    setEmail(email);

    if (validator.isEmail(email)) {
      setEmailError();
    } else {
      setEmailError("Неверный Email");
    }
  };

  return (
    <section className="container">
      <form id="payme-form" method="post" action="https://checkout.paycom.uz">
        <input type="hidden" name="merchant" value="5e83077df404cf625d15f2a5" />
        <input
          type="hidden"
          name="amount"
          value={orderReviewData.totalPrice * 100}
        />

        <input
          type="hidden"
          name="account[order_id]"
          value={order && order.id}
        />

        <input type="hidden" name="lang" value="ru" />

        <input
          type="hidden"
          name="callback"
          value={`${host}/order/${order && order.order_key}`}
        />
      </form>
      <form
        id="click-form"
        method="get"
        action="https://my.click.uz/services/pay"
      >
        <input type="hidden" name="merchant_id" value="11148" />
        <input
          type="hidden"
          name="transaction_param"
          value={order && order.id}
        />
        <input type="hidden" name="service_id" value="15588" />
        <input type="hidden" name="amount" value={orderReviewData.totalPrice} />
        <input
          type="hidden"
          name="return_url"
          value={`${host}/order/${order && order.order_key}`}
        />
      </form>
      <form
        id="Apelsin-form"
        method="GET"
        action="https://oplata.kapitalbank.uz"
      >
        <input
          type="hidden"
          name="cash"
          value="165ee9d8a0b84e1bbb2d220dad2e47b7"
        />
        <input
          type="hidden"
          name="redirectUrl"
          value={`${host}/order/${order && order.order_key}`}
        />
        <input
          type="hidden"
          name="amount"
          value={orderReviewData.totalPrice * 100}
        />
      </form>
      {cartItems.length >= 1 ? (
        <div className={`row ${s.cards}`}>
          <div className={`${s.left} col-lg-8`}>
            <div className={s.order}>
              <div className={s.inner}>
                <div className={s.label}>
                  Персональные данные
                  <span>01</span>
                </div>
                <div className={s.flex}>
                  <div className={s.inputs}>
                    <input
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      ref={register({ required: true })}
                      className={errors.name && s.error}
                      placeholder="Имя"
                    />
                    {errors.name ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>
                  <div className={s.inputs}>
                    <input
                      name="surname"
                      onChange={(e) => setSurname(e.target.value)}
                      ref={register({ required: true })}
                      className={errors.surname && s.error}
                      placeholder="Фамилия"
                    />
                    {errors.surname ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={s.flex}>
                  <div className={s.inputs}>
                    <MaskedInput
                      mask="+\9\98999999999"
                      alwaysShowMask
                      className={errors.phone && s.error}
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      name="phone"
                    >
                      {(inputProps) => (
                        <input
                          ref={register({
                            required: true,
                            pattern:
                              /^[\+]?[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/im,
                          })}
                          value={phone}
                          name={inputProps.name}
                          {...inputProps}
                        />
                      )}
                    </MaskedInput>
                    {errors.phone ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>

                  <div className={s.inputs}>
                    <select
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                      ref={register({ required: true })}
                      className={errors.city && s.errorInput}
                    >
                      {cities.map((r, i) => (
                        <option key={i}> {r}</option>
                      ))}
                    </select>
                    {errors.city ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={s.inputs}>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    className={email ? s.valid : ""}
                    onChange={(e) => validateEmail(e)}
                  />
                  <label for="email">
                    Email (опционально){" "}
                    <span style={{ color: "red" }}>{emailError}</span>
                  </label>
                </div>
                <div className={s.inputs}>
                  <input
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    ref={register({ required: true })}
                    className={errors.address && s.error}
                    placeholder="Адрес (Район, улица, номер дома и квартиры)"
                  />
                  {errors.address ? (
                    <div className={s.errorMessage}>
                      <span
                        dangerouslySetInnerHTML={{ __html: icons.warning }}
                        data-for="error"
                        data-tip
                      />
                      <ReactTooltip id="error" type="dark" effect="solid">
                        <span>Необходимо заполнить</span>
                      </ReactTooltip>
                    </div>
                  ) : null}
                </div>

                <div className={s.inputs}>
                  <textarea
                    name="comment"
                    onChange={(e) => setComment(e.target.value)}
                    ref={register}
                    placeholder="Комментарии"
                  />
                </div>
                <div className={s.label}>
                  Способ доставки
                  <span>02</span>
                </div>
                <div className={s.payments}>
                  {delivery.map((r) => (
                    <button
                      key={uuidv4()}
                      className={`${
                        selectDelivery === r.value ? s.active : ""
                      }`}
                      onClick={() => setSelectDelivery(r.value)}
                    >
                      <div className={s.checker}></div>
                      {r.text}
                    </button>
                  ))}
                  <div className={s.deliveryText}>
                    Доставка по Узбекистану в течение 48 часов
                  </div>
                </div>

                <div className={s.label}>
                  Метод оплаты
                  <span>03</span>
                </div>
                <div>
                  Zoodpay - покупка товара в рассрочку в 4 платежа. Максимальная
                  сумма - 500 000 сум.
                </div>
                {selectMethod === "zoodpay" && !email && (
                  <div style={{ color: "red" }}>
                    При выборе Zoodpay Email обязателен
                  </div>
                )}
                <div className={s.payments}>
                  {paymentMethods.map((r, i) => (
                    <button
                      key={uuidv4()}
                      className={`${selectMethod === r.value ? s.active : ""} ${
                        r.first ? s.first : ""
                      } ${i != 0 ? s.minWidth : ""}`}
                      onClick={() => setSelectMethod(r.value)}
                    >
                      <div className={s.checker}></div>
                      {r.img ? r.img : null}
                      {(r.value === "cash" &&
                        "Оплата наличными или картой при доставке") ||
                        (r.value === "zoodpay" && "zoodpay")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={`${s.right} col-lg-4`}>
            <div className={s.rightInner}>
              <OrderReview
                data={orderReviewData}
                selectDelivery={selectDelivery}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={s.emptyCart}>
          Корзина пуста
          <Link href="/catalog">
            <a>Начать покупки</a>
          </Link>
        </div>
      )}
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: () => {
      dispatch(deleteAllFromCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationMain);
