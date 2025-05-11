import js from "@eslint/js";
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-config-prettier';
import globals from "globals";

export default [
  {
    ...js.configs.recommended,
    settings: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      "no-console": "warn", // Disallow the use of console.
      "@typescript-eslint/consistent-indexed-object-style": "error", //Using one declaration form consistently improves code readability.
      "@typescript-eslint/no-inferrable-types": "error", //TypeScript can infer the types of parameters, properties, and variables from their default or initial values. There is no need to use an explicit value for a boolean, number, or string.
      '@typescript-eslint/consistent-type-assertions': [ //This rule aims to standardize the use of type assertion style across the codebase.
        'error',
        { assertionStyle: 'never' }, //will enforce that you do not do any type assertions.
      ],
      '@typescript-eslint/no-non-null-assertion': 'error', //asserts to the type system that an expression is non-nullable, as in not null or undefined
      '@typescript-eslint/consistent-type-imports': 'error', //TypeScript allows specifying a type keyword on imports to indicate that the export exists only in the type system, not at runtime.
      '@typescript-eslint/explicit-function-return-type': [ //explicit return types do make it visually more clear what type is returned by a function
        'error',
        {
          allowExpressions: true, //Whether to ignore function expressions (functions which are not part of a declaration).
          allowHigherOrderFunctions: true, //Whether to ignore functions immediately returning another function expression.
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error', /*Using any disables many type checking rules and is generally best used only as a last resort or when prototyping code.*/
      '@typescript-eslint/ban-ts-comment': 'error',/*TypeScript provides several directive comments that can be used to alter how it processes files. Using these to suppress TypeScript compiler errors reduces the effectiveness of TypeScript overall.*/
      '@typescript-eslint/explicit-member-accessibility': [ /*TypeScript allows placing explicit public , protected , and private accessibility modifiers in front of class members*/
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } }, //Which accessibility modifier is required to exist or not exist.
      ],
      '@typescript-eslint/member-ordering': 'warn' /*Require a consistent member declaration order. This rule aims to standardize the way classes, interfaces, and type literals are structured and ordered.*/
    },
  },

  {
    plugins: {
      unicorn,
    },
    rules: {
      ...unicorn.configs.recommended.rules,
      'unicorn/prevent-abbreviations': [ /*Using complete words results in more readable code. Not everyone knows all your abbreviations. Code is written only once, but read many times.*/
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
  },

  {
    ...perfectionist.configs['recommended-natural'],
  },

  prettier,

  {
    rules: {
      'max-lines-per-function': ['warn', 40], /*This rule enforces a maximum number of lines per function*/
      'no-magic-numbers': [
        "error",
        {
            'ignoreArrayIndexes': true, /*A boolean to specify if numbers used in the context of array indexes (e.g., data[2]) are considered okay. false by default.*/
            'enforceConst': true, /*A boolean to specify if we should check for the const keyword in variable declaration of numbers. false by default.*/
        }
      ],
    },
  },

  {
    ignores: [
      "eslint.config.mjs",
      ".stylelintrc.json",
      "/.git",
      "/coverage",
      "/.vscode",
      "**/node_modules",
      "/dist",
      "/public",
    ],
  },
];