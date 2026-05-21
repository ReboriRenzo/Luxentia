# Luxentia Travel — modos del sitio

## Estado actual

- **`index.html`** → página **en construcción** (para subir a Git / producción)
- **`landing/`** → copia de la **landing completa** (hero, sobre nosotros, tips)

## Volver a la landing completa

En PowerShell, desde esta carpeta:

```powershell
.\activar-landing.ps1
```

## Activar de nuevo «en construcción»

```powershell
.\activar-construccion.ps1
```

## Subir a Git (modo construcción)

```bash
git add index.html css/construction.css assets/ landing/ activar-*.ps1 SITIO.md
git commit -m "Página en construcción para despliegue"
git push
```

## Archivos

| Archivo | Uso |
|---------|-----|
| `index.html` | Lo que ve el visitante (ahora: construcción) |
| `css/construction.css` | Estilos de la página en construcción |
| `css/styles.css` | Estilos de la landing (se usa al restaurar) |
| `landing/` | Backup de la landing completa |

Cambiá el email en `index.html` si usás otro correo de contacto.
