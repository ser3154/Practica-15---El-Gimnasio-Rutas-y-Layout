import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useClase } from '../hooks/useClase.ts';
import { useSesion } from '../sesion/contexto.ts';
import { inscribirse } from '../servicios/gimnasio.ts';
import { mensajeDeError, urlImagen } from '../servicios/api.ts';
import { Cargando } from '../componentes/Cargando.tsx';
import { MensajeError } from '../componentes/MensajeError.tsx';

export function PaginaClase() {
  const { id } = useParams();
  const { clase, cargando, error, reintentar } = useClase(Number(id));
  const { sesion } = useSesion();
  const navigate = useNavigate();

  const [aviso, setAviso] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);
  const [inscribiendo, setInscribiendo] = useState<number | null>(null);

  async function alInscribirme(horarioId: number) {
    if (!sesion) {
      // Sin sesión: a /entrar, y al entrar regresa a esta clase
      navigate('/entrar', { state: { desde: `/clases/${id}` } });
      return;
    }
    setInscribiendo(horarioId);
    setAviso(null);
    try {
      await inscribirse(horarioId);
      setAviso({ tipo: 'exito', texto: '¡Listo! Quedaste inscrito.' });
      reintentar(); // vuelve a pedir la clase: los lugares disponibles se actualizan
    } catch (e) {
      // 409 (regla) y 403 (cuenta no es de un miembro): se muestra el message de la API
      setAviso({ tipo: 'error', texto: mensajeDeError(e, 'No se pudo completar la inscripción.') });
    } finally {
      setInscribiendo(null);
    }
  }

  if (cargando) return <Cargando />;
  if (error || !clase) {
    return <MensajeError mensaje={error ?? 'No se encontró la clase.'} onReintentar={reintentar} />;
  }

  return (
    <>
      <Link to="/clases" className="detalle__volver">← Todas las clases</Link>

      <article className="detalle">
        <img className="detalle__imagen" src={urlImagen(clase.imagen)} alt={clase.nombre} />
        <div className="detalle__datos">
          <span className={`etiqueta etiqueta--${clase.categoria}`}>{clase.categoria}</span>
          <h1>{clase.nombre}</h1>
          <p className="pagina__bajada">{clase.descripcion} · {clase.duracionMin} min</p>

          {aviso && <div className={`aviso aviso--${aviso.tipo}`}>{aviso.texto}</div>}

          <h2>Horarios</h2>
          <ul className="horarios">
            {clase.horarios.map((h) => (
              <li key={h.id} className="horario">
                <div>
                  <div className="horario__dia">{h.dia} · {h.horaInicio}</div>
                  <div className="horario__meta">
                    {h.entrenador} · {h.disponibles} de {h.cupoMaximo} lugares
                  </div>
                </div>
                {h.disponibles === 0 ? (
                  <span className="horario__lleno">Lleno</span>
                ) : (
                  <button
                    className="boton boton--chico"
                    disabled={inscribiendo === h.id}
                    onClick={() => alInscribirme(h.id)}
                  >
                    {inscribiendo === h.id ? 'Inscribiendo…' : 'Inscribirme'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}