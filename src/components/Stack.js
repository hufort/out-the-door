import styled from '@emotion/styled'
import { flex, system } from 'styled-system'
import { Box } from '.'

const AXIS = {
  horizontal: 'row',
  vertical: 'column',
}

export const Stack = styled(Box)(
  {
    display: 'flex',
    minWidth: 0,
  },
  system({
    alignment: {
      property: 'alignItems',
      scale: 'alignment',
    },
    axis: {
      property: 'flexDirection',
      transform: (axis) => AXIS[axis],
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
  flex
)

Stack.defaultProps = { axis: 'vertical' }
