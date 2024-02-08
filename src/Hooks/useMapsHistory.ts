import { useEffect, useState } from 'react'
//TODO: Probably can be refactored
export type MapHistories = {
  url: string | null
  mapUrl: string | null
  answers: {
    title: string
    success: boolean
  }[]
}

export type MapHistory = {
  url: string | null
  mapUrl: string | null
  answer: {
    title: string
    success: boolean
  }
}

const HISTORY_KEY = 'mapHistory'

export default function useMapsHistory() {
  const [history, setHistory] = useState<MapHistories[] | null>()

  function parseHistory() {
    const _history = localStorage.getItem(HISTORY_KEY)

    if (!_history) {
      setHistory([])
      localStorage.setItem(HISTORY_KEY, JSON.stringify([]))
      return
    }

    try {
      const parsedHistory = JSON.parse(_history) as MapHistories[]
      setHistory(parsedHistory)
    } catch (error) {
      console.error('There was a problem parsing map history from localStorage, value is probably not object')
    }
  }

  function createHistory(history: MapHistory): MapHistories {
    return {
      url: history.url,
      mapUrl: history.mapUrl,
      answers: [history.answer],
    }
  }

  function getMapHistory() {
    parseHistory()
    return history
  }

  function setMapHistory(hst: MapHistory) {
    if (history && Array.isArray(history) && history.length) {
      const state = [...history]
      const foundHistory = state.find((item) => item.url === hst.url)

      if (!foundHistory) {
        setHistory([...state, createHistory(hst)])
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
        return
      }

      foundHistory.answers.push(hst.answer)
      setHistory([...state])
    }

    if (Array.isArray(history) && !history.length) {
      setHistory([createHistory(hst)])
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }

  function clearHistory() {
    localStorage.removeItem(HISTORY_KEY)
  }
  useEffect(() => {
    setHistory(history)
  }, [history])

  useEffect(() => {
    parseHistory()
  }, [])

  return {
    getMapHistory,
    setMapHistory,
    clearHistory,
    history,
  }
}
