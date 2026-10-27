// servicios/gimnasio.ts — las llamadas a la API, tipadas.
// Los componentes sólo ven estas funciones, nunca a Axios.
import { api, type Sobre } from './api.ts';
import type { Clase, ClaseConHorarios, Inscripcion, Sesion, Usuario } from '../tipos.ts';

// GET /clases
export async function traerClases(): Promise<Clase[]> {
  const respuesta = await api.get<Sobre<Clase[]>>('/clases');
  return respuesta.data.data; // .data de Axios, y .data del sobre
}

// GET /clases/:id → la clase con sus horarios
export async function traerClase(id: number): Promise<ClaseConHorarios> {
  const respuesta = await api.get<Sobre<ClaseConHorarios>>(`/clases/${id}`);
  return respuesta.data.data;
}

// Práctica 16 · lo que regresan POST /auth/login y POST /auth/registro (dentro del sobre)
interface RespuestaToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  usuario: Usuario;
}

function aSesion(r: RespuestaToken): Sesion {
  return { token: r.access_token, usuario: r.usuario };
}

// POST /auth/login → 200 con el token; 401 "Credenciales inválidas"
export async function login(correo: string, password: string): Promise<Sesion> {
  const respuesta = await api.post<Sobre<RespuestaToken>>('/auth/login', { correo, password });
  return aSesion(respuesta.data.data);
}

// POST /auth/registro → 201 con el token (quien se registra ya queda con sesión); 409 si el correo existe
export async function registro(nombre: string, correo: string, password: string): Promise<Sesion> {
  const respuesta = await api.post<Sobre<RespuestaToken>>('/auth/registro', { nombre, correo, password });
  return aSesion(respuesta.data.data);
}

// POST /inscripciones — solo horarioId; el miembro sale del token
export async function inscribirse(horarioId: number): Promise<void> {
  await api.post('/inscripciones', { horarioId });
}

// GET /inscripciones/mias
export async function traerMisInscripciones(): Promise<Inscripcion[]> {
  const respuesta = await api.get<Sobre<Inscripcion[]>>('/inscripciones/mias');
  return respuesta.data.data;
}