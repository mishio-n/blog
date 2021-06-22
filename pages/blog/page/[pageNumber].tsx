import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Articles } from '~/components/Articles'
import { Layout } from '~/components/Layout'
import { Pager } from '~/components/Pager'
import { client } from '~/libs/client'
import { generateTitle, OG_TITLE } from '~/libs/meta'
import { range } from '~/libs/range'

const PER_PAGE = 10

export const getStaticPaths = async () => {
  const data = await client.get('blog')
  const paths = range(1, Math.ceil(data.totalCount / PER_PAGE)).map(
    (pageNumber) => `/blog/page/${pageNumber}`
  )

  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
  const pageNumber = params.pageNumber
  if (typeof pageNumber !== 'string') {
    throw Error('param error')
  }

  const data = await client.get('blog', {
    queries: { offset: (+pageNumber - 1) * PER_PAGE, limit: PER_PAGE }
  })

  return {
    props: {
      blogs: data,
      pageNumber
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogPage: NextPage<Props> = ({ blogs, pageNumber }) => {
  const pagetitle = generateTitle()
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <Layout>
        <Articles blogs={blogs.contents} />
        <Pager totalCount={blogs.totalCount} currentPageNumber={+pageNumber} />
      </Layout>
    </>
  )
}

export default BlogPage
