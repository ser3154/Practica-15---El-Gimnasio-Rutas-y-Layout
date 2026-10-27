import { Navigate, Outlet, useLocation } from 'react-router';
import { useSesion } from '../sesion/contexto.ts';

export function RutaProtegida() {
  const { sesion } = useSesion();
  const ubicacion = useLocation();

  if (!sesion) {
    // Guardamos a dónde quería ir para regresarlo después de entrar
    return <Navigate to="/entrar" replace state={{ desde: ubicacion.pathname }} />;
  }
  return <Outlet />;
}