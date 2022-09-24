import Head from 'next/head';
import { ReactNode } from 'react';
import { Aside } from '~/components/Aside';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import {
  DESCRIPTION,
  OG_DESCRIPTION,
  OG_IMAGE,
  OG_TYPE,
  SITE_URL,
} from '~/libs/meta';
import { Category } from '~/schema';

type Props = {
  children: ReactNode;
  categories: Category[];
};

export const Layout: React.FC<Props> = ({ children, categories }) => {
  return (
    <>
      <Head>
        <meta key={DESCRIPTION} name={DESCRIPTION} content={''} />
        <meta key={OG_DESCRIPTION} property={OG_DESCRIPTION} content={''} />
        <meta key={OG_TYPE} property={OG_TYPE} content="website" />
        <meta
          key={OG_IMAGE}
          property={OG_IMAGE}
          content={`${SITE_URL}/og.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <div className="mx-auto mt-5 mb-0 px-5 >1024:flex >1024:w-lg >1024:justify-between">
        <div className="lg:w-md">{children}</div>
        <Aside categories={categories} />
      </div>
      <Footer />
    </>
  );
};
