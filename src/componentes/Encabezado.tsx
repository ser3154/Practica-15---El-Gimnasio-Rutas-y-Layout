// <Encabezado> — la marca, los enlaces y la sesión (nombre y Salir, o Entrar).
import { Link, NavLink, useNavigate } from 'react-router';
import { useSesion } from '../sesion/contexto.ts';

// La clase del enlace según si está activo o no.
function claseEnlace({ isActive }: { isActive: boolean }) {
  return isActive ? 'barra__enlace barra__enlace--activo' : 'barra__enlace';
}

export function Encabezado() {
  const { sesion, cerrarSesion } = useSesion();
  const navigate = useNavigate();

  function salir() {
    cerrarSesion();
    navigate('/clases');
  }

  return (
    <header className="barra">
      <div className="barra__interior">
        <Link to="/" className="barra__marca">
          <img src="/logo.svg" alt="" />
          Gimnasio Titanes
        </Link>

        <nav>
          <ul className="barra__enlaces">
            <li><NavLink to="/clases" className={claseEnlace}>Clases</NavLink></li>
            <li><NavLink to="/mis-inscripciones" className={claseEnlace}>Mis inscripciones</NavLink></li>
          </ul>
        </nav>

        <div className="barra__sesion">
          {sesion ? (
            <>
              <span className="barra__usuario">{sesion.usuario.nombre}</span>
              <button className="boton boton--secundario boton--chico" onClick={salir}>
                Salir
              </button>
            </>
          ) : (
            <Link to="/entrar" className="boton boton--chico">Entrar</Link>
          )}
        </div>
      </div>
    </header>
  );
}
