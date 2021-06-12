import type { AppProps } from 'next/app'
import { usePageView } from '~/hooks/use-pageview'
import '~/styles/globals.scss'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  usePageView()
  return <Component {...pageProps} />
}

export default MyApp
