import { createContext, useContext } from 'react';
import type { Sesion } from '../tipos.ts';

export interface ValorSesion {
  sesion: Sesion | null;
  iniciarSesion: (sesion: Sesion) => void;
  cerrarSesion: () => void;
}

export const ContextoSesion = createContext<ValorSesion | null>(null);

export function useSesion(): ValorSesion {
  const valor = useContext(ContextoSesion);
  if (valor === null) {
    throw new Error('useSesion se usó fuera de <SesionProveedor>');
  }
  return valor;
}