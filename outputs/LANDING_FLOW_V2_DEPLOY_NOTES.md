# Landing Flow v2 - Notas de deploy

## Requiere deploy

Si, cuando Miguel apruebe promover la rama.

## Servicio

`advisers-landing-web`

## Migracion

No requiere migracion.

## Variables nuevas

No requiere variables nuevas.

## Validacion post-deploy

1. Abrir la landing publica.
2. Completar formulario con checkbox marcado.
3. Confirmar en DevTools Network que el JSON envia `acepta_contacto: true` y metadata `consent_*`.
4. Completar formulario sin checkbox marcado.
5. Confirmar que el JSON envia `acepta_contacto: false`.
6. Confirmar que antes de registrar solo se muestra `Resumen previo orientativo`.
7. Confirmar que despues de registrar se muestra `Diagnostico preliminar y plan de accion`.
8. Confirmar que la landing no promete WhatsApp/email real.

## Rollback

Revertir commit de la rama y redeploy del servicio estatico.
