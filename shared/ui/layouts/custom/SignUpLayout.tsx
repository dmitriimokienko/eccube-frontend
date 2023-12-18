'use client'
import Box from '@mui/material/Box'
import {
  ISeparateLayoutProps,
  SEPARATE_LAYOUT_SIDEBAR_WIDTH,
  SeparateLayout,
} from '../SeparateLayout'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import EccubeBg from '@/public/images/eccube_bg.jpeg'
import { SidebarRandomContent, getRandomInt } from './lib/utils'
import { useRouter } from 'next/navigation'

export interface ISignUpLayoutProps extends ISeparateLayoutProps {}

export function SignUpLayout(props: ISignUpLayoutProps) {
  const { children } = props

  const router = useRouter()

  const random = getRandomInt()
  const sidebar = SidebarRandomContent[random]

  return (
    <SeparateLayout
      Header={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '24px',
            height: '100%',
            width: '100%',
          }}
        >
          Have an Eccube account?
          <Button
            variant="contained"
            type="submit"
            fullWidth={false}
            size="small"
            onClick={() => {
              router.push('/login')
            }}
          >
            Log in
          </Button>
        </Box>
      }
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
