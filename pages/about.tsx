import Head from 'next/head'
import { Layout } from '~/components/layout'
import { generateTitle, OG_TITLE } from '~/libs/meta'

const About: React.FC = () => {
  const pagetitle = generateTitle('プロフィール')
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <Layout>
        <div>
          <h1>Mishio</h1>
          <h2>エンジニア</h2>
        </div>
      </Layout>
    </>
  )
}

export default About
