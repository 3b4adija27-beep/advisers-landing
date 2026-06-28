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

## Captación multicanal

La landing muestra un bloque visible de canales oficiales:

- WhatsApp
- LinkedIn
- Facebook
- Instagram
- TikTok
- YouTube
- Correo

Los enlaces sociales quedan preparados con `href="#"` como placeholder seguro. Para publicar URLs reales, edita el bloque `social-channels` en `index.html` y reemplaza cada `href="#"` por la URL oficial correspondiente. El botón principal de WhatsApp se mantiene independiente.

El formulario envía además metadata para identificar origen y campañas:

```json
{
  "origen": "Landing ADVISERS PERU",
  "campaign_source": "",
  "campaign_medium": "",
  "campaign_name": ""
}
```

Los campos de campaña pueden configurarse en los inputs ocultos del formulario o recibirse desde parámetros UTM:

```text
?utm_source=facebook&utm_medium=social&utm_campaign=diagnostico_julio
```

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
6. En n8n, confirma una ejecución exitosa de `WF-LEAD-LANDING` y revisa el JSON recibido, incluyendo `origen`, `campaign_source`, `campaign_medium` y `campaign_name`.

El botón queda deshabilitado mientras se procesa la solicitud para evitar envíos duplicados. El botón de WhatsApp funciona de forma independiente.

## MVP v1.3 - Diagnostico guiado multicanal

La landing mantiene el despliegue estatico con Nginx y sigue enviando solicitudes al webhook productivo de n8n:

```text
https://n8n-n8n.sdb2lb.easypanel.host/webhook/lead-landing
```

### Cambios del formulario

El formulario "Solicita un diagnostico digital" ahora funciona como diagnostico guiado:

1. Datos basicos del contacto.
2. Seleccion de servicio.
3. Preguntas predeterminadas por servicio.
4. Ruta preliminar visible para el cliente.
5. Envio a n8n con payload extendido.

La landing no conecta directamente con ADVISERS IA OS para registrar casos. Solo consulta, si esta disponible, el endpoint publico de catalogo:

```text
https://os.advper.cloud/api/public/service-catalog/diagnostic-options
```

Si el endpoint no responde, usa un catalogo local fallback con los mismos `service_code` principales.

### Payload enviado a n8n

Incluye:

- `nombre`
- `empresa`
- `whatsapp`
- `correo`
- `servicio_interes`
- `urgencia`
- `problema`
- `acepta_contacto`
- `origen`
- `source_channel=WEB_FORM`
- `source_platform=Landing ADVISERS PERU`
- `service_catalog_item_id`
- `service_code`
- `guided_answers`
- `guided_outcome`
- `imrad_summary`
- `diagnostic_version`
- `consent_status`
- `preliminary_solution`
- `campaign_source`
- `campaign_medium`
- `campaign_name`

No se exponen tokens, API keys ni claves. El webhook n8n sigue siendo el unico destino del formulario.

MVP v1.3.3 agrega confirmacion preliminar IMRaD en pantalla. La landing genera un resumen corto con `INTRODUCCION`, `METODO`, `RESULTADO` y `DISCUSION`, lo muestra despues de registrar la solicitud y lo envia en el payload como `imrad_summary` y dentro de `guided_outcome.imrad_summary`.

La landing no envia WhatsApp ni correo al cliente. ADVISERS IA OS recibe el lead desde n8n, valida consentimiento y contacto, y prepara `OutboundDelivery` en estado `Pending` para que los workers n8n realicen el envio con trazabilidad.

### Validacion en navegador

1. Abrir la landing.
2. Seleccionar un servicio.
3. Confirmar que aparecen preguntas tipo chip/radio.
4. Responder al menos tres preguntas.
5. Completar nombre, empresa, WhatsApp o correo, problema y consentimiento.
6. Abrir DevTools > Network y enviar.
7. Revisar que el POST vaya a `/webhook/lead-landing` y que el JSON tenga `guided_answers`, `guided_outcome`, `source_channel` y `service_code`.
8. Confirmar que no se pregunta "donde registras informacion".

### EasyPanel

Mantener la configuracion actual:

- Source: GitHub
- Repository: `3b4adija27-beep/advisers-landing`
- Branch: `main`
- Build: Dockerfile
- Dockerfile: `Dockerfile`
- Puerto interno: `80`

## Diagnostico guiado dirigido por servicio + problema

La landing ahora reduce el cuestionario inicial y parte de dos datos:

1. Servicio de interes seleccionado.
2. Necesidad principal escrita por el cliente.

El campo de necesidad principal tiene mayor jerarquia visual, ayuda breve y tres ejemplos tenues no seleccionables. Despues de escribir el problema, el formulario calcula solo 3 a 5 preguntas dirigidas segun el servicio y el texto escrito.

Validacion sugerida:

- Seleccionar `CRM y tickets` y escribir: `Registramos solicitudes en Excel y queremos seguimiento`.
- Confirmar que aparecen preguntas sobre control, responsables, estados o reportes.
- Cambiar a `Bot WhatsApp / Web` y escribir: `Nos llegan mensajes por WhatsApp y no tenemos seguimiento`.
- Confirmar que aparecen preguntas sobre volumen, derivacion y automatizacion.
- Enviar el formulario y revisar en Network que el payload incluya `guided_answers`, `guided_outcome.problem_category`, `guided_outcome.diagnosis_clarity`, `source_channel=WEB_FORM` y `service_code`.
