import Link from 'next/link'
import { range } from '~/libs/range'

type Props = {
  totalCount: number
  currentPageNumber: number
}

const PER_PAGE = 10

export const Pager: React.FC<Props> = ({ totalCount, currentPageNumber }) => {
  const pages = range(1, Math.ceil(totalCount / PER_PAGE))
  return (
    <ul className="flex flex-wrap items-center justify-center px-0 pt-20 pb-0">
      {pages.map((pageNumber, index) => (
        <li
          key={`page-${index}`}
          className={`w-10 h-10 m-3 bg-white rounded-5 ${
            currentPageNumber === pageNumber ? 'bg-blue-500' : ''
          }`}
        >
          <Link href={`/page/${[pageNumber]}`}>
            <a
              className={`flex justify-center items-center h-full ${
                currentPageNumber === pageNumber ? 'text-white' : ''
              }`}
            >
              {pageNumber}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
