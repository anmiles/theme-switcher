# @anmiles/theme-switcher

Theme switcher for websites

----

## Installation

### For React+TS project

1. Install package:
    ```bash
    npm install @anmiles/theme-switcher
    ```

2. Import component:
    ```ts
    import { ThemeSwitcher } from '@anmiles/theme-switcher';
    ```

3. Use component:
    ```ts
    <ThemeSwitcher float="right" />
    ```
    where
    - `float` _(optional)_ - position of icon and dropdown box

### For static HTML website

1. Clone repository:
    ```bash
    git clone https://github.com/anmiles/theme-switcher.git
    ```

2. Copy all files from `dist` into the target website.

4. Create HTML container for theme switcher:

    ```html
    <div class="my-selector"></div>
    ```

5. Include React library and theme switcher:

    ### Development

    ```html
    <script type="text/javascript" src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    <script type="text/javascript" src="./theme-switcher-1.0.0.js"></script>
    ```

    ### Production

    ```html
    <script type="text/javascript" src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
    <script type="text/javascript" src="./theme-switcher-1.0.0.min.js"></script>
    ```

6. Place theme switcher into container:

    ```html
    <script type="text/javascript">
        new ThemeSwitcher({ float: 'right' })
            .render(document.querySelector('.my-selector'));
    </script>
    ```
    where
    - `float` _(optional)_ - position of icon and dropdown box

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
