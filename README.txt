CozyNest Home - Checkout Update (2026-11-21)

WHAT THIS UPDATE DOES
- Lets visitors type the example test card number and an MM/YY expiration date.
- Restricts card-number typing to the example sequence 4242 4242 4242 4242.
- Rejects real card numbers; no CVC field is present.
- Removes the "Use sample details" and "Clear form" buttons.
- Removes the "Training order summary · no charges or deliveries" text from the cart and checkout summaries.
- Retains the clear training disclosure on the checkout and the site's header.
- Does not save, log, or transmit card details.
- Includes the shopping-cart icon fix from the previous request, if still missing.

FILES IN THIS ZIP
- checkout.html: Complete replacement checkout page.
- Apply-Checkout-Changes.ps1: Updates only specific code inside your local app.js,
  preserving newer local changes to products, reviews, and other features.
- README.txt: These instructions.

HOW TO INSTALL WITH GITHUB DESKTOP
1. Extract this ZIP to a folder you can find (for example Downloads).
2. In GitHub Desktop, open Repository > Show in Explorer.
3. Copy checkout.html AND Apply-Checkout-Changes.ps1 from the extracted ZIP
   into your local Cybersecurity-awareness-demo folder (next to app.js).
   Choose Replace for checkout.html.
4. Right-click Apply-Checkout-Changes.ps1 and select "Run with PowerShell".
   It updates app.js and stores a backup OUTSIDE the repository under your
   Windows TEMP folder in "CozyNestHome-Backups".
5. After the PowerShell window reports success, delete the .ps1 script from
   your repository folder so GitHub Desktop only sees app.js and checkout.html.
6. In GitHub Desktop, review the two changed files, then Commit to main and Push origin.
7. Refresh the site with Ctrl+Shift+R. Test the example number and 12/30.

Note: Some Windows setups block untrusted scripts. If PowerShell blocks the
script, do not disable your security policy; ask ChatGPT for another method.
