import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import { client } from '~/libs/client'
import { range } from '~/libs/range'
import { Pager } from '~/components/pager'
import { generateTitle, OG_TITLE } from '~/libs/meta'
import Head from 'next/head'
import Header from '~/components/header'
import Layout from '~/components/layout'

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
      blogs: data
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogPage: NextPage<Props> = ({ blogs }) => {
  const pagetitle = generateTitle()
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <Header />
      <Layout blogs={blogs} />
    </>
  )
}

export default BlogPage
