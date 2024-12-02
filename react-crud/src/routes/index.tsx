import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts/DrawerContext";
import { useEffect } from "react";

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página Inicial',
      }
    ])
  }, []);

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button onClick={toggleDrawerOpen} variant="contained" color="primary">
            Drawer
          </Button>
        }
      />
      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
