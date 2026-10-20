# Design and Implementation of a Mobile App for Food Delivery Service

**Craving Authentic Nri Igbo**

NaijaBite is a responsive React food delivery app for browsing and ordering authentic Igbo and Nigerian meals across southeastern cities.

## Requirements

- Node.js 18 or later
- npm (included with Node.js)

## Install and run

Run these commands from the project root:

```sh
npm install
npm run dev
```

Open the local URL shown in the terminal (by default, `http://localhost:3000`). The Vite development server supports hot reload while you edit the app.

## Available commands

| Command | Syntax | Usage |
| --- | --- | --- |
| Install dependencies | `npm install` | Install the packages required by the project. |
| Start development server | `npm run dev` | Run the app locally with hot reload. |
| Type-check | `npm run lint` | Check TypeScript without emitting build files. |
| Create production build | `npm run build` | Generate the optimized site in `dist/`. |
| Preview production build | `npm run preview` | Serve the generated build locally for verification. |

Typical production verification:

```sh
npm run lint
npm run build
npm run preview
```

## Using the app

1. Browse the menu or select a category to narrow the dishes shown.
2. Use the search field and popular or spicy filters to find a meal.
3. Select a dish to view its details and add it to your cart.
4. Choose a delivery location, review the cart, and continue through checkout.
5. Use **Orders** to view past orders or the active-order control to track a current order.

Cart, order, and delivery-location data are saved in the browser's local storage.

## Deploy to GitHub Pages

Push the `main` branch to GitHub, then enable **GitHub Actions** as the Pages source in the repository settings. The site will be available at `https://metta-tony.github.io/naijabite-food-delivery/` after the workflow completes.

## Production build

Run `npm run build` to create the production bundle in `dist/`.
