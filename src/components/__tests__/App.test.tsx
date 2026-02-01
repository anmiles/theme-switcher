import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { EventEmitter } from '../../lib/eventEmitter';
import type { Theme } from '../../lib/theme';
import { SystemProvider } from '../../providers/systemProvider';
import { UserProvider } from '../../providers/userProvider';
import type { AppProps } from '../App';
import App from '../App';
import Checked from '../icons/Checked';
import Dark from '../icons/Dark';
import Light from '../icons/Light';
import System from '../icons/System';

jest.mock('../icons/Checked');
jest.mock('../icons/Dark');
jest.mock('../icons/Light');
jest.mock('../icons/System');

jest.mock('../../providers/userProvider');
jest.mock('../../providers/systemProvider');

let userTheme: Theme | undefined;
let systemTheme: Theme;

function renderApp({ float }: AppProps) {
	render(
		<App float={ float } />,
	);
}

const userEventEmitter   = new EventEmitter<{ change: [Theme | undefined] }>();
const systemEventEmitter = new EventEmitter<{ change: [Theme | undefined] }>();

const userProvider: Partial<InstanceType<typeof UserProvider>> = {
	get: jest.fn().mockImplementation(() => userTheme),

	set: jest.fn().mockImplementation((theme: Theme | undefined) => {
		userEventEmitter['emit']('change', theme);
	}),

	on : jest.fn().mockImplementation(userEventEmitter.on.bind(userEventEmitter)),
	off: jest.fn().mockImplementation(userEventEmitter.off.bind(userEventEmitter)),
};

const systemProvider: Partial<InstanceType<typeof SystemProvider>> = {
	get  : jest.fn().mockImplementation(() => systemTheme),
	watch: jest.fn(),
	on   : jest.fn().mockImplementation(systemEventEmitter.on.bind(systemEventEmitter)),
	off  : jest.fn().mockImplementation(systemEventEmitter.on.bind(systemEventEmitter)),
};

jest.mocked(Checked).mockReturnValue(<div data-testid="mock-icon-checked" />);
jest.mocked(Dark).mockReturnValue(<div data-testid="mock-icon-dark" />);
jest.mocked(Light).mockReturnValue(<div data-testid="mock-icon-light" />);
jest.mocked(System).mockReturnValue(<div data-testid="mock-icon-system" />);

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
jest.mocked(UserProvider).mockReturnValue(userProvider as UserProvider);
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
jest.mocked(SystemProvider).mockReturnValue(systemProvider as SystemProvider);

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
			expect(themeSwitcher).toContainElement(screen.getByTestId('mock-icon-light'));
		});

		it('should match dark system theme if user theme is not defined', () => {
			userTheme   = undefined;
			systemTheme = 'dark';

			renderApp({});

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher).toContainElement(screen.getByTestId('mock-icon-dark'));
		});

		it('should match light user theme despite of system theme', () => {
			userTheme   = 'light';
			systemTheme = 'dark';

			renderApp({});

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher).toContainElement(screen.getByTestId('mock-icon-light'));
		});

		it('should match dark user theme despite of system theme', () => {
			userTheme   = 'dark';
			systemTheme = 'light';

			renderApp({});

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher).toContainElement(screen.getByTestId('mock-icon-dark'));
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
				renderApp({ float: 'left' });

				const themeSwitcher = screen.getByTestId('theme-switcher');
				expect(themeSwitcher.getAttribute('data-float')).toEqual('left');
			});

			it('should be set right from float prop', () => {
				renderApp({ float: 'right' });

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
