import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Create } from "./pages/create";
import { EtcProvider } from "./contexts/etcProvider";
import { AuthProvider } from "./contexts/authProvider";
import { BestiaryProvider } from "./contexts/bestiartProvider";
import { CharactersProvider } from "./contexts/charactersProvider";
import { BattleProvider } from "./contexts/battleProvider";
import { TurnProvider } from "./contexts/turnProvider";
import { TargetsProvider } from "./contexts/targetProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <Login />,
  },
  {
    path: "/create",
    element: <Create />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <CharactersProvider>
        <EtcProvider>
          <TurnProvider>
            <BestiaryProvider>
              <BattleProvider>
                <TargetsProvider>
                  <RouterProvider router={router} />
                </TargetsProvider>
              </BattleProvider>
            </BestiaryProvider>
          </TurnProvider>
        </EtcProvider>
      </CharactersProvider>
    </AuthProvider>
  </React.StrictMode>
);
