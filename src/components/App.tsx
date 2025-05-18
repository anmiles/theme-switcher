import '../styles/style.css';

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { SystemProvider } from '../providers/systemProvider';
import { UserProvider } from '../providers/userProvider';

import Icon from './Icon';
import ThemeSelector from './ThemeSelector';

export interface AppProps {
	readonly float?: CSSProperties['float'];
}

export default function App({ float }: AppProps) {
	const userProvider   = useMemo(() => new UserProvider(), []);
	const systemProvider = useMemo(() => new SystemProvider(), []);

	const [ userTheme, setUserTheme ]     = useState(userProvider.get());
	const [ systemTheme, setSystemTheme ] = useState(systemProvider.get());
	const [ showList, setShowList ]       = useState(false);

	const theme = userTheme ?? systemTheme;

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
		userProvider.on('change', setUserTheme);
		systemProvider.on('change', setSystemTheme);
		systemProvider.watch();
	}, [ theme, userProvider, systemProvider ]);

	return (
		<div
			className="themeSwitcher"
			data-testid="theme-switcher"
			data-float={ float }
			onClick={ () => {
				setShowList(!showList);
			} }
		>
			<Icon theme={ theme } />

			{ !showList
				? null
				: (
						<ThemeSelector
							currentUserTheme={ userTheme }
							onListItemClick={ (theme) => {
								userProvider.set(theme);
								setShowList(false);
							} }
						/>
					) }
		</div>
	);
}
