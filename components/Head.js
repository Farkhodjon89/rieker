import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

const SITE_URL = 'https://rieker.uz/'
const SITE_NAME = 'RIEKER'
const DEFAULT_TITLE = 'Мужская и женская обувь немецкого качества | Rieker'
const DEFAULT_DESCRIPTION =
  'Интернет-магазин женской и мужской немецкой обуви в Ташкенте. Удобная колодка, эластичные материалы высшего качества. Заказывай прямо сейчас!'

export const HeadData = ({ title, description, image, product }) => {
  return (
    <>
      <NextSeo
        title={title ? title : DEFAULT_TITLE}
        description={description ? description : DEFAULT_DESCRIPTION}
        openGraph={{
          images: [
            {
              url: image ? image : `${process.env.PUBLIC_URL}/logo.png`,
            },
          ],
          url: SITE_URL,
          title: title ? title : DEFAULT_TITLE,
          site_name: SITE_NAME,
          locale: 'ru_RU',
          type: 'website',
          description: description ? description : DEFAULT_DESCRIPTION,
        }}
        twitter={{
          cardType: 'summary',
          handle: '@handle',
          site: '@site',
          title: title ? title : DEFAULT_TITLE,
          description: description ? description : DEFAULT_DESCRIPTION,
        }}
      />
      <Head>
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
             !function(f,b,e,v,n,t,s)
             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
             n.queue=[];t=b.createElement(e);t.async=!0;
             t.src=v;s=b.getElementsByTagName(e)[0];
             s.parentNode.insertBefore(t,s)}(window, document,'script',
             'https://connect.facebook.net/en_US/fbevents.js');
             fbq('init', '2726306444332187');
             fbq('track', 'PageView');      
            ${
              product &&
              `fbq('track', 'ViewContent', ${JSON.stringify({
                content_ids: product.id,
                content_type: 'product',
                value: product.onSale
                  ? product.woocsSalePrice
                  : product.woocsRegularPrice,
                currency: 'UZS',
              })});`
            }
            `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <img height=“1” width=“1" style=“display:none”
                src=“https://www.facebook.com/tr?id=2738886189753403&ev=PageView&noscript=1” />
                `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w, d, s, h, id) {
                w.roistatProjectId = id; w.roistatHost = h;
                var p = d.location.protocol == "https:" ? "https://" : "http://";
                var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init?referrer="+encodeURIComponent(d.location.href);
                var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
            })(window, document, 'script', 'cloud.roistat.com', '8ed184a1ea3a8ff685e61cb4d405fb0c');
            `,
            }}
          />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(88087381, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
              });
            `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <div><img src="https://mc.yandex.ru/watch/88087381" style="position:absolute; left:-9999px;" alt="" /></div>
                `,
            }}
          /> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PL8L8J4');
            `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PL8L8J4"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
                `,
            }}
          />
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-220395958-1'
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); 
            gtag('config', 'UA-220395958-1'); 
          `,
            }}
          />
          <meta
            name='google-site-verification'
            content='kEjW7iZN4AhobhNq7LC1pUWzebwOFF36W2CoaAaAONE'
          />
        </>
      </Head>
    </>
  )
}
