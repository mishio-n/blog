import type { AppProps } from 'next/app';
import { usePageView } from '~/hooks/use-pageview';
import '~/styles/globals.scss';
import '~/styles/reset.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  usePageView();
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
