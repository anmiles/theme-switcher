# @anmiles/theme-switcher

Theme switcher for websites

----

## Installation

```bash
git clone https://github.com/anmiles/theme-switcher.git
cd theme-switcher
npm clean-install
npm run build
```

## Usage

### Development

1. Copy `dist/theme-switcher.js` to the target website.
2. Include
    ```html
    <div class="my-selector"></div>

    <script type="text/javascript" src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
    <script type="text/javascript" src="./theme-switcher.min.js"></script>
    <script type="text/javascript">themeSwitcher(document.querySelector('.my-selector'));</script>
    ```

### Production

1. Copy `dist/theme-switcher.min.js` to the target website.
2. Include
    ```html
    <div class="my-selector"></div>

    <script type="text/javascript" src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    <script type="text/javascript" src="./theme-switcher.js"></script>
    <script type="text/javascript">themeSwitcher(document.querySelector('.my-selector'));</script>
    ```

## Theme-specific CSS selectors

Use selectors to write theme-specific styles:
- `body[data-theme="light"]`
- `body[data-theme="dark"]`

Or you can write default styles for light theme and only override them using `body[data-theme="dark"]` for dark theme.
