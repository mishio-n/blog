import styles from './header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import icon from '~/public/icon-192x192.png'

const links = [
  { href: '/about', text: 'プロフィール' },
  { href: '/', text: '記事一覧' }
]

const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <Link href="/">
            <a>
              <Image
                src={icon}
                className={styles.logoImg}
                alt="logo"
                width={28}
                height={28}
              />
              <span>mihioブログ</span>
            </a>
          </Link>
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
