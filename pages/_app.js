import '../styles/globals.scss'
import { PersistGate } from 'redux-persist/integration/react'
import Router from 'next/router'
import { useStore } from 'react-redux'
import { store } from '../redux/store'
import React, { useState, useEffect } from 'react'
import Wait from '../components/wait'
import { YMInitializer } from 'react-yandex-metrika'

if (process.browser) {
  var hours = 6
  var now = Date.now()
  var setupTime = localStorage.getItem('version')
  if (setupTime == null) {
    localStorage.clear()
    localStorage.setItem('version', now)
  } else if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear()
    localStorage.setItem('version', now)
  }
}

function MyApp({ Component, pageProps }) {
  const store = useStore()

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return loading ? (
    <Wait />
  ) : (
    <>
      <YMInitializer
        accounts={[88087381]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        }}
      />
      <PersistGate persistor={store.__persistor}>
        {() => <Component {...pageProps} />}
      </PersistGate>
    </>
  )
}

export default store.withRedux(MyApp)
