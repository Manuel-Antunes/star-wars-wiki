import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '~/pages/Home'
import ListCharacters from '~/pages/characters/List'
import ShowCharacter from '~/pages/characters/Show'
import NotFound from '~/pages/errors/NotFound'
import ListMovies from '~/pages/movies/List'
import ShowMovie from '~/pages/movies/Show'
import LoadingSpinner from '~/partials/LoadingSpinner'

const AppRoutes:React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<SuspendedView><Home /></SuspendedView>} />
      <Route path="/characters" element={<SuspendedView><ListCharacters /></SuspendedView>} />
      <Route path="/characters/:id" element={<SuspendedView><ShowCharacter /></SuspendedView>} />
      <Route path="/movies" element={<SuspendedView><ListMovies /></SuspendedView>} />
      <Route path="/movies/:id" element={<SuspendedView><ShowMovie /></SuspendedView>} />
      <Route path="*" element={<SuspendedView><NotFound /></SuspendedView>} />
    </Routes>
  )
}

const SuspendedView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //* render
  return <Suspense fallback={<LoadingSpinner loading />}>{children}</Suspense>
}

export default AppRoutes