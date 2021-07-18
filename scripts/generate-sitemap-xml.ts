import globby from 'globby'
import path from 'path'
import { format, resolveConfig } from 'prettier'
import {
  getAllBlogPaths,
  getAllCategoryPaths,
  getAllPagePaths
} from '~/libs/get-paths'

export const generateSitemap = async () => {
  const prettierConfig = await resolveConfig(
    path.join(__dirname, '.prettierrc')
  )

  const paths = await globby([
    'pages/**/*.tsx',
    '!pages/_*.tsx',
    '!pages/**/[*.tsx',
    '!pages/sitemap.xml.tsx',
    '!pages/404.tsx',
    '!pages/api'
  ])

  const [blogPaths, categoryPaths, pagePaths] = await Promise.all([
    getAllBlogPaths(),
    getAllCategoryPaths(),
    getAllPagePaths()
  ])

  const returnUrlXml = (route: string) => `
  <url>
      <loc>${process.env.NEXT_PUBLIC_SITE_URL + route}</loc>
  </url>`

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${paths
              .map((path) => {
                const pathName = path
                  .replace('pages', '')
                  .replace('index', '')
                  .replace('.tsx', '')
                  .replace(/\/$/, '')
                const route = pathName === '/' ? '' : pathName
                return returnUrlXml(route)
              })
              .join('')}
              ${blogPaths.map((path) => returnUrlXml(path)).join('')}
              ${categoryPaths.map((path) => returnUrlXml(path)).join('')}
              ${pagePaths.map((path) => returnUrlXml(path)).join('')}
        </urlset>
    `

  const formatted = format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  return formatted
}
