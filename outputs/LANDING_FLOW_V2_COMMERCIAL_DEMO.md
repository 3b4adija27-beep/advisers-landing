# Landing Flow v2 - Demo Comercial Segura

## Objetivo

Reestructurar la landing publica de ADVISERS PERU para que capte leads, oriente el diagnostico y registre la solicitud sin prometer envios reales por WhatsApp o correo.

## Principio final

- La landing no es el diagnostico definitivo.
- La landing orienta, captura datos y registra la solicitud.
- ADVISERS IA OS queda como fuente oficial del caso, diagnostico, trazabilidad y siguientes acciones.
- Si WhatsApp/email reales no estan activos, la landing no promete entregas por esos canales.

## Flujo implementado

Antes de registrar la solicitud:

- Se muestra el formulario comercial.
- Se muestran preguntas inteligentes segun servicio y problema.
- Se muestra una `Vista orientativa previa`, no un diagnostico definitivo.

Despues de registrar la solicitud:

- Se muestra `Solicitud registrada`.
- Se muestra `Diagnostico preliminar y plan de accion`.
- Se muestra el proximo paso recomendado.
- Se informa si el usuario autorizo o no autorizo contacto.
- Se muestra texto seguro: ADVISERS IA OS conserva el caso como fuente oficial y ADVISERS PERU revisara el diagnostico antes de cualquier siguiente paso.

## Consentimiento v2

La landing envia booleanos explicitos:

- `acepta_contacto`
- `consent`
- `accepted_contact`
- `accepts_contact`
- `contact_consent`
- `consent_to_contact`

Tambien envia evidencia:

- `consent_text`
- `consent_source=advper.cloud`
- `consent_channel=WEB_FORM`
- `consent_form_version=landing-diagnostico-v2`
- `consent_policy_version=privacy-advisers-v1`
- `consent_timestamp_client`
- `form_version`
- `landing_version`
- `privacy_policy_version`

## Seguridad

- No se exponen tokens.
- No se conecta directo con ADVISERS IA OS.
- El webhook sigue siendo n8n productivo.
- No se promete envio real por WhatsApp o correo.
- El boton WhatsApp independiente se mantiene.

## Fase posterior

React Flow queda documentado como fase futura. No se implementa en esta tarea.
