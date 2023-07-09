import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "~/partials/LoadingSpinner";

const ListCharacters = lazy(() => import("~/pages/characters/List"));
const ShowCharacter = lazy(() => import("~/pages/characters/Show"));
const NotFound = lazy(() => import("~/pages/errors/NotFound"));
const ListMovies = lazy(() => import("~/pages/movies/List"));
const ShowMovie = lazy(() => import("~/pages/movies/Show"));
const Home = lazy(() => import("~/pages/Home"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <SuspendedView>
            <Home />
          </SuspendedView>
        }
      />
      <Route
        path="/characters"
        element={
          <SuspendedView>
            <ListCharacters />
          </SuspendedView>
        }
      />
      <Route
        path="/characters/:id"
        element={
          <SuspendedView>
            <ShowCharacter />
          </SuspendedView>
        }
      />
      <Route
        path="/movies"
        element={
          <SuspendedView>
            <ListMovies />
          </SuspendedView>
        }
      />
      <Route
        path="/movies/:id"
        element={
          <SuspendedView>
            <ShowMovie />
          </SuspendedView>
        }
      />
      <Route
        path="*"
        element={
          <SuspendedView>
            <NotFound />
          </SuspendedView>
        }
      />
    </Routes>
  );
};

const SuspendedView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //* render
  return <Suspense fallback={<LoadingSpinner loading />}>{children}</Suspense>;
};

export default AppRoutes;
