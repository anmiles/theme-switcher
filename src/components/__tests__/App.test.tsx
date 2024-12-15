import { render, screen, fireEvent, act } from '@testing-library/react';
import type { UserProvider } from '../../providers/userProvider';
import type { SystemProvider } from '../../providers/systemProvider';
import type { AppProps } from '../App';
import App from '../App';
import { EventEmitter } from '../../lib/eventEmitter';
import type { Theme } from '../../lib/theme';
import '@testing-library/jest-dom';

jest.mock('../icons/Checked.tsx', () => function Checked() {
	return '{checked}';
});

jest.mock('../icons/Dark.tsx', () => function Dark() {
	return '{dark}';
});

jest.mock('../icons/Light.tsx', () => function Light() {
	return '{light}';
});

jest.mock('../icons/System.tsx', () => function System() {
	return '{system}';
});

let userTheme: Theme | undefined;
let systemTheme: Theme;

const userEventEmitter   = new EventEmitter<{ change : [Theme | undefined] }>();
const systemEventEmitter = new EventEmitter<{ change : [Theme | undefined] }>();

const userProvider: Partial<InstanceType<typeof UserProvider>> = {
	get : jest.fn().mockImplementation(() => userTheme),

	set : jest.fn().mockImplementation((theme: Theme | undefined) => {
		userEventEmitter['emit']('change', theme);
	}),

	on  : jest.fn().mockImplementation(userEventEmitter.on.bind(userEventEmitter)),
	off : jest.fn().mockImplementation(userEventEmitter.off.bind(userEventEmitter)),
};

const systemProvider: Partial<InstanceType<typeof SystemProvider>> = {
	get   : jest.fn().mockImplementation(() => systemTheme),
	watch : jest.fn(),
	on    : jest.fn().mockImplementation(systemEventEmitter.on.bind(systemEventEmitter)),
	off   : jest.fn().mockImplementation(systemEventEmitter.on.bind(systemEventEmitter)),
};

jest.mock<{ UserProvider : typeof UserProvider }>('../../providers/userProvider', () => ({
	UserProvider : jest.fn().mockImplementation(() => userProvider),
}));

jest.mock<{ SystemProvider : typeof SystemProvider }>('../../providers/systemProvider', () => ({
	SystemProvider : jest.fn().mockImplementation(() => systemProvider),
}));

function renderApp({ float }: AppProps) {
	render(
		<App float={ float } />,
	);
}

afterEach(() => {
	document.body.removeAttribute('data-theme');
});

describe('src/App', () => {
	describe('theme', () => {
		function clickDropdownItem(theme: Theme | 'system'): void {
			renderApp({});

			const themeSwitcher = screen.getByTestId('theme-switcher');

			act(() => {
				fireEvent.click(themeSwitcher);
			});

			const dropdownItemTestId = `theme-item-${theme}`;
			const dropdownItem       = screen.queryByTestId(dropdownItemTestId);

			if (!dropdownItem) {
				throw new Error(`Dropdown does not have an item with test id ${dropdownItemTestId}`);
			}

			act(() => {
				fireEvent.click(dropdownItem);
			});
		}

		it('should be forced to user theme (light)', () => {
			systemTheme = 'dark';
			userTheme   = 'light';

			renderApp({});

			expect(document.body.getAttribute('data-theme')).toBe('light');
		});

		it('should be forced to user theme (dark)', () => {
			systemTheme = 'light';
			userTheme   = 'dark';

			renderApp({});

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should fallback to system theme(light) if user theme is not set', () => {
			userTheme   = undefined;
			systemTheme = 'light';

			renderApp({});

			expect(document.body.getAttribute('data-theme')).toBe('light');
		});

		it('should fallback to system theme(dark) if user theme is not set', () => {
			userTheme   = undefined;
			systemTheme = 'dark';

			renderApp({});

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should be changed on change user provider', () => {
			userTheme = 'light';

			renderApp({});

			expect(document.body.getAttribute('data-theme')).toBe('light');

			act(() => {
				userEventEmitter['emit']('change', 'dark');
			});

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should be changed on change system provider if user theme is not defined', () => {
			userTheme   = undefined;
			systemTheme = 'light';

			renderApp({});

			expect(document.body.getAttribute('data-theme')).toBe('light');

			act(() => {
				systemEventEmitter['emit']('change', 'dark');
			});

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should change to dark if dark item chosen', () => {
			systemTheme = 'light';
			userTheme   = 'light';

			clickDropdownItem('dark');

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should change to light if light item chosen', () => {
			systemTheme = 'dark';
			userTheme   = 'dark';

			clickDropdownItem('light');

			expect(document.body.getAttribute('data-theme')).toBe('light');
		});

		it('should change to system dark if system item chosen', () => {
			systemTheme = 'dark';
			userTheme   = 'light';

			clickDropdownItem('system');

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should change to system light if system item chosen', () => {
			systemTheme = 'light';
			userTheme   = 'dark';

			clickDropdownItem('system');

			expect(document.body.getAttribute('data-theme')).toBe('light');
		});
	});

	describe('icon', () => {
		it('should match light system theme if user theme is not defined', () => {
			userTheme   = undefined;
			systemTheme = 'light';

			renderApp({});

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher.innerHTML).toEqual('{light}');
		});

		it('should match dark system theme if user theme is not defined', () => {
			userTheme   = undefined;
			systemTheme = 'dark';

			renderApp({});

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher.innerHTML).toEqual('{dark}');
		});

		it('should match light user theme despite of system theme', () => {
			userTheme   = 'light';
			systemTheme = 'dark';

			renderApp({});

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher.innerHTML).toEqual('{light}');
		});

		it('should match dark user theme despite of system theme', () => {
			userTheme   = 'dark';
			systemTheme = 'light';

			renderApp({});

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher.innerHTML).toEqual('{dark}');
		});
	});

	describe('switcher', () => {
		describe('html', () => {

			function actOnThemeSwitcher(): HTMLElement {
				renderApp({});

				const themeSwitcher = screen.getByTestId('theme-switcher');

				act(() => {
					fireEvent.click(themeSwitcher);
				});

				return themeSwitcher;
			}

			it('should match snapshot on light system theme', () => {
				userTheme   = undefined;
				systemTheme = 'light';

				expect(actOnThemeSwitcher()).toMatchSnapshot();
			});

			it('should match snapshot on dark system theme', () => {
				userTheme   = undefined;
				systemTheme = 'light';

				expect(actOnThemeSwitcher()).toMatchSnapshot();
			});

			it('should match snapshot on light user theme', () => {
				userTheme   = 'light';
				systemTheme = 'dark';

				expect(actOnThemeSwitcher()).toMatchSnapshot();
			});

			it('should match snapshot on dark user theme', () => {
				userTheme   = 'dark';
				systemTheme = 'light';

				expect(actOnThemeSwitcher()).toMatchSnapshot();
			});
		});

		describe('data-float', () => {
			it('should be set left from float prop', () => {
				renderApp({ float : 'left' });

				const themeSwitcher = screen.getByTestId('theme-switcher');
				expect(themeSwitcher.getAttribute('data-float')).toEqual('left');
			});

			it('should be set right from float prop', () => {
				renderApp({ float : 'right' });

				const themeSwitcher = screen.getByTestId('theme-switcher');
				expect(themeSwitcher.getAttribute('data-float')).toEqual('right');
			});

			it('should be empty if float prop is not set', () => {
				renderApp({});

				const themeSwitcher = screen.getByTestId('theme-switcher');
				expect(themeSwitcher.getAttribute('data-float')).toEqual(null);
			});
		});

		describe('interaction', () => {
			it('should toggle on themeSwitcher click', () => {
				systemTheme = 'light';
				userTheme   = 'dark';

				renderApp({});

				const themeSwitcher = screen.getByTestId('theme-switcher');

				act(() => {
					fireEvent.click(themeSwitcher);
				});

				expect(screen.queryByTestId('theme-selector')).toBeInTheDocument();

				act(() => {
					fireEvent.click(themeSwitcher);
				});

				expect(screen.queryByTestId('theme-selector')).not.toBeInTheDocument();
			});

			it('should hide on dropdown item click', () => {
				systemTheme = 'light';
				userTheme   = 'dark';

				renderApp({});

				const themeSwitcher = screen.getByTestId('theme-switcher');

				act(() => {
					fireEvent.click(themeSwitcher);
				});

				const dropdownItem = themeSwitcher.querySelector('li');

				if (!dropdownItem) {
					throw new Error('Dropdown does not have items');
				}

				act(() => {
					fireEvent.click(dropdownItem);
				});

				expect(screen.queryByTestId('theme-selector')).not.toBeInTheDocument();
			});
		});
	});
});
