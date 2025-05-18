import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

import { version } from './package.json';

export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production';

	return {
		plugins: [
			react(),
			libInjectCss(),
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
			lib: {
				entry   : 'src/index.tsx',
				name    : 'ThemeSwitcher',
				fileName: () =>
					isProduction
						? `theme-switcher-${version}.min.js`
						: `theme-switcher-${version}.js`,
				formats: [ 'iife' ],
			},
			rollupOptions: {
				external: [
					'react',
					'react-dom',
				],
				output: {
					globals: {
						'react'    : 'React',
						'react-dom': 'ReactDOM',
					},
				},
			},
			minify     : isProduction ? 'esbuild' : false,
			emptyOutDir: false,
		},
		define: {
			'process.env.NODE_ENV': JSON.stringify(process.env['NODE_ENV'] || 'development'),
		},
	};
});
