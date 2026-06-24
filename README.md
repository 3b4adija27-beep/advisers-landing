# ADVISERS PERU Landing

Landing publica estatica de ADVISERS PERU para presentar servicios y captar solicitudes de diagnostico digital.

El formulario envia los datos directamente al webhook productivo de n8n:

```text
POST https://n8n-n8n.sdb2lb.easypanel.host/webhook/lead-landing
Content-Type: application/json
```

La landing no incluye backend, base de datos, credenciales, tokens ni conexion directa con ADVISERS IA OS.

## Ejecucion local

Puedes abrir `index.html` directamente en el navegador. Para probar el formulario en condiciones similares a produccion, es preferible servir la carpeta mediante un servidor HTTP local:

```bash
docker build -t advisers-landing .
docker run --rm -p 8080:80 advisers-landing
```

Luego visita:

```text
http://localhost:8080
```

El workflow `WF-LEAD-LANDING` debe estar activo en n8n. El webhook tambien debe permitir solicitudes CORS desde el dominio donde se publique la landing.

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
3. Marca la autorizacion de contacto.
4. Presiona **Registrar solicitud demo**.
5. Verifica el mensaje de confirmacion en pantalla.
6. En n8n, confirma una ejecucion exitosa de `WF-LEAD-LANDING` y revisa el JSON recibido.

El boton queda deshabilitado mientras se procesa la solicitud para evitar envios duplicados. El boton de WhatsApp funciona de forma independiente.
