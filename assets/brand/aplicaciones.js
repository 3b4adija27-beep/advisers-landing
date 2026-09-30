/* Local resource content; no remote requests, data collection or assistant modifications. */
(() => {
  'use strict';
  const content = {
    clientes: { title: 'Crecer y atender mejor', problem: 'Cuando la información comercial y la atención están desconectadas, es difícil sostener una experiencia consistente. El objetivo es dar continuidad a cada relación, desde la primera consulta hasta el servicio posterior.', apps: ['Organización de oportunidades, solicitudes y seguimiento.', 'Integración de canales y derivación a personas responsables.', 'Registro de compromisos y retroalimentación del cliente.'], metrics: ['Tiempo de respuesta y resolución.', 'Conversión y continuidad del seguimiento.', 'Satisfacción mediante instrumentos definidos.'] },
    operacion: { title: 'Operar con eficiencia', problem: 'Las organizaciones necesitan coordinar actividades, proveedores, recursos y entregas. Una visión compartida del proceso permite identificar esperas, retrabajos y puntos donde la información pierde continuidad.', apps: ['Flujos de trabajo y aprobaciones trazables.', 'Planificación de actividades, abastecimiento y entregas.', 'Automatización de tareas repetitivas con gestión de excepciones.'], metrics: ['Tiempo de ciclo y cumplimiento de compromisos.', 'Retrabajos y errores de registro.', 'Carga operativa e intervenciones manuales.'] },
    finanzas: { title: 'Controlar finanzas y recursos', problem: 'La visibilidad de presupuestos, costos y compromisos permite organizar la gestión administrativa. La solución debe respetar las reglas contables y las responsabilidades de aprobación de cada empresa.', apps: ['Consolidación de presupuestos, gastos y compromisos.', 'Seguimiento de facturación, cobros y vencimientos.', 'Aprobaciones y conciliación con sistemas existentes.'], metrics: ['Desviación entre presupuesto y ejecución.', 'Tiempo de consolidación y cierre.', 'Documentos pendientes y antigüedad de saldos.'] },
    personas: { title: 'Conectar personas y conocimiento', problem: 'El conocimiento y la coordinación no deberían depender de mensajes dispersos ni de una sola persona. El objetivo es facilitar el trabajo compartido sin perder responsabilidades ni restringir innecesariamente la colaboración.', apps: ['Incorporación y aprendizaje de equipos.', 'Documentación de procesos y consulta de conocimiento aprobado.', 'Asignación de responsabilidades, solicitudes y tareas.'], metrics: ['Tiempo de acceso a información útil.', 'Adopción y finalización de actividades.', 'Calidad de la documentación y de la experiencia interna.'] },
    datos: { title: 'Decidir con información', problem: 'La información aporta valor cuando se entiende su origen, significado y actualización. Antes de incorporar gráficos o IA, conviene definir qué decisiones se quieren apoyar y qué datos son confiables para hacerlo.', apps: ['Integración y validación de fuentes de información.', 'Indicadores definidos y vistas según responsabilidad.', 'Análisis de tendencias y escenarios con supuestos visibles.'], metrics: ['Calidad y actualización de las fuentes.', 'Consistencia entre reportes.', 'Tiempo de preparación y disponibilidad de información.'] },
    continuidad: { title: 'Proteger la continuidad', problem: 'La operación necesita reglas de acceso, responsabilidades y capacidad de recuperación ante cambios o incidentes. Las medidas deben corresponder al riesgo, sin prometer seguridad absoluta ni cumplimiento automático.', apps: ['Roles, permisos y evidencias de acciones relevantes.', 'Procedimientos de respaldo y recuperación comprobables.', 'Gestión de cambios, incidentes y revisión de controles.'], metrics: ['Resultados de pruebas de recuperación.', 'Incidentes y tiempo de atención.', 'Revisión de accesos y cierre de acciones pendientes.'] }
  };
  const detail = document.getElementById('need-detail');
  const buttons = [...document.querySelectorAll('[data-need]')];
  if (!detail) return;
  let selectedButton = null;
  function closeDetail() {
    detail.hidden = true;
    buttons.forEach(button => button.setAttribute('aria-expanded', 'false'));
    selectedButton?.focus({ preventScroll: false });
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    const data = content[button.dataset.need];
    if (!data) return;
    selectedButton = button;
    detail.querySelector('[data-detail-title]').textContent = data.title;
    detail.querySelector('[data-detail-problem]').textContent = data.problem;
    for (const [selector, values] of [['[data-detail-apps]', data.apps], ['[data-detail-metrics]', data.metrics]]) {
      detail.querySelector(selector).replaceChildren(...values.map(value => {
        const li = document.createElement('li');
        li.textContent = value;
        return li;
      }));
    }
    buttons.forEach(item => item.setAttribute('aria-expanded', String(item === button)));
    detail.hidden = false;
    detail.focus({ preventScroll: true });
    detail.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  }));
  detail.querySelector('[data-close]').addEventListener('click', closeDetail);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !detail.hidden) {
      event.preventDefault();
      closeDetail();
    }
  });
})();
