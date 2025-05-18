import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import type { AppProps } from './components/App';
import App from './components/App';

export class Element {
	constructor(private readonly props: AppProps) {}

	public render(parentNode: HTMLElement) {
		const root = createRoot(parentNode);

		root.render(
			<StrictMode>
				<App { ...this.props } />
			</StrictMode>,
		);
	}
}

export { App as ThemeSwitcher };
