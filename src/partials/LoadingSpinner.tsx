import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { randomImage } from '~/helpers/randomImage';


interface Props {
  loading?: boolean
}

const Preloader: React.FC<Props> = ({loading}) => {
  return (
    <AnimatePresence mode="wait">
      {loading === undefined ||
        (loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="app-preloader dark:bg-navy-900 fixed inset-0 z-[9999] grid h-full w-full place-content-center bg-slate-50 bg-opacity-60"
          >
            <div
              
              aria-label="Carregando..."
            >
              <img src={randomImage()} className="app-preloader-inner relative inline-block h-64 w-64 before:bg-primary before:bg-opacity-60 before:content-[''] before:rounded-full before:h-full before:w-full before:absolute after:bg-primary after:bg-opacity-60 after:content-[''] after:rounded-full after:h-full after:w-full after:absolute" alt="logo" />
            </div>
          </motion.div>
        ))}
    </AnimatePresence>
  )
}

export default Preloader
