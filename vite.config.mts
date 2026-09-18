import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { defineConfig  } from 'vite';
import type { PluginOption } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

import packageJson from './package.json' with { type: 'json' };

function libUpdateVersion(version: string): PluginOption {
	return {
		name: 'update-version',
		async closeBundle() {
			const files = await glob([
				'README.md',
				'static/**/*.html',
			], {
				cwd     : root,
				absolute: true,
			});

			const pattern     = /theme-switcher-\d+\.\d+\.\d+/g;
			const replacement = `theme-switcher-${version}`;

			for (const file of files) {
				const source = await readFile(file, 'utf8');
				const result = source.replace(pattern, replacement);

				if (result !== source) {
					await writeFile(file, result);
				}
			}
		},
	};
}

const root        = resolve(import.meta.dirname);
const { version } = packageJson;

export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production';

	return {
		plugins: [
			react({
				jsxRuntime: 'classic',
			}),
			libInjectCss(),
			libUpdateVersion(version),
		],
		resolve: {
			extensions: [
				'.js', '.mjs', '.cjs',
				'.ts', '.cts', '.mts',
				'.jsx', '.tsx', '.json',
			],
		},
		server: {
			open: true,
		},
		build: {
			target: 'es2020',
			lib   : {
				entry   : 'src/index.tsx',
				name    : 'ThemeSwitcher',
				fileName: () =>
					isProduction
						? `theme-switcher-${version}.min.js`
						: `theme-switcher-${version}.js`,
				formats: [ 'iife' ],
			},
			rolldownOptions: {
				external: [
					'react',
					'react-dom/client',
				],
				output: {
					globals: {
						'react'           : 'React',
						'react-dom/client': 'ReactDOM',
					},
				},
			},
			minify     : isProduction,
			emptyOutDir: false,
		},
		define: {
			'process.env.NODE_ENV': JSON.stringify(process.env['NODE_ENV'] || 'development'),
		},
	};
});
