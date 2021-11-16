import styled from '@emotion/styled'
import { grid, system } from 'styled-system'
import { Box } from '.'

export const Grid = styled(Box)(
  { display: 'grid' },
  system({
    alignment: {
      property: 'alignItems',
      scale: 'alignment',
    },
    columns: {
      property: 'gridTemplateColumns',
    },
    distribution: {
      property: 'justifyContent',
      scale: 'distribution',
    },
    gap: {
      properties: ['gap', 'gridGap'],
      scale: 'gap',
    },
  }),
  grid
)
