import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { border, color, compose, layout, space, system } from 'styled-system'

const StyledComponent = styled('div', { shouldForwardProp })(
  { boxSizing: 'border-box' },
  system({
    boxShadow: {
      property: 'boxShadow',
      scale: 'boxShadow',
    },
    cursor: true,
  }),
  compose(border, space, color, layout)
)

export const Box = ({ innerRef, ...props }) => (
  <StyledComponent ref={innerRef} {...props} />
)
