import React from 'react'
import { css } from '@emotion/react'

export const Stack = ({
  alignment = 'start',
  as: As = 'div',
  axis,
  children,
  className,
  distribution = 'start',
  gap,
  grow,
  innerRef,
  margin,
  padding,
  onMouseEnter,
  onMouseLeave,
  ...styleProps
}) => {
  let flexDirection

  switch (axis) {
    case 'horizontal':
      flexDirection = 'row'
      break
    case 'vertical':
      flexDirection = 'column'
      break
    default:
      flexDirection = 'column'
      break
  }

  const flexGrow = grow ? (typeof grow === 'boolean' ? 1 : grow) : 0

  const Stack = css({
    alignItems: alignment,
    display: 'flex',
    flexDirection,
    flexGrow,
    gap,
    justifyContent: distribution,
    margin,
    padding,
    ...styleProps,
  })

  return (
    <As
      className={className}
      css={Stack}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={innerRef}
    >
      {children}
    </As>
  )
}
