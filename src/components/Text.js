import styled from '@emotion/styled'
import { system, typography } from 'styled-system'

export const Text = styled('p')(
  typography,
  system({
    color: {
      property: 'color',
      scale: 'color',
    },
    font: {
      property: 'fontFamily',
      scale: 'font',
    },
    size: {
      property: 'fontSize',
      scale: 'fontSize',
    },
    weight: {
      property: 'fontWeight',
      scale: 'fontWeight',
    },
  })
)

Text.defaultProps = { font: 'sans', color: 'text' }
