import highlight from 'highlight.js'
import { JSDOM } from 'jsdom'
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
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
import { Blog } from '~/schema'

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

  return { body: dom.window.document.body.innerHTML, toc }
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
  // プレビューモード出ない場合は undefined が入ってくる
  const isPreview = !!context.preview

  const blog = await microcmsClient.get<Blog>({
    endpoint: `blog/${id}`,
    queries: {
      draftKey
    }
  })

  const categories = await client.get('categories')

  // シンタックスハイライト, 目次作成処理
  const parsedDom = preProcessingDom(blog.body)
  blog.body = parsedDom.body

  return {
    props: {
      blog,
      categories,
      isPreview,
      toc: parsedDom.toc
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogId: NextPage<Props> = ({ blog, categories, isPreview, toc }) => {
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
        <Content blog={blog} toc={toc} isPreview={isPreview} />
      </Layout>
    </>
  )
}

export default BlogId
