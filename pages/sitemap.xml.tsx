import { GetServerSideProps, NextPage } from 'next'
import { generateSitemap } from '~/scripts/generate-sitemap-xml'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = await generateSitemap()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate') // 24時間のキャッシュ
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {}
  }
}

const SitemapPage: NextPage = () => null
export default SitemapPage
