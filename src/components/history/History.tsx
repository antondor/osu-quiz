import React, { useEffect, useState } from 'react'
import useMapsHistory, { MapHistories } from '../../Hooks/useMapsHistory'
import { HistoryList } from './HistoryList'
import './history.scss'

const History: React.FC = () => {
  const mapHistory = useMapsHistory()
  const [history, setHistory] = useState<MapHistories[] | null | undefined>([])

  useEffect(() => {
    setHistory(mapHistory.history)
  }, [mapHistory.history])
  function onClearHistory() {
    mapHistory.clearHistory()
  }
  return (
    <div className='history'>
      <div className='history__header'>
        <div className={`history__title ${history?.length ? '' : 'history__title--empty'}`}>Play History</div>
        {history?.length && (
          <button className='button-common' onClick={onClearHistory}>
            Clear history
          </button>
        )}
      </div>
      <div className='history__body'>
        {history && history.length && <HistoryList items={history} />}
        {(!history || !history?.length) && <span>No history yet</span>}
      </div>
    </div>
  )
}

export default History
