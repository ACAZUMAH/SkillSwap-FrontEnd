import { Drawer } from '@mantine/core'
import React from 'react'
import { SearchDropdownProps } from '../interfaces'

export const SearchDropdown: React.FC<SearchDropdownProps> = ({ opened, onClose }) => {
  return (
    <Drawer opened={opened} onClose={onClose} position='top' size="100%">SearchDropdown</Drawer>
  )
}
