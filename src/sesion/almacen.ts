import type { Sesion } from '../tipos.ts';

const CLAVE = 'gimnasio.sesion';

export function leerSesion(): Sesion | null {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (!texto) return null;
    const sesion = JSON.parse(texto) as Sesion;
    if (typeof sesion.token !== 'string' || !sesion.usuario) return null;
    return sesion;
  } catch {
    return null;
  }
}

export function guardarSesion(sesion: Sesion): void {
  localStorage.setItem(CLAVE, JSON.stringify(sesion));
}

export function borrarSesion(): void {
  localStorage.removeItem(CLAVE);
}