import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Articles } from '~/components/Articles'
import { Layout } from '~/components/Layout'
import { Pager } from '~/components/Pager'
import { client } from '~/libs/client'
import { getAllCategoryPaths } from '~/libs/get-paths'
import { generateTitle, OG_TITLE } from '~/libs/meta'

const PER_PAGE = 10

export const getStaticPaths = async () => {
  const paths = await getAllCategoryPaths()

  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
  if (!params) {
    throw Error('param error')
  }

  const { pageNumber, categoryId } = params
  if (typeof pageNumber !== 'string') {
    throw Error('param error')
  }

  if (typeof categoryId !== 'string') {
    throw Error('param error')
  }

  const blogs = await client.get('blog', {
    queries: {
      offset: (+pageNumber - 1) * PER_PAGE,
      limit: PER_PAGE,
      filters: `categories[contains]${categoryId}`
    }
  })

  const categories = await client.get('categories')

  return {
    props: {
      blogs,
      categories,
      pageNumber
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogPage: NextPage<Props> = ({ blogs, categories, pageNumber }) => {
  const pagetitle = generateTitle()
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <Layout categories={categories.contents}>
        <Articles blogs={blogs.contents} />
        <Pager totalCount={blogs.totalCount} currentPageNumber={+pageNumber} />
      </Layout>
    </>
  )
}

export default BlogPage
