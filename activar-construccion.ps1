# Activa la pagina "en construccion" (guarda la landing en landing/ si hiciste cambios)
$root = $PSScriptRoot

# Actualizar backup de la landing antes de cambiar (por si editaste la landing en raiz)
if (Test-Path "$root\css\styles.css") {
  New-Item -ItemType Directory -Force -Path "$root\landing\css", "$root\landing\js" | Out-Null
  if (Test-Path "$root\index.html") {
    $firstLine = Get-Content "$root\index.html" -TotalCount 1
    if ($firstLine -notmatch "En construcción") {
      Copy-Item "$root\index.html" "$root\landing\index.html" -Force -ErrorAction SilentlyContinue
      Copy-Item "$root\css\styles.css" "$root\landing\css\styles.css" -Force -ErrorAction SilentlyContinue
      Copy-Item "$root\js\main.js" "$root\landing\js\main.js" -Force -ErrorAction SilentlyContinue
    }
  }
}

$constructionHtml = @"
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Luxentia Travel — Sitio en construcción. Pronto estaremos en línea."
    />
    <meta name="robots" content="noindex, nofollow" />
    <title>Luxentia Travel — En construcción</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/construction.css" />
    <link rel="icon" href="assets/luxentia-logo.png" type="image/png" />
  </head>
  <body>
    <div class="construction__bg" aria-hidden="true"></div>

    <main class="construction">
      <img
        class="construction__logo"
        src="assets/luxentia-logo.png"
        alt="Luxentia Travel"
        width="280"
        height="120"
      />

      <p class="construction__badge">Sitio en construcción</p>

      <h1 class="construction__title">
        Estamos preparando<br />
        <span>algo extraordinario</span>
      </h1>

      <p class="construction__text">
        Muy pronto podrás descubrir experiencias de viaje exclusivas y
        personalizadas con Luxentia Travel. Gracias por tu paciencia.
      </p>

      <div class="construction__loader" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <a href="mailto:info@luxentiatravel.com" class="construction__cta">
        info@luxentiatravel.com
      </a>

      <p class="construction__footer">
        © <span id="year"></span> Luxentia Travel. Todos los derechos reservados.
      </p>
    </main>

    <script>
      document.getElementById("year").textContent = new Date().getFullYear();
    </script>
  </body>
</html>
"@

Set-Content -Path "$root\index.html" -Value $constructionHtml -Encoding UTF8

Write-Host "Pagina en construccion activada. Sube a git y despliega." -ForegroundColor Cyan
Write-Host "Para volver a la landing: .\activar-landing.ps1" -ForegroundColor Yellow
