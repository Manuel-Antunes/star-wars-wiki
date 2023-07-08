import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import MyRoutes from "./routes";

const App: React.FC = () => {
  //* hooks
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MyRoutes />
    </QueryClientProvider>
  );
};

export default App;
