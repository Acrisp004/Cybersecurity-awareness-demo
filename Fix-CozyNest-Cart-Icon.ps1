# CozyNest Home: replace the playing-card club with a real shopping-cart icon.
# Place this script beside app.js in your local GitHub repository, then run it.
param([string]$FilePath = (Join-Path $PSScriptRoot 'app.js'))
$ErrorActionPreference = 'Stop'
try {
    if (-not (Test-Path -LiteralPath $FilePath -PathType Leaf)) {
        throw "Could not find app.js next to this script. Move the script into your CozyNest repository folder."
    }

    $content = [System.IO.File]::ReadAllText($FilePath, [System.Text.Encoding]::UTF8)
    $old = 'aria-label="Shopping bag">♧<span class="counter"'
    $cart = '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.6 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>'
    $matchesFound = ([regex]::Matches($content, [regex]::Escape($old))).Count

    if ($matchesFound -ne 1) {
        if ($matchesFound -eq 0 -and $content.Contains($cart)) {
            Write-Host 'This app.js already has the shopping-cart icon.' -ForegroundColor Green
            exit 0
        }
        throw "Expected one club-symbol cart icon but found $matchesFound. No changes made."
    }

    $updated = $content.Replace($old, 'aria-label="Shopping bag">' + $cart + '<span class="counter"')
    [System.IO.File]::WriteAllText($FilePath, $updated, [System.Text.UTF8Encoding]::new($false))
    Write-Host 'Updated app.js successfully. All other JavaScript was preserved.' -ForegroundColor Green
    Write-Host 'Next: GitHub Desktop -> Commit to main -> Push origin.'
} catch {
    Write-Host "Could not update app.js: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
Read-Host 'Press Enter to close'
