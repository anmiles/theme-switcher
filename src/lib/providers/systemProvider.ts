import { EventEmitter } from '../eventEmitter';
import { defaultTheme, themes } from '../theme';
import type { Theme } from '../theme';

class SystemProvider extends EventEmitter<{ change : [Theme] }> {

	public get(): Theme {
		if (!('matchMedia' in window)) {
			return defaultTheme;
		}

		for (const theme of themes) {
			const query = window.matchMedia(`(prefers-color-scheme: ${theme})`);

			if (query.matches) {
				return theme;
			}
		}

		return defaultTheme;
	}

	public watch(): void {
		if (!('matchMedia' in window)) {
			return;
		}

		for (const theme of themes) {
			const query = window.matchMedia(`(prefers-color-scheme: ${theme})`);

			query.addEventListener('change', (ev) => {
				if (ev.matches) {
					this.emit('change', theme);
				}
			});
		}
	}
}

export { SystemProvider };
