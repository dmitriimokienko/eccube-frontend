import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import EccubeLogo from '@/public/icons/eccube-logo-white.svg'
import { SxProps } from '@mui/material/styles'

export interface ISeparateLayoutProps {
  children: ReactNode
  Header?: ReactNode
  Sidebar?: ReactNode
  SideBarProps?: {
    sx?: SxProps
  }
  WrapperProps?: {
    sx?: SxProps
  }
  HeaderProps?: {
    sx?: SxProps
  }
  MainProps?: {
    sx?: SxProps
  }
}

export const SEPARATE_LAYOUT_SIDEBAR_WIDTH = 360
export const SEPARATE_LAYOUT_HEADER_HEIGHT = 72
export const SEPARATE_LAYOUT_CONTENT_WIDTH = 480

export function SeparateLayout(props: ISeparateLayoutProps) {
  const {
    children,
    Header = null,
    Sidebar = null,
    WrapperProps = {},
    HeaderProps = {},
    SideBarProps = {},
    MainProps = {},
  } = props

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px auto`,
        gridTemplateRows: '72px auto',
        gridTemplateAreas: `
        "sidebar header"
        "sidebar main"
        `,
        width: '100%',
        height: '100vh',
        backgroundColor: '#F6F7F8', // '#f1eeee',
        ...(WrapperProps?.sx || {}),
      }}
    >
      {/* header */}
      <Box
        component="header"
        sx={{
          gridArea: 'header',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 1,
          width: '100%',
          padding: '32px',
          ...(HeaderProps?.sx || {}),
        }}
      >
        {Header}
      </Box>

      {/* sidebar */}
      <Box
        component="aside"
        sx={{
          gridArea: 'sidebar',
          padding: '32px',
          ...(SideBarProps?.sx || {}),
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <EccubeLogo />
          {Sidebar}
        </Box>
      </Box>

      {/* main */}
      <Box sx={{ gridArea: 'main' }}>
        <Box
          component="main"
          sx={{
            zIndex: 1,
            margin: '0 auto',
            marginTop: '40px',
            paddingRight: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px`,
            boxSizing: 'content-box',
            maxWidth: `${SEPARATE_LAYOUT_CONTENT_WIDTH}px`,
            ...(MainProps?.sx || {}),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
