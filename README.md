<h1 align="center">React Yandex Navigator</h1>

<p align="center">

<img src="https://img.shields.io/badge/nextjs-13.4.5-black" >
<img src="https://img.shields.io/badge/leaflet-1.9.4-green" >
<img src="https://img.shields.io/badge/typescript-5.1.3-blue" >

</p>

This is a copy of the web version of Yandex Navigator, developed with [NextJS](https://nextjs.org/) and [Leaflet](https://leafletjs.com/)

Created by [breazzz](https://github.com/Breazzz)

---

# [View a demo](https://react-yandex-navigator.netlify.app/)

<img width="520" src="./public/yamap.gif" >

## Modular architecture

React Module Architecture to break down the project into independent modules for easier development and maintenance.

<pre>
├── app/
    ├── layout.tsx              # NextJS Layout
    └── page.tsx                # NextJS Page
├── assets/                     # Global styles
├── components/                 # Global components
├── hooks/                      # Custom hooks
├── modules/                    # Modules
    └── SampleModule/
        ├── api
        ├── components
        ├── constants
        ├── enums
        ├── store               # Module store
        ├── styles
        ├── types
        ├── utils
        └── index.ts
├── store/                      # Global store
├── .env                        # Environment variables configuration file
├── .eslintrc                   # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── README.md                   # Project description file (you are reading it right now)
</pre>

Typical structure of a component on the example of a conditional `SampleComponent`.

The directory name is the same as the component name.

#### Entry Point

- `components/SampleComponent/index.ts`
- `pages/SamplePage/index.ts`

File `index.ts` contains only the necessary exports.

```tsx
export { SampleComponent } from './SampleComponent'
export { SampleComponentProps } from './SampleComponent/SampleComponent.types'
```

### Function naming inside

Custom event function names (onClick, onChange, etc.) must start with
with the prefix `handle`, for example `handleClick`, `handleOutsideClick`, `handleChange`.

```tsx
  <Button onClick={handleButtonClick} />
  <Input onChange={handleInputChange} />
```

If the function is not a custom event, then prefixes must be used in the name
function descriptions: `set`, `get`, `update`, etc., for example: `getSampleParams()`, `normalizeSampleName()`.

### Order of imports (blocks are separated by an empty line)

- React, {hooks}, libs
- components
- utils/helpers/hooks/constants/redux/mocks
- types/interface's
- styles
- images

## Getting Started

`node >= v16.13.0`

```bash
yarn
```

##### Development mode
```bash
yarn dev
```

##### Production mode
```bash
yarn build
yarn start
```
##### .env configuration example

```bash
NEXT_PUBLIC_DADATA_TOKEN=YOUR_KEY
NEXT_PUBLIC_HISTORY_API=YOUR_HISTORY_API
```