import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';import { useSesion } from '../sesion/contexto.ts';
import { login } from '../servicios/gimnasio.ts';
import { mensajeDeError } from '../servicios/api.ts';

export function PaginaEntrar() {
  const { iniciarSesion } = useSesion();
  const navigate = useNavigate();

  const ubicacion = useLocation();
  const destino = (ubicacion.state as { desde?: string } | null)?.desde ?? '/clases';
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function alEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const sesion = await login(correo, password);
      iniciarSesion(sesion);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(mensajeDeError(err, 'No se pudo conectar con el gimnasio.'));
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={alEnviar}>
      <h1>Entrar</h1>

      {error && <p className="aviso aviso--error">{error}</p>}

      <label className="campo">
        <span className="campo__etiqueta">Correo</span>
        <input className="campo__control" type="email" value={correo}
          onChange={(e) => setCorreo(e.target.value)} required />
      </label>

      <label className="campo">
        <span className="campo__etiqueta">Contraseña</span>
        <input className="campo__control" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
      </label>

      <button className="boton boton--ancho" type="submit" disabled={enviando}>
        {enviando ? 'Entrando…' : 'Entrar'}
      </button>

      <p className="formulario__pie">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </form>
  );
}