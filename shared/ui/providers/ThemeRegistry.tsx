'use client'
import { ReactNode, useState } from 'react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { muiTheme } from '@/core/configs/mui/theme'

interface StylisElement {
  type: string
  value: string
  props: Array<string> | string
  root: StylisElement | null
  parent: StylisElement | null
  children: Array<StylisElement> | string
  line: number
  column: number
  length: number
  return: string
}

type StylisPluginCallback = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | void

type StylisPlugin = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | void

interface Options {
  nonce?: string
  stylisPlugins?: Array<StylisPlugin>
  key: string
  container?: Node
  speedy?: boolean
  /** @deprecate use `insertionPoint` instead */
  prepend?: boolean
  insertionPoint?: HTMLElement
}

export interface IThemeRegistryProps {
  children: ReactNode
  options: Options
}

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902

export default function ThemeRegistry(props: IThemeRegistryProps) {
  const { options, children } = props

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
