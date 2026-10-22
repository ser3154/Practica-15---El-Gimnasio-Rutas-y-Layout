import { useState, type ReactNode } from 'react';
import { ContextoSesion } from './contexto.ts';
import { borrarSesion, guardarSesion, leerSesion } from './almacen.ts';
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

  return (
    <ContextoSesion.Provider value={{ sesion, iniciarSesion, cerrarSesion }}>
      {children}
    </ContextoSesion.Provider>
  );
}