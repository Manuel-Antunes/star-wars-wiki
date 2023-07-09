/* eslint-disable react-refresh/only-export-components */
import React, { PropsWithChildren } from "react";

import BottomTabNavigation from "~/partials/BottomTabNavigation";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="min-h-100vh is-header-blur dark:bg-navy-900 flex grow bg-slate-50">
        <Sidebar />
        <Navbar />
        <main className="main-content w-full px-[var(--margin-x)] pb-8">
          {children}
        </main>
      </div>
      <BottomTabNavigation />
    </>
  );
};

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center justify-between py-3 pb-5 lg:pb-6">
      <div className="flex items-center space-x-1">
        <h2 className="line-clamp-1 dark:text-navy-50 text-xl font-medium text-slate-700 lg:text-2xl">
          {children}
        </h2>
      </div>
    </div>
  );
};

export default Object.assign(MainLayout, { Header });
