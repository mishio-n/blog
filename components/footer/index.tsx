import styles from './footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>© mishio</p>
    </footer>
  )
}

export default Footer
