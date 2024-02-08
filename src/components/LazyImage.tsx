import React, { useState } from 'react'
import { Spinner } from './Loaders/Spinner'

type Props = {
  src: string
} & React.HtmlHTMLAttributes<HTMLImageElement>

export const LazyImage: React.FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement
    if (target.complete) {
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && <Spinner />}
      <img className={props.className || ''} src={props.src} loading='lazy' onLoad={onImageLoad} />
    </>
  )
}
