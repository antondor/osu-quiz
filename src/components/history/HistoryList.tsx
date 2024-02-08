import React from 'react'
import { MapHistories } from '../../Hooks/useMapsHistory'
import { LazyImage } from '../LazyImage'
type Props = {
  items: MapHistories[]
}
export const HistoryList: React.FC<Props> = (props) => {
  return (
    <div className='history__list'>
      {props.items.map((item, index) => (
        <div key={index} className='history__item'>
          {item.url && (
            <a href={item.mapUrl || ''} target='_blank' rel='noreferrer'>
              <LazyImage src={item.url} className='history__img' />
            </a>
          )}
          {item.answers.map((answer, index) => (
            <span key={index} className={`button-common history__item--answer ${answer.success ? 'history__item--success' : 'history__item--fail'}`}>
              {answer.title}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
