// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
// postcss.config.ts

import { Config } from 'postcss-load-config';

// Define the PostCSS configuration object
const config: Config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// Export the configuration
export default config;
