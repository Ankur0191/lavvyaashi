# Lavvyaashi

## Human-run commands

Installation and package scripts are protected by an interactive confirmation.
An AI or other non-interactive process cannot run them because the command
requires a human-operated terminal and the exact phrase `Lavvyaashi_2026`.

Open PowerShell in this project folder and run each command yourself:

```powershell
npm install
npm run dev
```

When prompted, type `Lavvyaashi_2026` and press Enter. Then open
<http://localhost:3000>.

Other protected commands:

```powershell
npm run lint
npm run build
npm run start
```

`npm run start` requires a successful `npm run build` first. Do not use
`--ignore-scripts`, and do not run the underlying `next` commands directly;
those bypass the project safeguard.

The storefront's **Quick Add** action also requires an explicit human
confirmation in the browser before a product is added to the cart.
