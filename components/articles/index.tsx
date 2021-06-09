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
            <Link href={`blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
