# Lavvyaashi

## Human-run commands

Installation and package scripts are protected by an interactive confirmation.
An AI or other non-interactive process cannot run them because the command
requires a human-operated terminal and a password.

Open PowerShell in this project folder and run each command yourself:

```powershell
npm install
npm run dev
```

When prompted, enter the password without expecting it to appear on screen,
then press Enter. Then open
<http://localhost:3000>.

### If pages return 404

Make sure PowerShell is in the nested project directory, not the parent
`Lavvyaashi` directory:

```powershell
Set-Location C:\Users\Dell\Desktop\Clients\Lavvyaashi\lavvyaashi
```

For development, stop any existing Next.js process and run:

```powershell
npm run dev
```

If you are using production mode, rebuild before starting so all routes are
included:

```powershell
npm run build
npm run start
```

Enter the password at each confirmation prompt. Do not open a stale
production server left over from an earlier build.

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
