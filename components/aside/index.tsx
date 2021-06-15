import styles from './aside.module.scss'

const Aside: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <p>著者紹介</p>
      <p>検索</p>
      <p>カテゴリー一覧</p>
      <p>人気の記事</p>
    </aside>
  )
}

export default Aside
