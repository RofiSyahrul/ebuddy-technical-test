import { createRequire } from 'module';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

import esbuild from 'esbuild';

const require_ = createRequire(import.meta.url);
const pkg = require_('./package.json');

const args = process.argv;
const isDev = args[2] === '--dev';

const serviceAccountPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  './service-account.json',
);

/** @type {import('esbuild').BuildOptions} */
const options = {
  bundle: true,
  define: {
    'process.env.GOOGLE_APPLICATION_CREDENTIALS':
      JSON.stringify(serviceAccountPath),
  },
  entryPoints: ['src/index.ts'],
  external: Object.keys(pkg.dependencies),
  format: 'esm',
  minify: !isDev,
  outfile: 'dist/index.js',
  platform: 'node',
};

(async () => {
  if (isDev) {
    const buildContext = await esbuild.context(options);
    await buildContext.watch();
  } else {
    await esbuild.build(options);
  }
})();
