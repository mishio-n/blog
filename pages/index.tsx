import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Articles } from '~/components/articles'
import Header from '~/components/header'
import { Pagination } from '~/components/pagination'
import { client } from '~/libs/client'
import { generateTitle, OG_TITLE } from '~/libs/meta'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const data = await client.get('blog', {
    queries: { offset: 0, limit: 10 }
  })

  return {
    props: {
      blogs: data
    }
  }
}

const Home: NextPage<Props> = ({ blogs }) => {
  const pagetitle = generateTitle()
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <div>
        <Articles blogs={blogs.contents}></Articles>
      </div>
      <Pagination totalCount={blogs.totalCount} />
    </>
  )
}

export default Home
