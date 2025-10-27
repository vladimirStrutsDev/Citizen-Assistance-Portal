import { useRoutes } from "react-router-dom";
import type { FC } from "react";
import { routes } from "./routes";

const App: FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;
