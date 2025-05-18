import { getThemeName, isTheme } from '../lib/theme';

describe('src/lib/theme', () => {
	describe('isTheme', () => {
		it('should return true if argument is theme', () => {
			expect(isTheme('light')).toBe(true);
			expect(isTheme('dark')).toBe(true);
		});

		it('should return false if argument is not a theme', () => {
			expect(isTheme('unknown')).toBe(false);
			expect(isTheme(undefined)).toBe(false);
		});
	});

	describe('getThemeName', () => {
		it('should match theme names', () => {
			expect(getThemeName('light')).toEqual('Light');
			expect(getThemeName('dark')).toEqual('Dark');
			expect(getThemeName(undefined)).toEqual('System');
		});
	});
});
