import React from 'react'
import NavigationElement from '~/components/molecules/NavigationElement'
import { navigationElements } from '../constants/navigation'

const BottomTabNavigation: React.FC = () => {

  return (
    <div className="w-full py-10 md:hidden">
      <footer className="border-slate-150 z-40 dark:border-navy-700 dark:bg-navy-800 fixed bottom-0 flex w-full items-center justify-between border-r bg-white px-2 py-3 ">
        {navigationElements.map((element) => (
          <NavigationElement href={element.href} key={element.title} title={element.title}>
            {element.children}
          </NavigationElement>
        ))}
      </footer>
    </div>
  )
}

export default BottomTabNavigation
