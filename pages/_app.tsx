import type { AppProps } from 'next/app'
import Header from '~/components/header'
import { usePageView } from '~/hooks/use-pageview'
import '~/styles/reset.css'
import '~/styles/globals.scss'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  usePageView()
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
