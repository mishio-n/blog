import classNames from 'classnames'
import Link from 'next/link'
import { Blog } from '~/schema'
import styles from './articles.module.scss'

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
                <picture>
                  <source
                    type="image/webp"
                    data-srcset={`${blog.ogimage.url}?w=670&fm=webp`}
                  />
                  <img
                    data-src={`${blog.ogimage.url}?w=670`}
                    alt="img"
                    className={classNames('lazyload', styles.opimage)}
                  />
                </picture>
                {blog.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
