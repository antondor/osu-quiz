import React from 'react'
import { Link } from 'react-router-dom'
import './startPage.scss'
import styles from '../content/content.module.css'
import History from '../history/History'
const StartPage: React.FC = () => {
  return (
    <div className='start-page'>
      <Link to='/quiz' className={`${styles.buttonNewMaps} start-page__start`}>
        Start
      </Link>
      <History />
    </div>
  )
}

export default StartPage
