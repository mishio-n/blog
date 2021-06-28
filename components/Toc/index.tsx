import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { Link as ScrollLink } from 'react-scroll'
import styles from './toc.module.scss'

type Props = {
  toc: {
    id: string
    name: string
    text: string
  }[]
}

export const Toc: React.FC<Props> = ({ toc }) => {
  const { width } = useWindowSize(800)
  const [headerHeight, setHeaderHeight] = useState(60)

  useEffect(() => {
    const header = window.document.getElementById('header')
    if (header) {
      setHeaderHeight(header.clientHeight)
    }
  }, [width])

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>目次</h4>
      <ul>
        {toc.map((item) => (
          <li key={item.id} className={styles.list}>
            <ScrollLink to={item.id} offset={-headerHeight}>
              {item.text}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
