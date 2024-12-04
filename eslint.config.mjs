import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
export default {
  files: ["**/*.{js,mjs,cjs}"],
  languageOptions: {
    globals: {
      ...globals.node, // Agrega variables globales como `require`, `module`, `process`
    },
  },
  plugins: {
    js: pluginJs,
  },
  rules: {
    ...pluginJs.configs.recommended.rules,
    "no-undef": "off", // Desactiva errores sobre variables globales
    "@typescript-eslint/no-require-imports": "off", // Permite `require()`
  },
};

