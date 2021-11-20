import styled from '@emotion/styled'
import { system, variant } from 'styled-system'
import { Box } from '.'

export const Separator = styled(Box)(
  system({
    color: {
      property: 'backgroundColor',
      scale: 'color',
    },
  }),
  variant({
    variants: {
      horizontal: {
        height: '1px',
        width: '100%',
      },
      vertical: {
        height: '100%',
        width: '1px',
      },
    },
  })
)

Separator.defaultProps = { color: 'separator' }
