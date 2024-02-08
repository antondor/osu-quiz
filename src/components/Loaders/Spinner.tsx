import React from "react"
import './loaders.css'

type Props = {
  style?:React.HTMLAttributes<HTMLDivElement>['style']
}
export const Spinner:React.FC<Props> = (props:Props) => {

  return (
    <span className="loader" style={props.style}></span>
  )
}
