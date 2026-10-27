import { useEffect, useState, type ReactNode } from 'react';
import { ContextoSesion } from './contexto.ts';
import { borrarSesion, guardarSesion, leerSesion } from './almacen.ts';
import { registrarCierreDeSesion } from '../servicios/api.ts';
import type { Sesion } from '../tipos.ts';

export function SesionProveedor({ children }: { children: ReactNode }) {
  // Se lee localStorage una sola vez, al montar: así la sesión sobrevive al recargar.
  const [sesion, setSesion] = useState<Sesion | null>(() => leerSesion());

  function iniciarSesion(nueva: Sesion) {
    guardarSesion(nueva);
    setSesion(nueva);
  }

  function cerrarSesion() {
    borrarSesion();
    setSesion(null);
  }

  // Práctica 17: el interceptor de api.ts cierra la sesión cuando la API responde 401.
  useEffect(() => {
    registrarCierreDeSesion(() => {
      borrarSesion();
      setSesion(null);
    });
    return () => registrarCierreDeSesion(null);
  }, []);

  return (
    <ContextoSesion.Provider value={{ sesion, iniciarSesion, cerrarSesion }}>
      {children}
    </ContextoSesion.Provider>
  );
}