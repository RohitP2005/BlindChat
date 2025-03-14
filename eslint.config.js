import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        require: "readonly",
        process: "readonly",
        console: "readonly",
      },
    },
    rules: {},
  },
];
