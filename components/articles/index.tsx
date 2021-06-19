import Image from 'next/image'
import Link from 'next/link'
import { Blog } from '~/schema'

type Props = {
  blogs: Blog[]
}

export const Articles: React.FC<Props> = ({ blogs }) => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>
                <Image
                  src={blog.ogimage.url}
                  alt="Thumbnail Image"
                  className={'rounded-5 w-80 h-44  sm:w-full sm:h-auto'}
                  loading="lazy"
                  width={100}
                  height={100}
                  blurDataURL={blog.ogimage.url}
                  placeholder="blur"
                />
                {blog.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
