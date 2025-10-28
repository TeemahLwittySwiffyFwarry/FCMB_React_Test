📘 FCMB Career Portal (React Project)

This project is a responsive React.js web application simulating a simple Career Portal interface for FCMB.
It demonstrates:

API data fetching (using reqres.in)

Component reusability

Responsive layout design with Tailwind CSS

Clean code structure with modularized components

🚀 Features

✅ Registration Page

Users can enter their name and job.

Data is submitted to a mock API (https://reqres.in/api/users) using fetch().

Displays success or error messages.

Automatically redirects to the User List page on success.

Beautiful and mobile-responsive layout with a left-side background image and right-side form.

✅ User List (Paginated List Page)

Fetches user data from Reqres API (https://reqres.in/api/users?page=2).

Displays user cards with avatar, email, and name.

Clicking a user shows their details and a Proceed button.

Paginated with Next and Previous buttons.

Sidebar navigation included via a reusable Sidebar component.

✅ Sidebar Component

Includes FCMB logo and navigation menu.

Responsive on small screens.

Organized with adequate spacing between menu items.

✅ Bottom Navigation Component

Shows app features like Transfers, Airtime Top-up, QR Scanner, and Location.

Extracted into a separate component (BottomNav.js) for reusability.

Automatically behaves like a fixed bottom bar on mobile and inline footer on desktop.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
