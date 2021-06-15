import styles from './header.module.scss'

const links = [
  { href: '/about', text: 'プロフィール' },
  { href: '/', text: '記事一覧' }
]

const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <a href="/">
            <img
              className={styles.logoImg}
              src="/icon-192x192.png"
              alt="logo"
            />
          </a>
        </h1>
        <div>
          <ul className={styles.lists}>
            {links.map((link) => (
              <li className={styles.list} key={link.text}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div className={styles.empty}></div>
    </>
  )
}

export default Header
