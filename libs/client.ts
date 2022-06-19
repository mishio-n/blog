import { createClient } from 'microcms-js-sdk';
import { GetRequest } from 'microcms-js-sdk/dist/cjs/types';
import { Authors, Blogs, Categories } from '~/schema';

export const microcmsClient = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || '',
});

type Options = Omit<GetRequest, 'endpoint'>;
type Endpoints = 'authors' | 'blog' | 'categories';
type getMicroCMSContents = {
  get(endpoint: 'authors', options?: Options): Promise<Authors>;
  get(endpoint: 'blog', options?: Options): Promise<Blogs>;
  get(endpoint: 'categories', options?: Options): Promise<Categories>;
};

export const client: getMicroCMSContents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(endpoint: Endpoints, options?: Options): any {
    if (endpoint === 'authors') {
      return microcmsClient.get<Authors>({ endpoint, ...options });
    }
    if (endpoint === 'blog') {
      return microcmsClient.get<Blogs>({ endpoint, ...options });
    }
    if (endpoint === 'categories') {
      return microcmsClient.get<Categories>({ endpoint, ...options });
    }
  },
};
