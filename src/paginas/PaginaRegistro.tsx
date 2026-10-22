import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useSesion } from '../sesion/contexto.ts';
import { registro } from '../servicios/gimnasio.ts';
import { mensajeDeError } from '../servicios/api.ts';

export function PaginaRegistro() {
  const { iniciarSesion } = useSesion();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function alEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const sesion = await registro(nombre, correo, password);
      iniciarSesion(sesion);
      navigate('/clases', { replace: true });
    } catch (err) {
      setError(mensajeDeError(err, 'No se pudo conectar con el gimnasio.'));
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={alEnviar}>
      <h1>Crear cuenta</h1>

      {error && <p className="aviso aviso--error">{error}</p>}

      <label className="campo">
        <span className="campo__etiqueta">Nombre</span>
        <input className="campo__control" value={nombre}
          onChange={(e) => setNombre(e.target.value)} required />
      </label>

      <label className="campo">
        <span className="campo__etiqueta">Correo</span>
        <input className="campo__control" type="email" value={correo}
          onChange={(e) => setCorreo(e.target.value)} required />
      </label>

      <label className="campo">
        <span className="campo__etiqueta">Contraseña (mínimo 8 caracteres)</span>
        <input className="campo__control" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
      </label>

      <button className="boton boton--ancho" type="submit" disabled={enviando}>
        {enviando ? 'Creando…' : 'Crear cuenta'}
      </button>

      <p className="formulario__pie">
        ¿Ya tienes cuenta? <Link to="/entrar">Entrar</Link>
      </p>
    </form>
  );
}