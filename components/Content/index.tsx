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
      <div className={styles.ogimageWrap}>
        <picture>
          <source
            media="(min-width: 1160px)"
            type="image/webp"
            srcSet={`${blog.ogimage.url}?w=820&fm=webp, ${blog.ogimage.url}?w=1640&fm=webp 2x`}
          />
          <source
            media="(min-width: 820px)"
            type="image/webp"
            srcSet={`${blog.ogimage.url}?w=740&fm=webp, ${blog.ogimage.url}?w=1480&fm=webp 2x`}
          />
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet={`${blog.ogimage.url}?w=728&fm=webp, ${blog.ogimage.url}?w=1456&fm=webp 2x`}
          />
          <source
            media="(max-width: 768px)"
            type="image/webp"
            srcSet={`${blog.ogimage.url}?w=375&fm=webp, ${blog.ogimage.url}?w=750&fm=webp 2x`}
          />
          <Image
            src={`${blog.ogimage.url}`}
            alt=""
            width={820}
            height={410}
            placeholder="blur"
            blurDataURL={blog.ogimage.url}
          />
        </picture>
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
