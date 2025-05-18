export const themes = [ 'light', 'dark' ] as const;
export type Theme = typeof themes[number];
export const defaultTheme: Theme = 'light';

export function isTheme(arg: unknown): arg is Theme {
	return typeof arg === 'string' && themes.map(String).includes(arg);
}

export function getThemeName(theme: Theme | undefined): string {
	switch (theme) {
		case 'light':
			return 'Light';
		case 'dark':
			return 'Dark';
		case undefined:
		default:
			return 'System';
	}
}
