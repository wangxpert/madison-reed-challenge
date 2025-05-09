# Image Gallery

A responsive image gallery application built with modern web technologies. This app fetches images from an API and displays them in a grid layout. Users can click on an image to view it in a modal with navigation options to browse through the images.

## Features

- Responsive grid layout for images.
- Modal view with "Next" and "Previous" navigation.
- Smooth animations for transitions.
- Loading indicators for better user experience.

## Technologies Used

- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **TypeScript**: For type-safe development.
- **Pinia**: A state management library for Vue.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Vite**: A fast build tool for modern web projects.

## Environment Variables

This app uses an API endpoint to fetch images. To configure the API endpoint, create a `.env` file from `.env.example` file in the root of the project and add the following:

```env
VITE_API_ENDPOINT=<image api endpoint>
```

Make sure to replace the value of `VITE_API_ENDPOINT` with your desired API endpoint if needed.

## Project Setup

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize Configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## License

This project is licensed under the MIT License.
