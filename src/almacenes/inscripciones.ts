// almacenes/inscripciones.ts — las inscripciones de la persona, compartidas entre páginas.
import { create } from 'zustand';
import { traerMisInscripciones } from '../servicios/gimnasio.ts';
import { mensajeDeError } from '../servicios/api.ts';
import type { Inscripcion } from '../tipos.ts';

interface EstadoInscripciones {
  inscripciones: Inscripcion[];
  cargando: boolean;
  cargado: boolean; // ¿ya llegó la primera respuesta? evita mostrar "no tienes inscripciones" de más
  error: string | null;
  cargar: () => Promise<void>;
  vaciar: () => void;
}

// Si se vacía (o se vuelve a cargar) mientras hay una petición en vuelo,
// la respuesta vieja se ignora y no repuebla el store de otra sesión.
let peticionActual = 0;

export const useInscripciones = create<EstadoInscripciones>((set) => ({
  inscripciones: [],
  cargando: false,
  cargado: false,
  error: null,

  cargar: async () => {
    const mia = ++peticionActual;
    set({ cargando: true, error: null });
    try {
      const lista = await traerMisInscripciones();
      if (mia !== peticionActual) return;
      set({
        inscripciones: lista.filter((i) => i.estado === 'confirmada'),
        cargando: false,
        cargado: true,
      });
    } catch (e) {
      if (mia !== peticionActual) return;
      set({
        error: mensajeDeError(e, 'No se pudieron cargar tus inscripciones.'),
        cargando: false,
      });
    }
  },

  vaciar: () => {
    peticionActual++;
    set({ inscripciones: [], cargando: false, cargado: false, error: null });
  },
}));