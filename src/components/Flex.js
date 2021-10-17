import React from 'react'
import { css } from '@emotion/react'

export const Flex = ({
  children,
  axis,
  alignment = 'start',
  distribution = 'start',
  gap,
  padding,
  margin,
  ...styleProps
}) => {
  let flexDirection = 'column'

  switch (axis) {
    case 'vertical':
      flexDirection = 'column'
      break
    case 'horizontal':
      flexDirection = 'row'
      break
  }

  const styles = css({
    alignItems: alignment,
    display: 'flex',
    flexDirection,
    gap,
    justifyContent: distribution,
    margin,
    padding,
    ...styleProps,
  })

  return <div css={styles}>{children}</div>
}
