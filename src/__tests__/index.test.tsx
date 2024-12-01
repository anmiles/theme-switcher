import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import type App from '../App';
import { ThemeSwitcher } from '../index';

const svgRoot = './images';
const testId  = 'app-test-id';

jest.mock<typeof App>('../App', () => function App({ svgRoot }) {
	return <div data-testid={ testId }>{ svgRoot }</div>;
});

describe('src/index', () => {
	describe('ThemeSwitcher', () => {
		it('should render App', () => {
			const parentNode = document.createElement('div');
			document.body.appendChild(parentNode);

			act(() => {
				new ThemeSwitcher({ svgRoot }).render(parentNode);
			});

			const app = parentNode.querySelector(`[data-testid="${testId}"]`);
			expect(app?.innerHTML).toEqual(svgRoot);
		});
	});
});
