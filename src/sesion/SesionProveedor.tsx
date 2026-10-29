import { useEffect, useState, type ReactNode } from 'react';
import { ContextoSesion } from './contexto.ts';
import { borrarSesion, guardarSesion, leerSesion } from './almacen.ts';
import { registrarCierreDeSesion } from '../servicios/api.ts';
import { useInscripciones } from '../almacenes/inscripciones.ts';
import type { Sesion } from '../tipos.ts';

export function SesionProveedor({ children }: { children: ReactNode }) {
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

  // Práctica 18: hay sesión → se llena el store; no hay → se vacía.
  const token = sesion?.token;
  useEffect(() => {
    const { cargar, vaciar } = useInscripciones.getState();
    if (token) {
      void cargar();
    } else {
      vaciar();
    }
  }, [token]);

  return (
    <ContextoSesion.Provider value={{ sesion, iniciarSesion, cerrarSesion }}>
      {children}
    </ContextoSesion.Provider>
  );
}