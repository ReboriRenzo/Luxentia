# Restaura la landing completa (desde la carpeta landing/)
$root = $PSScriptRoot

Copy-Item "$root\landing\index.html" "$root\index.html" -Force
Copy-Item "$root\landing\css\styles.css" "$root\css\styles.css" -Force
Copy-Item "$root\landing\js\main.js" "$root\js\main.js" -Force

Write-Host "Landing completa activada. Abri index.html en el navegador." -ForegroundColor Green
