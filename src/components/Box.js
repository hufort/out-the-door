import styled from '@emotion/styled'
import { border, color, layout, space, system } from 'styled-system'

const StyledComponent = styled('div')(
  border,
  color,
  layout,
  space,
  { boxSizing: 'border-box' },
  system({
    boxShadow: {
      property: 'boxShadow',
      scale: 'boxShadow',
    },
    cursor: true,
  })
)

export const Box = ({ innerRef, ...props }) => (
  <StyledComponent ref={innerRef} {...props} />
)
