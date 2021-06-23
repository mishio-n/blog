import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Articles } from '~/components/Articles'
import { Layout } from '~/components/Layout'
import { Pager } from '~/components/Pager'
import { client } from '~/libs/client'
import { generateTitle, OG_TITLE } from '~/libs/meta'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const blogs = await client.get('blog', {
    queries: { offset: 0, limit: 10 }
  })

  const categories = await client.get('categories')

  return {
    props: {
      blogs,
      categories
    }
  }
}

const Home: NextPage<Props> = ({ blogs, categories }) => {
  const pagetitle = generateTitle()
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <Layout categories={categories.contents}>
        <Articles blogs={blogs.contents} />
        <Pager totalCount={blogs.totalCount} currentPageNumber={1} />
      </Layout>
    </>
  )
}

export default Home
