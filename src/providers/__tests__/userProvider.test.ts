import { UserProvider } from '../userProvider';

const storageKey = 'theme';
const changeSpy  = jest.fn();
let userProvider: UserProvider;

beforeEach(() => {
	window.localStorage.clear();
	userProvider = new UserProvider();
	userProvider.on('change', changeSpy);
});

describe('src/providers/userProvider', () => {
	describe('get', () => {
		it('should return light theme if set in localStorage', () => {
			window.localStorage.setItem(storageKey, 'light');

			expect(userProvider.get()).toEqual('light');
		});

		it('should return dark theme if set in localStorage', () => {
			window.localStorage.setItem(storageKey, 'dark');

			expect(userProvider.get()).toEqual('dark');
		});

		it('should return undefined if unknown string set in localStorage', () => {
			window.localStorage.setItem(storageKey, 'unknown');

			expect(userProvider.get()).toEqual(undefined);
		});

		it('should return undefined if not set in localStorage', () => {
			expect(userProvider.get()).toEqual(undefined);
		});
	});

	describe('changeTheme', () => {
		it('should switch system theme to light theme', () => {
			userProvider.changeTheme(undefined);

			expect(changeSpy).toHaveBeenCalledWith('light');
			expect(localStorage.getItem(storageKey)).toEqual('light');
		});

		it('should switch light theme to dark theme', () => {
			userProvider.changeTheme('light');

			expect(changeSpy).toHaveBeenCalledWith('dark');
			expect(localStorage.getItem(storageKey)).toEqual('dark');
		});

		it('should switch dark theme to system theme', () => {
			userProvider.changeTheme('dark');

			expect(changeSpy).toHaveBeenCalledWith(undefined);
			expect(localStorage.getItem(storageKey)).toEqual(null);
		});
	});
});
