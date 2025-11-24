/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 120,
  useTabs: false,
  endOfLine: "auto",
};
