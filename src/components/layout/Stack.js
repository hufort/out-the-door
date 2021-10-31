import React from 'react'
import { css } from '@emotion/react'

export const Stack = ({
  alignment = 'start',
  as: As = 'div',
  axis,
  background,
  border,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  bottom,
  boxShadow,
  children,
  className,
  cursor,
  distribution = 'start',
  flex,
  flexShrink,
  gap,
  grow,
  height,
  innerRef,
  left,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  onMouseEnter,
  onMouseLeave,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  position,
  right,
  top,
  width,
  ...restProps
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

  const Stack = {
    alignItems: alignment,
    background,
    border,
    borderColor,
    borderRadius,
    borderStyle,
    borderWidth,
    bottom,
    boxShadow,
    cursor,
    display: 'flex',
    flex,
    flexDirection,
    flexGrow,
    flexShrink,
    gap,
    height,
    justifyContent: distribution,
    left,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    position,
    right,
    top,
    width,
  }

  return (
    <As
      className={className}
      css={Stack}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={innerRef}
      {...restProps}
    >
      {children}
    </As>
  )
}
