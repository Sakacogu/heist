import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginImport from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    ignores: [".next/**/*", "node_modules/**/*", "public/**/*", "sanity/**/*"],
  },

  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    plugins: { import: pluginImport },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  {
    files: [
      "*.config.{js,cjs,mjs}",
      "*/**/*.config.{js,cjs,mjs}",
      "tailwind.config.{js,cjs}",
      "postcss.config.{js,mjs}",
    ],
    languageOptions: { sourceType: "script" },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];
