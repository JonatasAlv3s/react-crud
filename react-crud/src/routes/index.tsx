import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts/DrawerContext";
import { useEffect } from "react";
import { Dashboard, ListagemDePessoas } from "../Pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página Inicial',
      },

      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas',
      },

    ])
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      {/* <Route path="/pessoas/detalhe/:id" element={<Dashboard />} /> */}

      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
