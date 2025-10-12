// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/html-self-closing": ["error", { html: { void: "always", normal: "any" }, svg: "any" }],
    curly: ["error", "multi-line"],

    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "info"],
      },
    ],

    camelcase: "off",
    "no-else-return": "warn",
    "no-undef": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
});
