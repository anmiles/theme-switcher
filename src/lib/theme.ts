const themes = [ 'light', 'dark' ] as const;
type Theme = typeof themes[number];
const defaultTheme: Theme = 'light';

function isTheme(arg: unknown): arg is Theme {
	return typeof arg === 'string' && themes.includes(arg as Theme);
}

function getThemeName(theme: Theme | undefined): string {
	switch (theme) {
		case 'light':
			return 'Light';
		case 'dark':
			return 'Dark';
		default:
			return 'System';
	}
}

export type { Theme };
export { themes, defaultTheme, isTheme, getThemeName };
