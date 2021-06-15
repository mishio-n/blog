import { Blogs } from '~/schema'
import { Articles } from '../articles'
import Aside from '../aside'
import { Pager } from '../pager'
import styles from './layout.module.scss'

type Props = {
  blogs: Blogs
}

const Layout: React.FC<Props> = ({ blogs }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Articles blogs={blogs.contents} />
        <Pager totalCount={blogs.totalCount} />
      </div>
      <Aside />
    </div>
  )
}

export default Layout
