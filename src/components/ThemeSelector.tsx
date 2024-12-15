import type { Theme } from '../lib/theme';
import { getThemeName, themes } from '../lib/theme';
import Icon from './Icon';
import Checked from './icons/Checked';

interface ThemeSelectorProps {
	readonly currentUserTheme : Theme | undefined;
	readonly onListItemClick  : (theme: Theme | undefined) => void;
}

export default function ThemeSelector({ currentUserTheme, onListItemClick }: ThemeSelectorProps) {

	return (
		<ul data-testid="theme-selector">
			{ [ ...themes, undefined ].map((theme) => {
				const themeName = getThemeName(theme);

				return (
					<li
						key={ themeName }
						data-testid={ `theme-item-${themeName.toLowerCase()}` }
						onClick={ () => {
							onListItemClick(theme);
						} }
					>
						<Icon theme={ theme } />
						<span>{ themeName }</span>
						{ currentUserTheme === theme && <Checked /> }
					</li>
				);
			}) }
		</ul>
	);
}
