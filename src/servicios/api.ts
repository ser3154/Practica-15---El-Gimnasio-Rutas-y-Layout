// servicios/api.ts
// UNA instancia de Axios para toda la app. Nadie más importa axios.
import axios from 'axios';
import { leerSesion } from '../sesion/almacen.ts';

// Donde corre gimnasio-backend. VITE_API_URL sólo se usa al desplegar (tutorial de la Semana 10).
export const URL_API = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const api = axios.create({
  baseURL: URL_API,
  timeout: 5000, // si en 5 s no responde, es error
});

// Práctica 16: interceptor de petición. Corre ANTES de cada petición y le agrega
// el encabezado Authorization con el token guardado (si hay sesión).
api.interceptors.request.use((config) => {
  const sesion = leerSesion();
  if (sesion) {
    config.headers.Authorization = `Bearer ${sesion.token}`;
  }
  return config;
});

// Práctica 17: el interceptor vive fuera de React, así que SesionProveedor
// le registra cómo cerrar la sesión.
let alVencerSesion: (() => void) | null = null;
export function registrarCierreDeSesion(fn: (() => void) | null) {
  alVencerSesion = fn;
}

// Práctica 17: interceptor de respuesta. Si la API responde 401, la sesión ya no sirve.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    // En /auth/login un 401 es "contraseña equivocada", no sesión vencida
    if (axios.isAxiosError(error) && error.response?.status === 401 && error.config?.url !== '/auth/login') {
      alVencerSesion?.();
    }
    return Promise.reject(error); // el error sigue su camino para que la página muestre el aviso
  },
);

// El sobre de la Práctica 9B: toda respuesta exitosa llega como { data, meta }.
export interface Sobre<T> {
  data: T;
}

// Las imágenes las sirve la API: /img/clase-01.jpg → http://localhost:3000/img/clase-01.jpg
export function urlImagen(ruta: string): string {
  return `${URL_API}${ruta}`;
}

// El mensaje que se le enseña a la persona cuando algo falla.
export function mensajeDeError(e: unknown, generico: string): string {
  if (axios.isAxiosError(e)) {
    if (e.response?.status === 401 && e.config?.url !== '/auth/login') {
      return 'Tu sesión terminó. Vuelve a entrar.';
    }
    const mensaje = e.response?.data?.message; // 400 trae un arreglo; 404 y 409, un texto
    if (Array.isArray(mensaje)) return mensaje.join('. ');
    if (typeof mensaje === 'string') return mensaje;
  }
  return generico;
}