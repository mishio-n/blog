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
  const categories = await client.get('categories')
  const paths = await Promise.all(
    categories.contents.map((category) =>
      client
        .get('blog', {
          queries: { filters: `categories[contains]${category.id}`, limit: 1 }
        })
        .then(({ totalCount }) =>
          range(1, Math.ceil(totalCount / PER_PAGE)).map(
            (pageNumber) => `/category/${category.id}/page/${pageNumber}`
          )
        )
    )
  )

  console.log(paths)

  return { paths: paths.flat(), fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
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
