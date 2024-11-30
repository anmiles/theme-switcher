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

1. Copy all files from `dist/` into the target website.

2. Define the path containing images copied (i.e. `./my-images-path/`)

3. Create HTML container for theme switcher:

    ```html
    <div class="my-selector"></div>
    ```

4. Include React library and theme switcher:

    ### Development

    ```html
    <script type="text/javascript" src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    <script type="text/javascript" src="./theme-switcher.js"></script>
    ```

    ### Production

    ```html
    <script type="text/javascript" src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
    <script type="text/javascript" src="./theme-switcher.min.js"></script>
    ```

5. Place theme switcher into container:

    ```html
    <script type="text/javascript">
        new ThemeSwitcher({ svgRoot: './my-images-path/' })
            .render(document.querySelector('.my-selector'));
    </script>
    ```

6. Use selectors to write theme-specific styles:

    ```css
        body[data-theme="light"] .selector {
            /* css rules */
        }
    ```

    ```css
        body[data-theme="dark"] .selector {
            /* css rules */
        }
    ```

    Or you can just write default styles for light theme and override them for dark theme using `body[data-theme="dark"]`.
