import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import { client } from '~/libs/client'
import { range } from '~/libs/range'
import { Pagination } from '~/components/pagination'

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
      blog: data.contents,
      totalCount: data.totalCount
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogPage: NextPage<Props> = ({ blog, totalCount }) => {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </div>
  )
}

export default BlogPage
