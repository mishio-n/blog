import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { client } from '~/libs/client'
import { Blog, Blogs } from '~/schema'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogId: React.FC<Props> = ({ blog }) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`
        }}
      ></div>
    </main>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get<Blogs>({ endpoint: 'blog' })
  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params.id
  const data = await client.get<Blog>({ endpoint: `blog/${id}` })

  return {
    props: {
      blog: data
    }
  }
}

export default BlogId
