import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Articles } from '~/components/articles'
import { Layout } from '~/components/layout'
import { Pager } from '~/components/pager'
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
      <Layout>
        <Articles blogs={blogs.contents} />
        <Pager totalCount={blogs.totalCount} currentPageNumber={1} />
      </Layout>
    </>
  )
}

export default Home
