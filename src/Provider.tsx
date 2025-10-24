import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/authProvider";
import { BattleProvider } from "./contexts/battleProvider";
import { BestiaryProvider } from "./contexts/bestiartProvider";
import { CharactersProvider } from "./contexts/charactersProvider";
import { EtcProvider } from "./contexts/etcProvider";
import { TargetsProvider } from "./contexts/targetProvider";
import { TurnProvider } from "./contexts/turnProvider";
import { createBrowserRouter } from "react-router-dom";
import { Create } from "./pages/create";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Did } from "./pages/did";

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
  {
    path: "/d&d",
    element: <Did />,
  },
]);

export const Provider = () => {
  return (
    <AuthProvider>
      <EtcProvider>
        <TurnProvider>
          <CharactersProvider>
            <BestiaryProvider>
              <BattleProvider>
                <TargetsProvider>
                  <RouterProvider router={router} />
                </TargetsProvider>
              </BattleProvider>
            </BestiaryProvider>
          </CharactersProvider>
        </TurnProvider>
      </EtcProvider>
    </AuthProvider>
  );
};
