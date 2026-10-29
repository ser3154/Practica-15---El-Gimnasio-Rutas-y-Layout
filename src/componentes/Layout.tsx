// <Layout> — el marco que comparten todas las páginas.
// El <Suspense> va DENTRO del layout: mientras baja el archivo de la página,
// el encabezado y el pie se quedan en pantalla y solo el hueco muestra "Cargando…".
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Cargando } from './Cargando.tsx';
import { Encabezado } from './Encabezado.tsx';
import { PiePagina } from './PiePagina.tsx';

export function Layout() {
  return (
    <div className="disposicion">
      <Encabezado />
      <main className="disposicion__contenido">
        <Suspense fallback={<Cargando />}>
          <Outlet />
        </Suspense>
      </main>
      <PiePagina />
    </div>
  );
}