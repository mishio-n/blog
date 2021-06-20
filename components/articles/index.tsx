/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { Blog } from '~/schema'
import clockIcon from '~/public/schedule_black_48dp.svg'
import dayjs from 'dayjs'

type Props = {
  blogs: Blog[]
}

export const Articles: React.FC<Props> = ({ blogs }) => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="px-0 py-5">
            <Link href={`/blog/${blog.id}`}>
              <a className="flex justify-between <800:flex-col">
                <img
                  src={blog.ogimage.url}
                  alt="Thumbnail Image"
                  className={
                    'rounded-5 w-80 h-44 sm:w-full sm:h-auto >800:w-thumbnail >800:h-thumbnail'
                  }
                />
                <dl className="flex-1 ml-10">
                  <dt className="text-xl font-bold <800:mt-3">{blog.title}</dt>
                  <dd>
                    <div>
                      {blog.categories.map((category) => (
                        <span
                          key={category.name}
                          className="inline-block px-2 mx-0 text-sm text-purple-500 border border-purple-500 border-solid rounded py-0.5 whitespace-nowrap mt-2.5 mb-0.5"
                        >
                          {category.name}
                        </span>
                      ))}
                      <div className="flex items-center px-0 pb-10 pt-2.5">
                        <span className="inline-flex items-center mr-5 text-gray-500 whitespace-nowrap">
                          <Image
                            src={clockIcon}
                            alt="時計アイコン"
                            width={24}
                            height={24}
                            className="text-gray-500"
                          />
                          <span className="ml-2">
                            公開日:
                            {dayjs(blog.publishedAt).format('YYYY/MM/DD')}
                          </span>
                        </span>
                        <span className="inline-flex items-center mr-5 text-gray-500 whitespace-nowrap">
                          <Image
                            src={clockIcon}
                            alt="時計アイコン"
                            width={24}
                            height={24}
                          />
                          <span className="ml-2">
                            更新日:
                            {dayjs(blog.updatedAt).format('YYYY/MM/DD')}
                          </span>
                        </span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
