import React from 'react'
import './App.css'
import Header from './components/header/header.jsx'
import styles from './App.module.css'
import Content from './components/content/content.tsx'

function App() {
  return (
    <div className={`${styles.app} app-container`}>
      <Header />
      <Content />
    </div>
  )
}

export default App
