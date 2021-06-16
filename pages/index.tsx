import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Layout from '~/components/layout'
import { client } from '~/libs/client'
import { generateTitle, OG_TITLE } from '~/libs/meta'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const data = await client.get('blog', {
    queries: { offset: 0, limit: 10 }
  })

  return {
    props: {
      blogs: data
    }
  }
}

const Home: NextPage<Props> = ({ blogs }) => {
  const pagetitle = generateTitle()
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <Header />
      <Layout blogs={blogs} currentPageNumber={1} />
      <Footer />
    </>
  )
}

export default Home
