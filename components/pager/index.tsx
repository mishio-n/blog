import Link from 'next/link'
import { range } from '~/libs/range'
import styles from './pager.module.scss'

type Props = {
  totalCount: number
}

const PER_PAGE = 10

export const Pager: React.FC<Props> = ({ totalCount }) => {
  const pages = range(1, Math.ceil(totalCount / PER_PAGE))
  return (
    <ul className={styles.pager}>
      {pages.map((pageNumber, index) => (
        <li key={`page-${index}`} className={styles.page} data-is-active={true}>
          <Link href={`/blog/page/${[pageNumber]}`}>
            <a>{pageNumber}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}