import Link from 'next/link'
import { range } from '~/libs/range'

type Props = {
  totalCount: number
}

const PER_PAGE = 10

export const Pagination: React.FC<Props> = ({ totalCount }) => {
  const pages = range(1, Math.ceil(totalCount / PER_PAGE))
  return (
    <ul>
      {pages.map((pageNumber, index) => (
        <li key={`page-${index}`}>
          <Link href={`/blog/page/${[pageNumber]}`}>
            <a>{pageNumber}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
