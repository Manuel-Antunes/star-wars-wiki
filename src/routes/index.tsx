import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, RouterProps, Routes } from "react-router-dom";
import LoadingSpinner from "~/partials/LoadingSpinner";
import AppRoutes from "./AppRoutes";

const MyRoutes: React.FC<Partial<RouterProps>> = () => {
  //* render
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
          <Route index element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default MyRoutes;
