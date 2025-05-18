import type { Theme } from '../lib/theme';

import Dark from './icons/Dark';
import Light from './icons/Light';
import System from './icons/System';

interface IconProps {
	readonly theme: Theme | undefined;
}

export default function Icon({ theme }: IconProps) {
	switch (theme) {
		case 'light':
			return <Light />;
		case 'dark':
			return <Dark />;
		case undefined:
		default:
			return <System />;
	}
}
