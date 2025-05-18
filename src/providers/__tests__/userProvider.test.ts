import { UserProvider } from '../userProvider';

const storageKey = 'theme';
const changeSpy  = jest.fn();
let userProvider: UserProvider;

beforeEach(() => {
	localStorage.clear();
	userProvider = new UserProvider();
	userProvider.on('change', changeSpy);
});

describe('src/providers/userProvider', () => {
	describe('get', () => {
		it('should return light theme if set in localStorage', () => {
			localStorage.setItem(storageKey, 'light');

			expect(userProvider.get()).toEqual('light');
		});

		it('should return dark theme if set in localStorage', () => {
			localStorage.setItem(storageKey, 'dark');

			expect(userProvider.get()).toEqual('dark');
		});

		it('should return undefined if unknown string set in localStorage', () => {
			localStorage.setItem(storageKey, 'unknown');

			expect(userProvider.get()).toEqual(undefined);
		});

		it('should return undefined if not set in localStorage', () => {
			expect(userProvider.get()).toEqual(undefined);
		});
	});

	describe('set', () => {
		it('should remove theme from localStorage and emit event if undefined passed', () => {
			userProvider.set(undefined);

			expect(changeSpy).toHaveBeenCalledWith(undefined);
			expect(localStorage.getItem(storageKey)).toEqual(null);
		});

		it('should save light theme to localStorage and emit event if light passed', () => {
			userProvider.set('light');

			expect(changeSpy).toHaveBeenCalledWith('light');
			expect(localStorage.getItem(storageKey)).toEqual('light');
		});

		it('should save dark theme to localStorage and emit event if dark passed', () => {
			userProvider.set('dark');

			expect(changeSpy).toHaveBeenCalledWith('dark');
			expect(localStorage.getItem(storageKey)).toEqual('dark');
		});
	});
});
