import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './componentes/Layout.tsx';
import { RutaProtegida } from './componentes/RutaProtegida.tsx';

// Las páginas exportan con nombre, y lazy espera un export default,
// por eso el .then que adapta el módulo.
const PaginaClases = lazy(() =>
  import('./paginas/PaginaClases.tsx').then((m) => ({ default: m.PaginaClases })),
);
const PaginaClase = lazy(() =>
  import('./paginas/PaginaClase.tsx').then((m) => ({ default: m.PaginaClase })),
);
const PaginaEntrar = lazy(() =>
  import('./paginas/PaginaEntrar.tsx').then((m) => ({ default: m.PaginaEntrar })),
);
const PaginaRegistro = lazy(() =>
  import('./paginas/PaginaRegistro.tsx').then((m) => ({ default: m.PaginaRegistro })),
);
const PaginaMisInscripciones = lazy(() =>
  import('./paginas/PaginaMisInscripciones.tsx').then((m) => ({ default: m.PaginaMisInscripciones })),
);
const NoEncontrado = lazy(() =>
  import('./componentes/NoEncontrado.tsx').then((m) => ({ default: m.NoEncontrado })),
);

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clases" replace />} />

        <Route path="clases">
          <Route index element={<PaginaClases />} />
          <Route path=":id" element={<PaginaClase />} />
        </Route>

        <Route path="entrar" element={<PaginaEntrar />} />
        <Route path="registro" element={<PaginaRegistro />} />

        {/* Rutas que necesitan sesión */}
        <Route element={<RutaProtegida />}>
          <Route path="mis-inscripciones" element={<PaginaMisInscripciones />} />
        </Route>

        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}