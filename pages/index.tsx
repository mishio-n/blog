import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Articles } from '~/components/articles'
import { client } from '~/libs/client'
import { generateTitle, OG_TITLE } from '~/libs/meta'
import { Blogs } from '~/schema'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const data = await client.get<Blogs>({ endpoint: 'blog' })

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
    </>
  )
}

export default Home
