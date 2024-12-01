# @anmiles/theme-switcher

Theme switcher for websites

----

## Installation

### For React+TS project

_Work in progress_

### For static HTML website

1. Clone repository:
    ```bash
    git clone https://github.com/anmiles/theme-switcher.git
    ```

2. Copy all files from `./theme-switcher/dist` into the target website.

3. Define the path containing just copied images (i.e. `./my-images-path/`)

4. Create HTML container for theme switcher:

    ```html
    <div class="my-selector"></div>
    ```

5. Include React library and theme switcher:

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

6. Place theme switcher into container:

    ```html
    <script type="text/javascript">
        new ThemeSwitcher({ svgRoot: './my-images-path/' })
            .render(document.querySelector('.my-selector'));
    </script>
    ```

## Usage

Use selectors to write theme-specific styles:

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
