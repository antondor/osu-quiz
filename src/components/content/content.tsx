import React, { useEffect, useState } from 'react'
import styles from './content.module.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BackIcon from '../BackIcon'

const backButtonTest = /\//g
function Content() {
  const location = useLocation()
  const [isStartPage, setIsStartPage] = useState(true)
  const [loc, setLoc] = useState(location.pathname)
  const navigate = useNavigate()
  //TODO: Fix button appearing, i don't understand react's reactivity shit
  useEffect(() => {
    setLoc(() => location.pathname)
    if (!backButtonTest.test(loc)) {
      setIsStartPage(() => true)
      return
    }
    setIsStartPage(() => false)
  }, [location])

  return (
    <div className={`${styles.main} container`}>
      <div className={`${styles.mainWrapper} container`}>
        <div className={styles.mainToolbar}>
          {!isStartPage && (
            <button className='button-common' style={{ display: 'flex', alignItems: 'center', gap: '.2rem' }} onClick={() => navigate('/')}>
              <BackIcon width='1.5rem' height='1.5rem' />
              Back
            </button>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Content
