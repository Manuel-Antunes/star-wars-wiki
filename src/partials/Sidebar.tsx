import React from 'react'
import { Link } from 'react-router-dom'
import AppLogo from '~/components/atoms/AppLogo'
import NavigationElement from '~/components/molecules/NavigationElement'
import { navigationElements } from '../constants/navigation'

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar print:hidden">
      {/* Main Sidebar */}
      <div className="main-sidebar">
        <div className="border-slate-150 dark:border-navy-700 dark:bg-navy-800 flex h-full w-full flex-col items-center border-r bg-white">
          {/* Application Logo */}
          <div className="flex pt-4">
            <Link to={'/home'}>
              <AppLogo hideName />
            </Link>
          </div>
          {/* Main Sections Links */}
          <div className="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto pt-6">
            {/* Dashobards */}

            {navigationElements.map((element) => (
              <NavigationElement href={element.href} key={element.title} title={element.title}>
                {element.children}
              </NavigationElement>
            ))}
          </div>
          {/* Bottom Links */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
