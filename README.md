-Ejercicio 1

1. ¿Porqué el 404 sí tiene encabezado y pie?
   Porque la ruta "*" es hija de la ruta de layout. El "<Layout>" siempre se pinta y el 404 solo
   ocupa su "<Outlet />".

2. ¿Qué cambia en la pestaña Red si usas "<a href>" en ligar de "Link"?
   Con "<a href>" el navegador pide de nuevo el documento ("index.html") y vuelve a descargar el
   JS y el CSS: se recarga toda la página. Con "Link" no hay petición de documento; solo se ve
   la petición a la API y la página no se recarga.

-Ejercicio 2

1. ¿En qué tipo de dato llega el id y qué pasa si no lo conviertes?
   Llega como "string" (o "undefined"), porque "useParams" siempre devuelve texto. Sin
   convertirlo, TypeScrpt marca error al pasarlo a "traerClase(id: number)", y las comparaciones
   con números ("id === 1") daría "false".

2. ¿Qué pasa al ir de "/clases/1" a "/clases/2" si el id no está en las dependencias del efecto?
   React reutiliza el mismo componente (es la misma ruta, solo cambia el parámetro), así que el
   efecto, que solo corre al montar, no se vuelve a ejecutar. La URL dice "/clases/2" pero la
   pantalla sigue mostrando la clase 1.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
