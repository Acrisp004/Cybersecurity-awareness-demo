# CozyNest Home demo checkout update
# Keep this script in the same directory as app.js and checkout.html.
param([string]$FilePath = (Join-Path $PSScriptRoot 'app.js'))
$ErrorActionPreference = 'Stop'
try {
    if (-not (Test-Path -LiteralPath $FilePath -PathType Leaf)) {
        throw 'Cannot find app.js in this folder.'
    }
    $original = [System.IO.File]::ReadAllText($FilePath, [System.Text.Encoding]::UTF8)
    $js = $original

    $summaryText = '<p class="small light">Training order summary · no charges or deliveries</p>'
    if ($js.Contains($summaryText)) {
        $js = $js.Replace($summaryText, '')
    }

    $demoHandler = '(?m)^\s*document\.querySelector\(''#fill-demo''\)\.addEventListener\(''click'',.*(?:\r?\n)'
    $js = [regex]::Replace($js, $demoHandler, "`n")

    $oldComment = '    // The example payment display is read-only and no payment data is collected.'
    $newHandler = @'
    // Training checkout: only the example test card can be typed; never store or transmit payment data.
    const testCardNumber = '4242424242424242';
    const cardField = document.getElementById('demo-card-number');
    const expiryField = document.getElementById('demo-card-expiry');
    cardField.addEventListener('input', () => {
      const digits = cardField.value.replace(/\D/g, '').slice(0, 16);
      let validLength = 0;
      while (validLength < digits.length && digits[validLength] === testCardNumber[validLength]) validLength++;
      const safeDigits = digits.slice(0, validLength);
      cardField.value = safeDigits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    });
    expiryField.addEventListener('input', () => {
      const digits = expiryField.value.replace(/\D/g, '').slice(0, 4);
      expiryField.value = digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
    });
'@
    if ($js.Contains($oldComment)) {
        $js = $js.Replace($oldComment, $newHandler.TrimEnd("`r", "`n"))
    } elseif (-not $js.Contains('const testCardNumber')) {
        throw 'Unexpected app.js checkout format. No changes written.'
    }

    $formValidationNeedle = '      if(!f.reportValidity())return;'
    $formValidationBlock = @'
      if(!f.reportValidity())return;
      if (cardField.value.replace(/\D/g, '') !== testCardNumber) {
        error.textContent = 'Enter the example card number 4242 4242 4242 4242. Real cards are not accepted.';
        error.style.display = 'block';
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryField.value)) {
        error.textContent = 'Enter an example expiration date in MM/YY format, such as 12/30.';
        error.style.display = 'block';
        return;
      }
'@
    if ($js.Contains($formValidationNeedle)) {
        $js = $js.Replace($formValidationNeedle, $formValidationBlock.TrimEnd("`r", "`n"))
    } elseif (-not $js.Contains('Real cards are not accepted')) {
        throw 'Unexpected app.js form validation format. No changes written.'
    }

    # Include the previously requested cart icon correction, if not already installed.
    $oldIcon = 'aria-label="Shopping bag">♧<span class="counter"'
    $cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.6 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>'
    if ($js.Contains($oldIcon)) {
        $js = $js.Replace($oldIcon, 'aria-label="Shopping bag">' + $cartIcon + '<span class="counter"')
    }

    if ($js -eq $original) {
        Write-Host 'app.js already appears updated; no replacement necessary.' -ForegroundColor Green
    } else {
        $backupDir = Join-Path $env:TEMP 'CozyNestHome-Backups'
        [System.IO.Directory]::CreateDirectory($backupDir) | Out-Null
        $backup = Join-Path $backupDir "app.js.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        [System.IO.File]::Copy($FilePath, $backup)
        [System.IO.File]::WriteAllText($FilePath, $js, [System.Text.UTF8Encoding]::new($false))
        Write-Host "Updated app.js. Original backed up to $backup" -ForegroundColor Green
    }
    Write-Host 'Review files in GitHub Desktop, then commit and push.'
} catch {
    Write-Host "Could not update app.js: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
