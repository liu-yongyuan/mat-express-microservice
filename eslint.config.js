import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: {
            globals: globals.node,
        },
    },
    {
        files: ["setupTests.js", "test/**"],
        ...jest.configs["flat/recommended"],
        rules: {
            ...jest.configs["flat/recommended"].rules,
            "jest/prefer-expect-assertions": "off",
        },
    },
    {
        // can't move to another object
        ignores: ["setupTests.js", "**/node_modules/", ".git/"],
    },
    pluginJs.configs.recommended,
];
