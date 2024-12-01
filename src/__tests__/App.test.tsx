import { render, screen, fireEvent, act } from '@testing-library/react';
import type { UserProvider } from '../providers/userProvider';
import type { SystemProvider } from '../providers/systemProvider';
import App from '../App';
import type { Theme } from '../lib/theme';
import { EventEmitter } from '../lib/eventEmitter';

let userTheme: Theme | undefined;
let systemTheme: Theme;

const svgRoot = './images';

const userEventEmitter   = new EventEmitter<{ change : [Theme | undefined] }>();
const systemEventEmitter = new EventEmitter<{ change : [Theme | undefined] }>();

const userProvider: Partial<InstanceType<typeof UserProvider>> = {
	get         : jest.fn().mockImplementation(() => userTheme),
	changeTheme : jest.fn(),
	on          : jest.fn().mockImplementation(userEventEmitter.on.bind(userEventEmitter)),
	off         : jest.fn().mockImplementation(userEventEmitter.off.bind(userEventEmitter)),
};

const systemProvider: Partial<InstanceType<typeof SystemProvider>> = {
	get   : jest.fn().mockImplementation(() => systemTheme),
	watch : jest.fn(),
	on    : jest.fn().mockImplementation(systemEventEmitter.on.bind(systemEventEmitter)),
	off   : jest.fn().mockImplementation(systemEventEmitter.on.bind(systemEventEmitter)),
};

jest.mock<{ UserProvider : typeof UserProvider }>('../providers/userProvider', () => ({
	UserProvider : jest.fn().mockImplementation(() => userProvider),
}));

jest.mock<{ SystemProvider : typeof SystemProvider }>('../providers/systemProvider', () => ({
	SystemProvider : jest.fn().mockImplementation(() => systemProvider),
}));

afterEach(() => {
	document.body.removeAttribute('data-theme');
});

describe('src/App', () => {
	describe('html', () => {
		it('should contain system svg if user theme is not defined', () => {
			userTheme = undefined;

			render(<App svgRoot={ svgRoot } />);

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher.innerHTML).toEqual('<svg><use href="./images/system.svg#svg"></use></svg>');
		});

		it('should contain light svg if user theme is light', () => {
			userTheme = 'light';

			render(<App svgRoot={ svgRoot } />);

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher.innerHTML).toEqual('<svg><use href="./images/light.svg#svg"></use></svg>');
		});

		it('should contain dark svg if user theme is dark', () => {
			userTheme = 'dark';

			render(<App svgRoot={ svgRoot } />);

			const themeSwitcher = screen.getByTestId('theme-switcher');
			expect(themeSwitcher.innerHTML).toEqual('<svg><use href="./images/dark.svg#svg"></use></svg>');
		});
	});
	describe('data-theme', () => {
		it('should be forced to user theme (light)', () => {
			systemTheme = 'dark';
			userTheme   = 'light';

			render(<App svgRoot={ svgRoot } />);

			expect(document.body.getAttribute('data-theme')).toBe('light');
		});

		it('should be forced to user theme (dark)', () => {
			systemTheme = 'light';
			userTheme   = 'dark';

			render(<App svgRoot={ svgRoot } />);

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should fallback to system theme(light) if user theme is not set', () => {
			userTheme   = undefined;
			systemTheme = 'light';

			render(<App svgRoot={ svgRoot } />);

			expect(document.body.getAttribute('data-theme')).toBe('light');
		});

		it('should fallback to system theme(dark) if user theme is not set', () => {
			userTheme   = undefined;
			systemTheme = 'dark';

			render(<App svgRoot={ svgRoot } />);

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should be changed on change user provider', () => {
			userTheme = 'light';

			render(<App svgRoot={ svgRoot } />);

			expect(document.body.getAttribute('data-theme')).toBe('light');

			act(() => {
				userEventEmitter['emit']('change', 'dark');
			});

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should be changed on change system provider if user theme is not defined', () => {
			userTheme   = undefined;
			systemTheme = 'light';

			render(<App svgRoot={ svgRoot } />);

			expect(document.body.getAttribute('data-theme')).toBe('light');

			act(() => {
				systemEventEmitter['emit']('change', 'dark');
			});

			expect(document.body.getAttribute('data-theme')).toBe('dark');
		});

		it('should be changed on themeSwitcher click', () => {
			systemTheme = 'light';
			userTheme   = 'dark';

			render(<App svgRoot={ svgRoot } />);

			act(() => {
				const themeSwitcher = screen.getByTestId('theme-switcher');
				fireEvent.click(themeSwitcher);
			});

			expect(userProvider.changeTheme).toHaveBeenCalledWith(userTheme);
		});
	});
});

