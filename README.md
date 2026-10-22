-Ejercicio 1

1. ¿Porqué un contexto y no props?
   La sesión la necesitan componentes en distintos niveles. Con props habría que pasarla por
   todos los componentes intermedios, aunque no la usen. Con contexto, quien la necesita la
   lee directo con useSesion().

2. ¿Qué pasa si se usa fuera del proveedor?
   useContext devuelve el valor por defecto, que es null. El hook detecta eso y lanza un
   error ("useSesion se usó fuera de <SesionProveedor>") en vez de fallar después con un
   Cannot read properties of null.

-Ejercicio 2

1. ¿Dónde se guarda el token y qué riesgo tiene?
   En localStorage junto con el usuario. El riesgo es XSS: cualquier script que se ejecute
   en la página puede leerlo con localStorage.getItem y robar la sesión.


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
