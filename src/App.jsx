import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from './layout/PublicLayout';
import PlayerList from './player/PlayerList';
import Home from './pages/Home';
import PlayerDetail from './player/PlayerDetail';
import AddPlayerForm from './player/AddPlayerForm';
import LoginView from "./pages/auth/loginView";
import RegisterView from "./pages/auth/registerView";
import Otpview from "./pages/auth/otpView"
import Posting from "./components/AnnouncementView"
import CreatePosting from "./components/createAnnoucement"
import CreateSubs from "./components/subscription/CreateSubscription"
import ClassView from "./components/subscription/SubscriptionView"


const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "players", element: <PlayerList /> },
      { path: "players/:id", element: <PlayerDetail /> }, // Rute untuk detail pemain
      { path: "add-player", element: <AddPlayerForm /> },
      { path: "posting", element: <Posting /> },
      { path: "createposting", element: <CreatePosting /> },
      { path: "createsubs", element: <CreateSubs /> },
      { path: "classview", element: <ClassView /> },// Rute untuk menambah pemain
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
