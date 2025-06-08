import { AppShell } from '@mantine/core'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from 'src/components'
import { MainHeader } from './components/MainHeader'

export const Mainlayout: React.FC = () => {
  return (
    <AppShell header={{ height: 111 }}>
        <AppShell.Header>
            <MainHeader />
        </AppShell.Header>
        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
        <AppShell.Footer>
            <Footer />
        </AppShell.Footer>
    </AppShell>
  )
}
