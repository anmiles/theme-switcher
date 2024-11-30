import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function themeSwitcher(parentNode: HTMLElement): void {
	const root = createRoot(parentNode);

	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}

export { themeSwitcher };
export default { themeSwitcher };

