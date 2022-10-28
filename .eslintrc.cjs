module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:astro/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jsx-a11y", "import", "@typescript-eslint"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    // restrict order of imports
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },
        ],
        groups: [
          ["builtin", "external"],
          ["parent"],
          ["internal"],
          ["index", "sibling"],
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
