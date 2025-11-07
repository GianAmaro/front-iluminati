// PostCSS configuration for Tailwind CSS v4
// Use the new @tailwindcss/postcss plugin (not 'tailwindcss')
import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwind(), autoprefixer()],
};
