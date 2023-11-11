import './App.css';
import Header from './components/header/header.jsx';
import styles from './App.module.css';
import Content from './components/content/content.jsx';

function App() {

  return (
    <div className={styles.appWrapper}>
        <div className={styles.app}>
          <Header />
          <Content />
        </div>
    </div>
  )
}

export default App
