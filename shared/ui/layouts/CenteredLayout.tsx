import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { ReactNode } from 'react'
import CubesBg from '@/public/images/centeredLayoutBg.jpg'

export interface ICenteredLayoutProps {
  children: ReactNode
}

export function CenteredLayout(props: ICenteredLayoutProps) {
  const { children } = props

  //   const { screenHeight } = useLayoutHeight()

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh', // screenHeight || '100vh',
        backgroundImage: `url(${CubesBg.src})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        '&:after': {
          content: '""',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        },
      }}
    >
      <Card
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 560,
          p: 4,
          m: 3,
          textAlign: 'center',
          color: 'text.primary',
          borderRadius: 1.5,
          zIndex: 1,
        }}
      >
        {children}
      </Card>
    </Box>
  )
}
