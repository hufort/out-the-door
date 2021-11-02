const EIGHT_PIXEL_SCALE = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80]
const ALIGNMENT = ['center', 'end', 'start']
const DISTRIBUTION = ALIGNMENT.concat([
  'space-around',
  'space-between',
  'space-evenly',
  'stretch',
])

export default {
  alignment: ALIGNMENT,
  animation: {
    easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  },
  breakpoints: ['544px', '768px', '1012px', '1280px'],
  boxShadow: [
    'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;',
    'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
    'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
  ],
  colors: {
    blue: '#4682BF',
    green: '#556B2F',
    orange: 'FF7F50',
    red: '#FF6347',
    white: '#FFFFFF',
    whiteSmoke: '#F5F5F5',
    yellow: '#FFD700',
    text: '#3D3D3D',
    textSecondary: '#7A7A7A',
  },
  distribution: DISTRIBUTION,
  fonts: {
    normal:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    semibold: 500,
    bold: 600,
  },
  gap: EIGHT_PIXEL_SCALE,
  sizes: EIGHT_PIXEL_SCALE,
  space: EIGHT_PIXEL_SCALE,
}
