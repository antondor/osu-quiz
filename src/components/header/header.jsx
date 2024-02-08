import styles from './header.module.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={`${styles.header} container`}>
        <div className={styles.title}>
          <Link to='/'>Maiev&aposs osu! Quiz</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
