import { EventEmitter } from '../eventEmitter';
import { isTheme, themes  } from '../theme';
import type { Theme } from '../theme';

class UserProvider extends EventEmitter<{ change : [Theme | undefined] }> {
	private readonly storageKey = 'theme';
	private readonly userThemes = [ undefined, ...themes ];

	public get(): Theme | undefined {
		const theme = localStorage.getItem(this.storageKey);
		return isTheme(theme) ? theme : undefined;
	}

	public changeTheme(userTheme: Theme | undefined): void {
		const index         = this.userThemes.indexOf(userTheme);
		const nextIndex     = (index + 1) % this.userThemes.length;
		const nextUserTheme = this.userThemes[nextIndex];

		if (nextUserTheme) {
			localStorage.setItem(this.storageKey, nextUserTheme);
		} else {
			localStorage.removeItem(this.storageKey);
		}

		this.emit('change', nextUserTheme);
	}
}

export { UserProvider };
