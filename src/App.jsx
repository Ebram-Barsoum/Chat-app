/* eslint-disable no-unused-vars */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import UserProvider from "./contexts/userContext";
import ChatsProvider from "./contexts/chatsContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Conversation from "./pages/Conversation";

import NotFound from "./ui/NotFound";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchInterval: 100,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ChatsProvider>
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                </ChatsProvider>
              }
            />
            <Route
              path="/chat/:id"
              element={
                <ChatsProvider>
                  <ProtectedRoute>
                    <Conversation />
                  </ProtectedRoute>
                </ChatsProvider>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>

        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
