<<<<<<< Updated upstream


export const App = () => {


  return (
  <h1>Ola!!!</h1>
  )
}


=======
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
>>>>>>> Stashed changes
