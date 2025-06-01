import { motion } from 'motion/react';
import React from 'react'

interface Props {
    children?: React.ReactNode;
}

export const Gasture: React.FC<Props> = ({ children }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
        {children}
    </motion.div>
  )
}
