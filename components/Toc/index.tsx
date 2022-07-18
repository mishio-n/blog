import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useWindowSize } from 'react-use';
import styles from './toc.module.scss';

export type TocItem = {
  id: string;
  name: string;
  text: string;
  tag: 'H1' | 'H2' | 'H3';
};

type Props = {
  toc: TocItem[];
};

export const Toc: React.FC<Props> = ({ toc }) => {
  const { width } = useWindowSize(800);
  const [headerHeight, setHeaderHeight] = useState(60);

  useEffect(() => {
    const header = window.document.getElementById('header');
    if (header) {
      setHeaderHeight(header.clientHeight);
    }
  }, [width]);

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>目次</h4>
      <ul>
        {toc.map((item) => (
          <li
            key={item.id}
            className={`${styles.list} ${styles[item.tag.toLowerCase()]}`}
          >
            <ScrollLink to={item.id} offset={-headerHeight}>
              {item.text}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
