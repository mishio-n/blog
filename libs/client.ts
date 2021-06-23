import { createClient } from 'microcms-js-sdk'
import { GetRequest } from 'microcms-js-sdk/dist/cjs/types'
import { Authors, Blogs, Categories } from '~/schema'

export const microcmsClient = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY
})

type Options = Omit<GetRequest, 'endpoint'>
type Endpoints = 'author' | 'blog' | 'categories'
type getMicroCMSContents = {
  get(endpoint: 'author', options?: Options): Promise<Authors>
  get(endpoint: 'blog', options?: Options): Promise<Blogs>
  get(endpoint: 'categories', options?: Options): Promise<Categories>
}

export const client: getMicroCMSContents = {
  get(endpoint: Endpoints, options?: Options): any {
    if (endpoint === 'author') {
      return microcmsClient.get<Authors>({ endpoint, ...options })
    }
    if (endpoint === 'blog') {
      return microcmsClient.get<Blogs>({ endpoint, ...options })
    }
    if (endpoint === 'categories') {
      return microcmsClient.get<Categories>({ endpoint, ...options })
    }
  }
}
