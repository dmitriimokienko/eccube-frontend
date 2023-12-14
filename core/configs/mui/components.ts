import { Components, Theme } from '@mui/material/styles'

export const components: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      size: 'medium',
      fullWidth: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({}),
    },
    variants: [
      // primary
      {
        props: { variant: 'contained' },
        style: ({ theme }) => ({
          padding: '12px 24px',
          borderRadius: '8px',
          // backgroundColor: theme.palette.color.brand.brand70,
          // color: theme.palette.color.white.const,
          // boxShadow: `0px 4px 12px 0px rgba(242, 116, 94, 0.25)`,
          // '&:hover': {
          //   backgroundColor: theme.palette.color.brand.hover,
          //   boxShadow: `0px 4px 16px 0px rgba(242, 116, 94, 0.50)`,
          // },
          // '&:active': {
          //   backgroundColor: theme.palette.color.brand.pressed,
          //   boxShadow: `0px 4px 16px 0px rgba(242, 116, 94, 0.50)`,
          // },
          // '&:disabled': {
          //   color: theme.palette.color.white.const,
          //   backgroundColor: theme.palette.color.gray.gray120,
          //   boxShadow: 'none',
          //   cursor: 'not-allowed',
          // },
        }),
      },
      // TODO: customize other variants
    ],
  },

  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'medium',
      fullWidth: true,
      helperText: ' ',
      autoComplete: 'off',
      placeholder: 'Please enter text...',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        marginTop: '8px', // special marginTop for outline inputs
      }),
    },
  },
}
