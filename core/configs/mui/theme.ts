import { createTheme } from '@mui/material/styles'
import { components } from './components'
import { Montserrat, Roboto_Condensed } from 'next/font/google'

const roboto = Roboto_Condensed({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
})
// for Headers
const montserrat = Montserrat({
  weight: ['500'],
  style: ['normal'],
  subsets: ['latin'],
})

export const muiTheme = createTheme({
  breakpoints: {
    values: {
      // mobile
      xs: 0,
      sm: 481,
      // tablet
      md: 961,
      // desktop
      lg: 1441,
      // desktop Full-HD
      xl: 1921,
    },
  },
  components,
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 16,
  },
  palette: {
    custom: {
      blue: {
        0: '#4ac1f5', // primary
        1: '#33ace0', // primary hover
        2: '#1ab1f2', // primary pressed
      },
    },
  },
})
