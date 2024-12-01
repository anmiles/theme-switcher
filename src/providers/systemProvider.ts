import { EventEmitter } from '../lib/eventEmitter';
import { defaultTheme, themes } from '../lib/theme';
import type { Theme } from '../lib/theme';

class SystemProvider extends EventEmitter<{ change : [Theme] }> {

	public get(): Theme {
		if (!('matchMedia' in window)) {
			return defaultTheme;
		}

		for (const theme of themes) {
			const mediaQueryList = window.matchMedia(`(prefers-color-scheme: ${theme})`);

			if (mediaQueryList.matches) {
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
			const mediaQueryList = window.matchMedia(`(prefers-color-scheme: ${theme})`);

			mediaQueryList.addEventListener('change', (ev) => {
				if (ev.matches) {
					this.emit('change', theme);
				}
			});
		}
	}
}

export { SystemProvider };
