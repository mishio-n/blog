import dayjs from 'dayjs'
import Image from 'next/image'
import { useWindowSize } from 'react-use'
import clockIcon from '~/public/clock.svg'
import { Blog } from '~/schema'
import { CategoryItem } from '../CategoryItem'
import { Toc } from '../Toc'
import styles from './content.module.scss'

type Props = {
  blog: Blog
  contents: string
  toc: { id: string; name: string; text: string }[]
  isPreview: boolean
}

export const Content: React.FC<Props> = ({
  blog,
  contents,
  toc,
  isPreview
}) => {
  const { width } = useWindowSize()

  return (
    <>
      <div className="mb-5">
        <Image
          src={`${blog.ogimage.url}`}
          alt=""
          width={
            width > 1160 ? 820 : width > 820 ? 740 : width > 768 ? 728 : 320
          }
          height={
            width > 1160 ? 461 : width > 820 ? 416 : width > 768 ? 410 : 180
          }
          layout="fixed"
          placeholder="blur"
          blurDataURL={blog.ogimage.url}
          className={styles.image}
        />
      </div>
      <main className="w-full">
        {isPreview && (
          <p className="text-sm text-gray-700"> プレビューモードです</p>
        )}
        <h1 className="block mb-5 text-4xl font-bold text-gray-900">
          {blog.title}
        </h1>
        <div className="flex items-center mt-2 mr-5 text-gray-500 whitespace-nowrap">
          <Image src={clockIcon} alt="時計アイコン" width={20} height={20} />
          <span className="ml-2">
            公開日:
            {dayjs(blog.publishedAt).format('YYYY/MM/DD')}
          </span>
        </div>
        <div className="flex items-center mt-2 mr-5 text-gray-500 whitespace-nowrap">
          <Image src={clockIcon} alt="時計アイコン" width={20} height={20} />
          <span className="ml-2">
            更新日:
            {dayjs(blog.updatedAt).format('YYYY/MM/DD')}
          </span>
        </div>

        <div className="mt-2">
          {blog.categories.map((category, i) => (
            <CategoryItem
              category={category}
              key={category.id}
              requiredMarginLeft={i !== 0}
            />
          ))}
        </div>

        {blog.toc_visible && <Toc toc={toc} />}
        <div
          dangerouslySetInnerHTML={{
            __html: contents
          }}
          className={styles.blog}
        ></div>
      </main>
    </>
  )
}
