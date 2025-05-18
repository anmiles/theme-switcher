import { configs } from '@anmiles/eslint-config';
import type { Linter } from 'eslint';

export default [
	...configs.base,
	...configs.ts,
	...configs.jest,
	...configs.react,

	{
		ignores: [
			'coverage/*',
			'dist/*',
		],
	},
] as Linter.Config[];
