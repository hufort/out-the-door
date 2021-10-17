import React from 'react'
import { css } from '@emotion/react'

export const Flex = ({
  children,
  axis,
  alignment = 'start',
  distribution = 'start',
  gap,
  grow,
  padding,
  margin,
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

  const styles = css({
    alignItems: alignment,
    display: 'flex',
    flexDirection,
    gap,
    flexGrow,
    justifyContent: distribution,
    margin,
    padding,
    ...styleProps,
  })

  return <div css={styles}>{children}</div>
}
