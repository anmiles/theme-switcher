import { useState } from 'react';

import { UserProvider } from './lib/providers/userProvider';
import { SystemProvider } from './lib/providers/systemProvider';
import './styles/themeSwitcher.css';

interface AppProps {
	readonly svgRoot : string;
}

export default function App({ svgRoot }: AppProps) {
	const userProvider   = new UserProvider();
	const systemProvider = new SystemProvider();

	const [ userTheme, setUserTheme ]     = useState(userProvider.get());
	const [ systemTheme, setSystemTheme ] = useState(systemProvider.get());

	const theme = userTheme ?? systemTheme;
	document.body.setAttribute('data-theme', theme);

	userProvider.on('change', setUserTheme);
	systemProvider.on('change', setSystemTheme);
	systemProvider.watch();

	return (
		<div
			className="themeSwitcher"
			onClick={ () => {
				userProvider.changeTheme(userTheme);
			} }
		>
			{ userTheme === undefined && <svg><use href={ `${svgRoot}/system.svg#svg` } /></svg> }
			{ userTheme === 'light' && <svg><use href={ `${svgRoot}/light.svg#svg` } /></svg> }
			{ userTheme === 'dark' && <svg><use href={ `${svgRoot}/dark.svg#svg` } /></svg> }
		</div>
	);
}
