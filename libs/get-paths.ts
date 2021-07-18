import { client } from './client'
import { range } from './range'

const PER_PAGE = 10

export const getAllBlogPaths = async () => {
  const blogs = await client.get('blog')
  return blogs.contents.map((content) => `/${content.id}`)
}

export const getAllCategoryPaths = async () => {
  const categories = await client.get('categories')
  const paths = await Promise.all(
    categories.contents.map((category) =>
      client
        .get('blog', {
          queries: { filters: `categories[contains]${category.id}`, limit: 1 }
        })
        .then(({ totalCount }) =>
          range(1, Math.ceil(totalCount / PER_PAGE)).map(
            (pageNumber) => `/category/${category.id}/page/${pageNumber}`
          )
        )
    )
  )
  return paths.flat()
}

export const getAllPagePaths = async () => {
  const blogs = await client.get('blog')
  return range(1, Math.ceil(blogs.totalCount / PER_PAGE)).map(
    (pageNumber) => `/page/${pageNumber}`
  )
}
