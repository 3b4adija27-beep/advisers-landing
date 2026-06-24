# ADVISERS PERU Web v0.1.5

Web pública oficial de ADVISERS PERU para presentar servicios, metodología, arquitectura y proyectos, y captar solicitudes de diagnóstico digital.

## Identidad visual

La landing utiliza como identidad oficial:

- Logo institucional actualmente validado e incrustado en `index.html`.
- Azul corporativo oscuro para estructura y navegación.
- Teal tecnológico para acentos, estados y elementos de apoyo.
- Blanco y gris claro para superficies y legibilidad.
- Azul de acción para botones y llamados principales.

El logo se muestra al doble de su tamaño anterior en escritorio, conservando proporción, nitidez y adaptación responsive.

Las referencias comerciales de la plataforma operativa se presentan como `P-O / ADKPAX`:

> Gestión de activos, tickets de recorrido, consumo de combustible, IRA, dashboards, alertas, usuarios y auditoría.

El formulario envía los datos directamente al webhook productivo de n8n:

```text
POST https://n8n-n8n.sdb2lb.easypanel.host/webhook/lead-landing
Content-Type: application/json
```

El sitio no incluye backend, base de datos, credenciales, tokens ni conexión directa con ADVISERS IA OS. El logo y la imagen principal están incrustados en `index.html` para que el contenedor estático no dependa de archivos adicionales.

## Ejecución local

Para probar el sitio y el formulario en condiciones similares a producción:

```bash
docker build -t advisers-landing .
docker run --rm -p 8080:80 advisers-landing
```

Luego visita:

```text
http://localhost:8080
```

El workflow `WF-LEAD-LANDING` debe estar activo en n8n. El webhook debe permitir solicitudes CORS desde el dominio donde se publique el sitio.

## Despliegue en EasyPanel

Configura un nuevo servicio con estos valores:

| Campo | Valor |
| --- | --- |
| Source | GitHub |
| Owner | `3b4adija27-beep` |
| Repository | `advisers-landing` |
| Branch | `main` |
| Build Path | `/` |
| Build | Dockerfile |
| File | `Dockerfile` |
| Puerto interno | `80` |
| Dominio sugerido | `advisers.advper.cloud` |
| Target interno esperado | `http://planeap_advisers-landing-web:80` |

No se requieren variables de entorno.

## Prueba del formulario

1. Abre la landing desplegada.
2. Completa nombre, empresa, problema y al menos WhatsApp o correo.
3. Marca la autorización de contacto.
4. Presiona **Registrar solicitud**.
5. Verifica el mensaje de confirmación en pantalla.
6. En n8n, confirma una ejecución exitosa de `WF-LEAD-LANDING` y revisa el JSON recibido.

El botón queda deshabilitado mientras se procesa la solicitud para evitar envíos duplicados. El botón de WhatsApp funciona de forma independiente.
