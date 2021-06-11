import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { client } from '~/libs/client'
import { Blog, Blogs } from '~/schema'
import NotFound from '../404'
import styles from '~/styles/blog.module.scss'

export const getStaticPaths = async () => {
  const data = await client.get<Blogs>({ endpoint: 'blog' })
  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return { paths, fallback: true }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // previewData.draftKey が型エラーとなるため、guard関数で回避
  const hasDraftKey = (item: any): item is { draftKey: string } =>
    !!(item?.draftKey && typeof item.draftKey === 'string')

  const { params, previewData } = context
  const id = params?.id
  const draftKey = hasDraftKey(previewData) ? previewData.draftKey : ''
  // プレビューモード出ない場合は undefined が入ってくる
  const isPreview = !!context.preview

  const data = await client.get<Blog>({
    endpoint: `blog/${id}`,
    queries: {
      draftKey
    }
  })

  return {
    props: {
      blog: data,
      isPreview
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogId: NextPage<Props> = ({ blog, isPreview }) => {
  if (!blog) {
    return <NotFound />
  }
  return (
    <main className={styles.main}>
      {isPreview && <p className={styles.preview}>プレビューモードです</p>}
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`
        }}
        className={styles.blog}
      ></div>
    </main>
  )
}

export default BlogId
