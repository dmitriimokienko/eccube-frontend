'use client'
import Box from '@mui/material/Box'
import {
  ISeparateLayoutProps,
  SEPARATE_LAYOUT_SIDEBAR_WIDTH,
  SeparateLayout,
} from '../SeparateLayout'
import Typography from '@mui/material/Typography'
import EccubeBg from '@/public/images/eccube_bg.jpeg'
import { SidebarRandomContent, getRandomInt } from './lib/utils'

export interface IOnboardingLayoutProps extends ISeparateLayoutProps {}

export function OnboardingLayout(props: IOnboardingLayoutProps) {
  const { children } = props

  const random = getRandomInt()
  const sidebar = SidebarRandomContent[random]

  return (
    <SeparateLayout
      Sidebar={
        <Box pt={6}>
          <Typography variant="h5" component="h1" color="#fff">
            {sidebar?.title ?? {}}
          </Typography>
          <Typography variant="body1" color="#fff" mt={5}>
            {sidebar?.description ?? {}}
          </Typography>
        </Box>
      }
      SideBarProps={{
        sx: {
          backgroundImage: `url(${EccubeBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px`,
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      {children}
    </SeparateLayout>
  )
}
