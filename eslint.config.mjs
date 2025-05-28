import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        ...js.configs.recommended,
    },

    ...tseslint.configs.recommended,

    {
        files: ["**/*.{ts,tsx}"],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
];
