import { memo, ReactNode, VFC } from 'react'

import { Footer } from '../atoms/Footer'
import { Header } from '../atoms/Header'

interface Props {
  children: ReactNode
}

export const Layout: VFC<Props> = memo((props) => {
  const { children } = props
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
})
