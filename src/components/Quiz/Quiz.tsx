import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './quiz.scss'
import AudioPlayer from '../audioPlayer/audioPlayer'
import { Spinner } from '../Loaders/Spinner'
import useMapsHistory from '../../Hooks/useMapsHistory'

type Beatmap = {
  artist: string
  beatmapset_id: string
  id: number
  title: string
}

const Quiz: React.FC = () => {
  const [beatMaps, setBeatmaps] = useState<Beatmap[]>([])
  const [currentBeatmap, setCurrentBeatmap] = useState<Beatmap | null>(null)
  const [selected, setSelected] = useState<string>('')
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [rightGuesses, setRightGuesses] = useState(0)
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const audioPlayerRef = useRef<AudioPlayer | null>()

  const { setMapHistory } = useMapsHistory()

  useEffect(() => {
    fetchRandomBeatmaps()
  }, [])

  useEffect(() => {
    if (Object.keys(beatMaps).length > 0) {
      const randomIndex = Math.floor(Math.random() * beatMaps.length)
      const randomBeatmap = beatMaps[randomIndex]
      setCurrentBeatmap(randomBeatmap)
      setIsCorrect(false)
    }
  }, [beatMaps])

  const fetchRandomBeatmaps = () => {
    return axios
      .get('http://localhost:3001/random-maps')
      .then((response) => {
        console.log('%c[DEBUG]:Response', 'color:violet')
        setBeatmaps(response.data)

        if (!isDataLoaded) setIsDataLoaded(true)
      })
      .catch((error) => {
        console.error('Error fetching random maps:', error.message)
      })
  }
  const onAnswerClick = (id: string, title: string) => {
    if (currentBeatmap && id === currentBeatmap.beatmapset_id) {
      setIsCorrect(true)
      setRightGuesses((count) => count + 1)
      audioPlayerRef?.current?.pause()
      setMapHistory({
        url: (currentBeatmap && `https://assets.ppy.sh/beatmaps/${currentBeatmap.beatmapset_id}/covers/cover.jpg`) || null,
        mapUrl: (currentBeatmap && `https://osu.ppy.sh/beatmapsets/${currentBeatmap.beatmapset_id}`) || null,
        answer: {
          title,
          success: true,
        },
      })
      fetchRandomBeatmaps()
    } else {
      setSelected(id)
      setWrongGuesses((count) => count + 1)
      setIsCorrect(false)
      setMapHistory({
        url: (currentBeatmap && `https://assets.ppy.sh/beatmaps/${currentBeatmap.beatmapset_id}/covers/cover.jpg`) || null,
        mapUrl: (currentBeatmap && `https://osu.ppy.sh/beatmapsets/${currentBeatmap.beatmapset_id}`) || null,
        answer: {
          title,
          success: false,
        },
      })
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement
    if (target.complete) {
      setIsImageLoaded(true)
    }
  }
  return (
    <>
      <div className='quiz'>
        {!isDataLoaded && <Spinner />}
        {isDataLoaded && currentBeatmap && (
          <>
            <div className='quiz__guesses'>
              <span>Right guesses: {rightGuesses}</span>
              <span>Wrong guesses: {wrongGuesses}</span>
            </div>
            <div className='quiz__player'>
              {!isImageLoaded && <Spinner />}
              <img
                src={`https://assets.ppy.sh/beatmaps/${currentBeatmap.beatmapset_id}/covers/cover.jpg`}
                className='quiz__image'
                style={{ visibility: isImageLoaded ? 'visible' : 'hidden' }}
                loading='lazy'
                onLoad={onImageLoad}
              />
              {isImageLoaded && currentBeatmap && (
                <div className='quiz__audio-controls'>
                  <AudioPlayer
                    src={`https://b.ppy.sh/preview/${currentBeatmap.beatmapset_id}.mp3`}
                    ref={(ref) => {
                      audioPlayerRef.current = ref
                    }}
                  />
                </div>
              )}
            </div>

            <div className='quiz__answers'>
              {beatMaps &&
                isImageLoaded &&
                beatMaps.map((item) => (
                  <button
                    className={`quiz__answer ${selected === item.beatmapset_id && isCorrect === false ? 'quiz__answer--incorrect' : ''}`}
                    key={item.id}
                    onClick={() => onAnswerClick(item.beatmapset_id, item.title)}
                  >
                    {item.artist + ` - ` + item.title}
                  </button>
                ))}
            </div>
          </>
        )}
      </div>

      {isCorrect && <h2 className='quiz__answer--correct'>Correct!</h2>}
    </>
  )
}

export default Quiz
