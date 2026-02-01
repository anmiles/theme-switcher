import { EventEmitter } from '../../lib/eventEmitter';
import type { Theme } from '../../lib/theme';
import { defaultTheme } from '../../lib/theme';
import { SystemProvider } from '../systemProvider';

let systemProvider: SystemProvider;
const changeSpy = jest.fn();

class MediaQueryListEvents extends EventEmitter<{ change: [Partial<MediaQueryListEvent>] }> {}

const mediaQueryListEvents: Record<Theme, InstanceType<typeof MediaQueryListEvents>> = {
	light: new MediaQueryListEvents(),
	dark : new MediaQueryListEvents(),
};

let systemPreference: Theme | undefined;

beforeEach(() => {
	localStorage.clear();
	systemProvider = new SystemProvider();
	systemProvider.on('change', changeSpy);
	systemPreference = undefined;

	window.matchMedia = jest.fn().mockImplementation((query: string): Partial<MediaQueryList> => {
		const parsedTheme = /\(prefers-color-scheme: (.*)\)/.exec(query)?.[1] as Theme; // eslint-disable-line @typescript-eslint/no-unsafe-type-assertion

		return {
			matches         : parsedTheme === systemPreference,
			addEventListener: (
				event: keyof MediaQueryListEventMap,
				listener: (ev: Partial<MediaQueryListEvent>) => void,
			) => {
				mediaQueryListEvents[parsedTheme].on(event, listener);
			},
		};
	});
});

describe('src/providers/systemProvider', () => {
	describe('get', () => {
		it('should return defaultTheme if window.matchMedia is not defined', () => {
			// @ts-expect-error window always has matchMedia
			delete window.matchMedia;
			expect(systemProvider.get()).toEqual(defaultTheme);
		});

		it('should return defaultTheme if nothing preferred', () => {
			expect(systemProvider.get()).toEqual(defaultTheme);
		});

		it('should return light theme if preferred', () => {
			systemPreference = 'light';
			expect(systemProvider.get()).toEqual('light');
		});

		it('should return dark theme if preferred', () => {
			systemPreference = 'dark';
			expect(systemProvider.get()).toEqual('dark');
		});
	});

	describe('watch', () => {
		it('should never emit change events if window.matchMedia is not defined', () => {
			// @ts-expect-error window always has matchMedia
			delete window.matchMedia;
			systemProvider.watch();
			mediaQueryListEvents.light['emit']('change', { matches: true });
			mediaQueryListEvents.dark['emit']('change', { matches: true });

			expect(changeSpy).not.toHaveBeenCalled();
		});

		it('should never emit change events if not called', () => {
			mediaQueryListEvents.light['emit']('change', { matches: true });
			mediaQueryListEvents.dark['emit']('change', { matches: true });

			expect(changeSpy).not.toHaveBeenCalled();
		});

		it('should emit change event on mediaQueryList change for light theme with match', () => {
			systemProvider.watch();
			mediaQueryListEvents.light['emit']('change', { matches: true });

			expect(changeSpy).toHaveBeenCalledWith('light');
		});

		it('should emit change event on mediaQueryList change for dark theme with match', () => {
			systemProvider.watch();
			mediaQueryListEvents.dark['emit']('change', { matches: true });

			expect(changeSpy).toHaveBeenCalledWith('dark');
		});

		it('should not emit change event on mediaQueryList changes with no match', () => {
			systemProvider.watch();
			mediaQueryListEvents.light['emit']('change', { matches: false });
			mediaQueryListEvents.dark['emit']('change', { matches: false });

			expect(changeSpy).not.toHaveBeenCalled();
		});
	});
});
