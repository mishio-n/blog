import { Blog } from '~/schema'
import { Toc } from '../Toc'
import styles from './content.module.scss'
import Image from 'next/image'

type Props = {
  blog: Blog
  toc: { id: string; name: string; text: string }[]
  isPreview: boolean
}

export const Content: React.FC<Props> = ({ blog, toc, isPreview }) => {
  return (
    <>
      <div>
        <Image
          src={`${blog.ogimage.url}`}
          alt=""
          width={820}
          height={431}
          layout="fixed"
          placeholder="blur"
          blurDataURL={blog.ogimage.url}
          className={styles.image}
        />
      </div>
      {blog.toc_visible && <Toc toc={toc} />}
      <main className="w-full">
        {isPreview && (
          <p className="text-sm text-gray-700"> プレビューモードです</p>
        )}
        <h1 className="mb-5">{blog.title}</h1>
        <p className="mb-10">{blog.publishedAt}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`
          }}
          className={styles.blog}
        ></div>
      </main>
    </>
  )
}
