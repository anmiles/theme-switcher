import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';

import App from '../components/App';
import { Element } from '../index';

const testId = 'app-test-id';

jest.mock('../components/App');
jest.mocked(App).mockReturnValue(<div data-testid={ testId }></div>);

describe('src/index', () => {
	describe('ThemeSwitcher', () => {
		it('should render App and pass float prop', () => {
			const parentNode = document.createElement('div');
			document.body.appendChild(parentNode);

			act(() => {
				new Element({ float: 'left' }).render(parentNode);
			});

			const app = screen.getByTestId(testId);

			expect(parentNode).toContainElement(app);
		});
	});
});
