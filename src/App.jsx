// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// ...import lainnya

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "players", element: <PlayerList /> },
      { path: "players/:id", element: <PlayerDetail /> },
      { path: "add-player", element: <AddPlayerForm /> },
      { path: "posting", element: <Posting /> },
      { path: "createposting", element: <CreatePosting /> },
      { path: "createsubs", element: <CreateSubs /> },
      { path: "classview", element: <ClassView /> },
    ],
  },
  { path: "/login", element: <LoginView /> },
  { path: "/register", element: <RegisterView /> },
  { path: "/otp", element: <Otpview /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
