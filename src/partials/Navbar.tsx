import React from 'react'

import { Link } from 'react-router-dom'
import AppLogo from '../components/atoms/AppLogo'


const Navbar: React.FC = () => {
  return (
    <nav className="header print:hidden">
      {/* App Header  */}
      <div className="header-container dark:bg-navy-700 relative flex w-full bg-white print:hidden">
        {/* Header Items */}
        <div className="flex w-full items-center justify-between">
          <div>
            <Link to={'/home'} className="md:hidden">
              <AppLogo hideName />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
