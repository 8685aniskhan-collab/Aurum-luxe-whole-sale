# Aurum Luxe Wholesale

A luxury wholesale landing page with a complete frontend and Node.js backend.

## What is included

- `wholesale.html` — polished luxury wholesale storefront
- `style.css` — visual styling for the landing page
- `script.js` — product loading, filters, cart request, and inquiry submission
- `server.js` — Express backend serving the storefront and product API
- `package.json` — dependency manifest for Node.js
- `index.html` — landing redirect page

## Install and run

1. Install Node.js if not already installed: https://nodejs.org
2. Open a terminal in the project folder.
3. Run:

```bash
npm install
```

4. Start the app:

```bash
npm start
```

5. Open in your browser:

```text
http://localhost:3000
```

## Endpoints

- `GET /api/products` — returns the wholesale product alog
- `POST /api/inquiry` — accepts business inquiry submissions

## Notes

- The backend logs received inquiries in the terminal.
- The frontend works with the backend to load product data dynamically.
