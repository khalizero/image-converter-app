import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

const App = () => {
  const app = useRoutes(routes);

  return app  ;
};

export default App;
