import React, { useEffect } from 'react'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import { CsrfToken } from './types/types'
import { useAppSelector } from './app/hooks'
import { selectCsrfState } from './slices/csrfSlice'
import { Router } from './routes/Router'
import { Header } from './components/atoms/Header'
import { Footer } from './components/atoms/Footer'

const App = () => {
  const csrf = useAppSelector(selectCsrfState)

  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/auth/csrftoken`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
    }
    getCsrfToken()
  }, [csrf])

  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{ className: 'px-20 py-3 bg-primary text-white' }}
      />
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  )
}

export default App
