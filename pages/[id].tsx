import highlight from 'highlight.js'
import { JSDOM } from 'jsdom'
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import rehypeStringify from 'rehype-stringify/lib'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import unified from 'unified'
import { Content } from '~/components/Content'
import { Layout } from '~/components/Layout'
import { client, microcmsClient } from '~/libs/client'
import { getAllBlogPaths } from '~/libs/get-paths'
import {
  DESCRIPTION,
  generateTitle,
  OG_DESCRIPTION,
  OG_IMAGE,
  OG_TITLE
} from '~/libs/meta'
import NotFound from '~/pages/404'
import { Blog, Markdown, RichEdit } from '~/schema'

const parseMarkdown = (markdown: Markdown) =>
  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString()

const preProcessingDom = (rawHTML: RichEdit) => {
  const dom = new JSDOM(rawHTML)
  const toc: { id: string; name: string; text: string }[] = []
  // 目次生成
  dom.window.document.querySelectorAll('h1, h2, h3').forEach((element) => {
    toc.push({
      id: element.id,
      name: element.tagName,
      text: element.textContent ?? ''
    })
  })

  // シンタックスハイライト
  dom.window.document.querySelectorAll('pre code').forEach((element) => {
    const res = highlight.highlightAuto(element.textContent ?? '')
    element.innerHTML = res.value
    element.classList.add('hljs')
  })

  return { contents: dom.window.document.body.innerHTML, toc }
}

export const getStaticPaths = async () => {
  const paths = await getAllBlogPaths()
  return { paths, fallback: true }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // previewData.draftKey が型エラーとなるため、guard関数で回避
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasDraftKey = (item: any): item is { draftKey: string } =>
    !!(item?.draftKey && typeof item.draftKey === 'string')

  const { params, previewData } = context
  const id = params?.id
  const draftKey = hasDraftKey(previewData) ? previewData.draftKey : ''
  // プレビューモードでない場合は undefined が入ってくる
  const isPreview = !!context.preview

  const blog = await microcmsClient.get<Blog>({
    endpoint: `blog/${id}`,
    queries: {
      draftKey
    }
  })

  const categories = await client.get('categories')
  // microCMSの繰り返しフィールドを処理しつつ1つのHTMLにつなげる
  const repeatedFields = blog.body
    .map((field) => {
      if (field.fieldId === 'markdown') {
        return parseMarkdown(field.content)
      } else {
        return field.content
      }
    })
    .join('<br>')

  // シンタックスハイライト, 目次作成処理
  const { contents, toc } = preProcessingDom(repeatedFields)

  return {
    props: {
      blog,
      contents,
      categories,
      isPreview,
      toc: toc
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogId: NextPage<Props> = ({
  blog,
  contents,
  categories,
  isPreview,
  toc
}) => {
  if (!blog) {
    return <NotFound />
  }

  const title = generateTitle(blog.title)
  const description = blog.description

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
        <meta key={DESCRIPTION} name={DESCRIPTION} content={description} />
        <meta
          key={OG_DESCRIPTION}
          property={OG_DESCRIPTION}
          content={description}
        />
        <meta key={OG_IMAGE} property={OG_IMAGE} content={blog.ogimage.url} />
      </Head>
      <Layout categories={categories.contents}>
        <Content
          blog={blog}
          contents={contents}
          toc={toc}
          isPreview={isPreview}
        />
      </Layout>
    </>
  )
}

export default BlogId
