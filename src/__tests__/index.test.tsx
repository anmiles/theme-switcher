import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import type App from '../components/App';
import { ThemeSwitcherElement } from '../index';

const testId = 'app-test-id';

jest.mock<typeof App>('../components/App', () => function App() {
	return <div>{ testId }</div>;
});

describe('src/index', () => {
	describe('ThemeSwitcher', () => {
		it('should render App and pass float prop', () => {
			const parentNode = document.createElement('div');
			document.body.appendChild(parentNode);

			act(() => {
				new ThemeSwitcherElement({ float : 'left' }).render(parentNode);
			});

			expect(parentNode.innerHTML).toEqual(`<div>${testId}</div>`);
		});
	});
});
