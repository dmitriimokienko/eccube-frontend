import { createTheme } from '@mui/material/styles'
import { components } from './components'

export const muiTheme = createTheme({
  breakpoints: {
    values: {
      // mobile
      xs: 0,
      sm: 481,
      // mobile: 481,
      // tablet
      md: 961,
      // tablet: 961,
      // desktop
      lg: 1441,
      // laptop: 1441,
      // desktop Full-HD
      xl: 1921,
      // desktop: 1921,
    },
  },
  components,
})
