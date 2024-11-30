import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

interface ThemeSwitcherProps {
	svgRoot : string;
}

class ThemeSwitcher {
	constructor(private readonly props: ThemeSwitcherProps) {}

	public render(parentNode: HTMLElement) {
		const root = createRoot(parentNode);

		root.render(
			<StrictMode>
				<App svgRoot={ this.props.svgRoot } />
			</StrictMode>,
		);
	}
}

export { ThemeSwitcher };

