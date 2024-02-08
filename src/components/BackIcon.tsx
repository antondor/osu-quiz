import React from 'react'
type Props = {
  width?: string
  height?: string
}
const BackIcon: React.FC<Props> = (props: Props) => {
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'>
      <path fill='#000000' d='M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z' />
      <path fill='#000000' d='m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z' />
    </svg>
  )
}

BackIcon.defaultProps = { width: '1rem', height: '1rem' }

export default BackIcon
