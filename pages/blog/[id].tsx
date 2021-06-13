import highlight from 'highlight.js'
import { JSDOM } from 'jsdom'
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { client, microcmsClient } from '~/libs/client'
import { Blog } from '~/schema'
import styles from '~/styles/blog.module.scss'
import NotFound from '../404'

const preProcessingDom = (rawHTML: string) => {
  const dom = new JSDOM(rawHTML)
  const toc: { id: string; name: string; text: string }[] = []

  dom.window.document.querySelectorAll('h1, h2, h3').forEach((element) => {
    toc.push({
      id: element.id,
      name: element.tagName,
      text: element.textContent ?? ''
    })
  })

  dom.window.document.querySelectorAll('pre code').forEach((element) => {
    const res = highlight.highlightAuto(element.textContent ?? '')
    element.innerHTML = res.value
    element.classList.add('hljs')
  })

  dom.window.document.querySelectorAll('img').forEach((element) => {
    element.classList.add('lazyload')
    element.setAttribute('data-src', element.src)
    element.src = ''
  })

  return { body: dom.window.document.body.innerHTML, toc }
}

export const getStaticPaths = async () => {
  const data = await client.get('blog')
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

  const data = await microcmsClient.get<Blog>({
    endpoint: `blog/${id}`,
    queries: {
      draftKey
    }
  })

  // シンタックスハイライト処理
  const parsedDom = preProcessingDom(data.body)
  data.body = parsedDom.body

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
