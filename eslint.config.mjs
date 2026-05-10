import nextPlugin from "eslint-config-next";

export default [
  ...nextPlugin,
  {
    ignores: [".next/**", "node_modules/**", "functions/lib/**", "scripts/**", "upload-portfolio.mjs"],
  },
  {
    rules: {
      // Existing codebase pattern; surfaced as warnings for follow-up rather than blocking.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
];
