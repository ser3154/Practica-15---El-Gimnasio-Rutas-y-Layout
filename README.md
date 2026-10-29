-Ejercicio 1

1. ¿Cuánto se ahorró y por qué el ahorro es pequeño en esta aplicación?
El archivo principal bajó de 322.27 kB a 314.99 kB, un ahorro de unos 7.3 kB (de 104.21 kB a 102.53 kB con gzip, unos 1.7 kB). Es pequeño porque la mayor parte del peso no es código de las páginas, sino las librerías que usa toda la aplicación, y esas siguen en el archivo principal porque se necesitan desde la primera pantalla. Cada página, por sí sola, pesa entre 1.5 y 2.3 kB, así que al separarlas
solo se saca del archivo principal una fracción mínima. Con loading="lazy" en las imágenes
el ahorro también es mínimo: son pocas y ligeras, y el catálogo es una rejilla corta, por
lo que casi todas las imágenes ya quedan dentro de la pantalla y se descargan de todos
modos.

2. ¿Por qué falla la API si el preview corre en el puerto 4173?
Por CORS. El origen de una página se compone de esquema, host y puerto, así que http://localhost:4173 y http://localhost:5173 son orígenes distintos. gimnasio-backend solo autoriza el origen http://localhost:5173 en sus encabezados CORS. Cuando la página corre en el 4173, el servidor sí recibe la petición, pero el navegador bloquea la respuesta porque su origen no está en la lista permitida, y en la consola aparece el error "blocked by CORS policy".

-Ejercicio 2

1. ¿Cuándo conviene un contexto y cuándo un store?
Un contexto conviene para valores que cambian poco y que casi todo el árbol necesita, como
la sesión, el tema o el idioma. Es parte de React, no requiere instalar nada y encaja bien
con datos "de ambiente". Su desventaja es que cuando el valor cambia, todos los
componentes que consumen ese contexto se vuelven a renderizar, aunque solo usen una parte
del valor.

Un store como Zustand conviene para estado que cambia seguido y que se comparte entre
varias páginas, como las inscripciones.


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
