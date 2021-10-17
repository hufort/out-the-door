import React from 'react'
import { css } from '@emotion/react'

export const Grid = ({
  children,
  columns,
  alignment = 'start',
  distribution = 'start',
  gap,
  padding,
  margin,
  ...styleProps
}) => {
  const childCount = React.Children.count(children)
  const gridTemplateColumns = columns ? columns : `repeat(${childCount}, 1fr)`

  const styles = css({
    alignItems: alignment,
    display: 'grid',
    gap,
    gridTemplateColumns,
    justifyContent: distribution,
    margin,
    padding,
    ...styleProps,
  })

  return <div css={styles}>{children}</div>
}
