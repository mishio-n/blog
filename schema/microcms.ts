// microCMSのコンテンツが持つメタデータ
type MetaData = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// microCMSのリスト形式のスキーマはキーが固定なので使い回す
type ListSchema<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// microCMSのリスト形式のコンテンツが持つメタデータ
type ListMetaData = MetaData & {
  id: string;
};

export type TextField = string;
export type TextArea = string;
export type RichEdit = string;
export type Image = {
  url: string;
  width: number;
  height: number;
};

export type Markdown = TextArea;
export type HTML = TextArea;

export type Author = ListMetaData & {
  name: TextField;
  profile: RichEdit;
  image: Image;
};

export type Category = ListMetaData & {
  name: TextField;
};

export type BlogContent = {
  fieldId: 'richEditor' | 'html' | 'markdown';
  content: RichEdit | HTML | Markdown;
};

export type BlogContents = BlogContent[];

export type Blog = ListMetaData & {
  title: TextField;
  categories: Category[];
  toc_visible: boolean;
  /**
   * HTML contents
   */
  body: BlogContents;
  description: TextField;
  ogimage: Image;
  writer: Author;
  related_blogs: Blog[];
};

export type Authors = ListSchema<Author>;
export type Categories = ListSchema<Category>;
export type Blogs = ListSchema<Blog>;
