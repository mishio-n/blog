import { Blogs } from '~/schema'
import { Articles } from '../articles'
import Aside from '../aside'
import { Pager } from '../pager'

type Props = {
  blogs: Blogs
  currentPageNumber: number
}

const Layout: React.FC<Props> = ({ blogs, currentPageNumber }) => {
  return (
    <div className="mx-auto mt-5 mb-0 >1024:flex >1024:justify-between >1024:w-lg md:w-md sm:mx-0 sm:py-0 sm:px-5">
      <div className="lg:w-md">
        <Articles blogs={blogs.contents} />
        <Pager
          totalCount={blogs.totalCount}
          currentPageNumber={currentPageNumber}
        />
      </div>
      <Aside />
    </div>
  )
}

export default Layout
