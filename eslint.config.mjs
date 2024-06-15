// @ts-check
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import { configs } from "typescript-eslint";

export default [
  {
    rules: {
      "no-console": [
        "error",
        {
          allow: [
            "info",
            "warn",
            "trace",
            "error",
            "group",
            "groupEnd",
            "time",
            "timeEnd",
          ],
        },
      ],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "semi-style": ["error", "last"],
      "semi-spacing": [
        "error",
        {
          before: false,
          after: true,
        },
      ],
      "comma-dangle": [
        "error",
        {
          arrays: "only-multiline",
          objects: "only-multiline",
          imports: "only-multiline",
          exports: "only-multiline",
          functions: "only-multiline",
        },
      ],
      indent: ["error", 2],
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
        },
      ],
      curly: ["error", "multi-line"],
      "import/no-named-as-default-member": "off",
      "@typescript-eslint/no-extraneous-class": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    files: ["src/**/*.ts"],
  },
  eslintPluginPrettierRecommended,
  ...configs.recommended,
];
