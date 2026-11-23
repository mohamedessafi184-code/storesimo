# TAVIXO — Electronics Store Demo

A Next.js storefront starter for TAVIXO.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. In the terminal, run:

   ```powershell
   npm install
   npm run dev
   ```

4. Open http://localhost:3000

On Windows PowerShell, if `npm` is blocked, use `npm.cmd` instead:

```powershell
npm.cmd install
npm.cmd run dev
```

## Upload to GitHub

Create a new empty repository on GitHub, then open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial TAVIXO storefront"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL of your own GitHub repository.

## Important

This is a front-end demo. Product data is sample data, images are temporary remote images, and the cart is stored only in the current page session. It does not yet save real orders, process payments, manage inventory, or provide an admin dashboard. Those features need a backend and secure configuration before real customer use.
