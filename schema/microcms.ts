// microCMSのコンテンツが持つメタデータ
type MetaData = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

// microCMSのリスト形式のスキーマはキーが固定なので使い回す
type ListSchema<T> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

// microCMSのリスト形式のコンテンツが持つメタデータ
type ListMetaData = MetaData & {
  id: string
}

export type Author = ListMetaData & {
  name: string
  profile: string
  image: {
    url: string
    height: number
    width: number
  }
}

export type Category = ListMetaData & {
  name: string
}

export type Article = ListMetaData & {
  title: string
  categories: Category[]
  toc_visible: boolean
  /**
   * HTML contents
   */
  body: string
  description: string
  ogimage: {
    url: string
    height: number
    width: number
  }
  writer: Author
  related_blogs: Article[]
}

export type PopularArticles = MetaData & {
  articles: Article[]
}

export type Authors = ListSchema<Author>
export type Categoy = ListSchema<Category>
export type Articles = ListSchema<Article>
