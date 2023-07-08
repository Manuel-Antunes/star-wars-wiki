import Tippy, { TippyProps } from '@tippyjs/react'
import { clsx } from 'clsx'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { roundArrow } from 'tippy.js'

export interface NavigationElementProps {
  children: React.ReactNode
  title: string
  href: string
}

const tippyConfig: TippyProps = {
  arrow: roundArrow,
  animation: 'shift-away',
  zIndex: 10003,
  placement: 'right',
}

const NavigationElement: React.FC<NavigationElementProps> = ({ title, children,href }) => {
  const location = useLocation()
  const isCurrent = location.pathname === href || location.pathname.startsWith(href)
  return (
    <Tippy content={title} {...tippyConfig} className="tippy-box">
      <Link
        to={href}
        className={clsx('', {
          'flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-navy-600 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90':
            isCurrent,
          'flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25':
            !isCurrent,
        })}
      >
        {children}
      </Link>
    </Tippy>
  )
}

export default NavigationElement
