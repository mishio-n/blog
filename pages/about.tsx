import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '~/components/Layout'
import { client } from '~/libs/client'
import { generateTitle, OG_TITLE } from '~/libs/meta'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const categories = await client.get('categories')
  console.log(categories)

  return {
    props: {
      categories
    }
  }
}

const About: NextPage<Props> = ({ categories }) => {
  const pagetitle = generateTitle('プロフィール')
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <Layout categories={categories.contents}>
        <div>
          <h1>Mishio</h1>
          <h2>エンジニア</h2>
        </div>
      </Layout>
    </>
  )
}

export default About
