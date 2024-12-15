import { EventEmitter } from '../lib/eventEmitter';
import { isTheme  } from '../lib/theme';
import type { Theme } from '../lib/theme';

class UserProvider extends EventEmitter<{ change : [Theme | undefined] }> {
	private readonly storageKey = 'theme';

	public get(): Theme | undefined {
		const theme = localStorage.getItem(this.storageKey);
		return isTheme(theme) ? theme : undefined;
	}

	public set(theme: Theme | undefined): void {
		if (theme) {
			localStorage.setItem(this.storageKey, theme);
		} else {
			localStorage.removeItem(this.storageKey);
		}

		this.emit('change', theme);
	}
}

export { UserProvider };
