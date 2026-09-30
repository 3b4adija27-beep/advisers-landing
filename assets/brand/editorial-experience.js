/* Public presentation only. Never sends messages or restyles the shared ADVPER IA iframe. */
(() => {
const details={
  "diagnostico": [
    "Diagnóstico",
    "Entender antes de construir.",
    "Revisamos el proceso con el equipo: datos disponibles, tareas repetidas, responsables y excepciones.",
    "Una necesidad priorizada y una referencia inicial para evaluar la mejora."
  ],
  "alcance": [
    "Alcance acordado",
    "Acuerdos comprensibles desde el inicio.",
    "Definimos usuarios, módulos, integraciones, entregables, dependencias y lo que queda fuera.",
    "Etapas, criterios de aceptación y responsabilidades. Los cambios se evalúan antes de ejecutarse."
  ],
  "prototipo": [
    "Prototipo",
    "Ver y validar la experiencia.",
    "Presentamos recorridos representativos con información de prueba y recogemos observaciones de quienes usarán la solución.",
    "Un flujo revisado antes de ampliar la construcción. El prototipo no se presenta como un sistema productivo terminado."
  ],
  "implementacion": [
    "Implementación",
    "Construir con trazabilidad.",
    "Desarrollamos los componentes acordados, las integraciones autorizadas y los controles de acceso; documentamos cambios relevantes.",
    "Versiones identificables y configuración por entorno para probar, mantener y evolucionar la solución."
  ],
  "pruebas": [
    "Pruebas",
    "Comprobar el trabajo real, también cuando algo falla.",
    "Revisamos casos normales, datos incompletos, permisos, errores e integraciones. El equipo valida sus escenarios operativos.",
    "Evidencia de pruebas, incidencias pendientes y criterios de aceptación. Una demostración visual no sustituye la validación integral."
  ],
  "puesta": [
    "Puesta en marcha",
    "Activar con responsables y una ruta de regreso.",
    "Coordinamos publicación autorizada y verificación posterior. Respaldo, recuperación y capacitación se concretan según el alcance.",
    "Paso a operación controlado, accesos por rol y condiciones de seguimiento acordadas."
  ],
  "mejora": [
    "Mejora continua",
    "La siguiente mejora se decide con evidencia.",
    "Revisamos uso, incidencias y nuevas necesidades. Ordenamos un backlog por impacto, prioridad y esfuerzo esperado.",
    "Cambios aprobados y comprobados. Los resultados se miden; no prometemos porcentajes sin una referencia."
  ],
  "asiste": [
    "Asiste.",
    "Tecnología que empieza por escuchar.",
    "Comprendemos a las personas que ejecutan el trabajo, aclaramos opciones y acompañamos la definición del problema.",
    "Una relación cercana y un siguiente paso comprensible. La asistencia y el soporte se delimitan en cada propuesta."
  ],
  "innova": [
    "Innova.",
    "Transformar necesidades en formas mejores de trabajar.",
    "Combinamos software, automatización, integraciones e IA cuando aportan utilidad. Probamos ideas en un alcance concreto.",
    "Soluciones conectadas con el negocio. La novedad se valida mediante uso y evidencia, no por apariencia."
  ],
  "crece": [
    "Crece.",
    "Una base sólida para el siguiente paso.",
    "Diseñamos entornos adaptables a nuevos usuarios, procesos y necesidades, con información que apoye las decisiones.",
    "Una ruta evolutiva responsable. El crecimiento depende de la operación y las decisiones del negocio, no de una promesa tecnológica."
  ],
  "conectada": [
    "Información conectada",
    "Un dato útil conserva contexto y responsabilidad.",
    "Relacionamos herramientas mediante interfaces autorizadas y revisamos identificadores, calidad, duplicados y errores.",
    "Qué sistema es la fuente del dato, quién lo actualiza y cómo se verifican los cambios."
  ],
  "transparente": [
    "Alcances transparentes",
    "Confianza basada en acuerdos verificables.",
    "Acordamos roles, fuentes, entregables, pruebas y tratamiento de información. Identificamos costos de terceros y mantenimiento.",
    "Qué incluye la solución y qué requiere una etapa adicional. Sin promesas de seguridad absoluta ni certificaciones no acreditadas."
  ],
  "activos": [
    "Gestión técnica y activos",
    "De la solicitud a una atención con historia.",
    "Relacionar activos, equipos, responsables, órdenes y evidencias permite dar continuidad al trabajo de campo y oficina.",
    "Reglas de alta, cambio, retiro y consulta histórica según el proyecto. Es un escenario de aplicación, no un resultado garantizado."
  ],
  "clientes": [
    "Clientes y seguimiento",
    "Cada consulta necesita un siguiente paso.",
    "Conectamos canales, oportunidades, solicitudes y estados para revisar pendientes y coordinar la atención.",
    "Datos mínimos, criterios de derivación y permisos. La automatización acompaña al equipo y contempla excepciones."
  ],
  "direccion": [
    "Información para decidir",
    "Una vista ejecutiva empieza por datos confiables.",
    "Definimos indicadores, fuentes, periodicidad y filtros. Revisamos que cada cifra tenga el mismo significado entre áreas.",
    "Contexto, actualización y límites de cada indicador. Un gráfico no sustituye la validación del dato ni la decisión humana."
  ],
  "mision": [
    "Nuestra misión",
    "Hacer útil y comprensible la tecnología.",
    "Ayudar a las empresas a mejorar su gestión con soluciones digitales que simplifiquen el trabajo, conecten información y faciliten decisiones informadas.",
    "Implementación alineada con las necesidades del equipo y criterios de aceptación comprensibles."
  ],
  "vision": [
    "Nuestra visión",
    "Ser un aliado tecnológico de confianza.",
    "Acompañar a organizaciones que buscan una operación conectada, eficiente y adaptable, conservando el control sobre sus procesos.",
    "Una relación basada en claridad, utilidad y mejora continua, sin presentar aspiraciones como resultados ya obtenidos."
  ]
};
document.addEventListener('click',event=>{
 const opener=event.target.closest('[data-detail]'); if(!opener||!details[opener.dataset.detail])return;
 const [title,intro,work,outcome]=details[opener.dataset.detail];
 for(const [id,value] of Object.entries({detailTitle:title,detailIntro:intro,detailWork:work,detailOutcome:outcome}))document.getElementById(id).textContent=value;
},true);
const ribbon=document.querySelector('.capability-ribbon'),pause=document.getElementById('ribbonToggle'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const update=()=>{if(!ribbon||!pause)return;ribbon.classList.toggle('is-animated',!reduced.matches);pause.disabled=reduced.matches;pause.textContent=ribbon.classList.contains('is-paused')?'Reanudar movimiento':'Pausar movimiento';pause.setAttribute('aria-pressed',String(ribbon.classList.contains('is-paused')));};
pause?.addEventListener('click',()=>{ribbon.classList.toggle('is-paused');update();});reduced.addEventListener('change',update);update();
const panel=document.getElementById('advperAssistantPanel'),trigger=document.getElementById('advperAssistantTrigger');if(!panel||!trigger)return;
document.addEventListener('click',event=>{if(!event.target.closest('[data-assistant-topic]'))return;document.querySelectorAll('dialog[open]').forEach(d=>d.close());if(panel.hidden)trigger.click();setTimeout(()=>panel.querySelector('iframe')?.focus(),50);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.querySelector('dialog[open]')&&!panel.hidden){trigger.click();trigger.focus();}});
})();
