import { Link } from 'react-router';
import { useInscripciones } from '../almacenes/inscripciones.ts';
import { urlImagen } from '../servicios/api.ts';
import { Cargando } from '../componentes/Cargando.tsx';
import { MensajeError } from '../componentes/MensajeError.tsx';

export function PaginaMisInscripciones() {
  // Ya no pide datos: lee lo que el store tiene.
  const inscripciones = useInscripciones((s) => s.inscripciones);
  const cargando = useInscripciones((s) => s.cargando);
  const cargado = useInscripciones((s) => s.cargado);
  const error = useInscripciones((s) => s.error);
  const cargar = useInscripciones((s) => s.cargar);

  if (error) return <MensajeError mensaje={error} onReintentar={cargar} />;
  if (cargando && !cargado) return <Cargando />;
  if (!cargado) return <Cargando />;

  return (
    <>
      <section className="pagina__encabezado">
        <h1>Mis inscripciones</h1>
        <p className="pagina__bajada">
          {inscripciones.length === 0
            ? 'Todavía no estás inscrito a ninguna clase.'
            : `${inscripciones.length} clase(s) esta semana.`}
        </p>
      </section>

      <ul className="inscripciones">
        {inscripciones.map((i) => (
          <li className="inscripcion" key={i.id}>
            <img className="inscripcion__imagen" src={urlImagen(i.clase.imagen)} alt="" loading="lazy" />
            <div>
              <Link to={`/clases/${i.clase.id}`} className="inscripcion__clase">
                {i.clase.nombre}
              </Link>
              <div className="inscripcion__meta">
                {i.horario.dia} · {i.horario.horaInicio} · {i.horario.entrenador}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}