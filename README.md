1. ¿La ruta protegida hace segura la aplicación?¡Qué protege los datos?
   No, solo oculta páginas en la interfaz. El código del frontend corre en el navegador del
   usuario y se puede modificar (basta un token falso en localStorage para la que la ruta lo
   deje pasar). Lo que protege los datos es el backend: JwtAuthGuard y valida la firma y la
   vigencia del token en cada petición y responde 401 si no es válido. Por eso el curl sin
   token da 401.

2. ¿Por qué no se manda el miembroId?
   Porque el cliente no es de fiar: si lo mandara, cualquiera podría cambiarlo e inscribir a
   otra otra persona. El backend lo saca del token, que está firmado y no se puede alterar. Así
   solo te inscribes a ti mismo. 

3. ¿Diferencia entre 401 y 403?
   401: el servidor no sabe quién eres (no mando token, venció o es falso). La solución es
   volver a iniciar sesión, por eso el interceptor cierra la sesión. 403: sí sabe quién eres,
   pero tu cuenta no tiene permiso. La sesión sigue y solo se muestra el mensaje.

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
