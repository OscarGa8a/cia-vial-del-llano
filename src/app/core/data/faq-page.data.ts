import type { CategorizedFaq, FaqCategory } from '../models/faq.model';

/**
 * Category metadata for display purposes on the FAQ page.
 * Each category has a label, an icon identifier, and a Tailwind color class.
 */
export interface FaqCategoryMeta {
  readonly id: FaqCategory;
  readonly label: string;
  /** SVG icon path data for the category tab */
  readonly iconPath: string;
  /** Tailwind color class for the category icon background */
  readonly colorClass: string;
  /** Tailwind text color class for the category icon */
  readonly textColorClass: string;
}

/** Ordered list of FAQ categories with display metadata. */
export const FAQ_CATEGORIES: readonly FaqCategoryMeta[] = [
  {
    id: 'Comparendos',
    label: 'Comparendos',
    iconPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    colorClass: 'bg-primary/10',
    textColorClass: 'text-primary',
  },
  {
    id: 'Cursos',
    label: 'Cursos',
    iconPath: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5',
    colorClass: 'bg-accent/10',
    textColorClass: 'text-accent',
  },
  {
    id: 'Descuentos',
    label: 'Descuentos',
    iconPath: 'M19 5L5 19 M9 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z M15 12.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
    colorClass: 'bg-success/10',
    textColorClass: 'text-success',
  },
  {
    id: 'Pagos',
    label: 'Pagos',
    iconPath: 'M1 4h22v16H1z M1 10h22',
    colorClass: 'bg-highlight/10',
    textColorClass: 'text-highlight',
  },
  {
    id: 'Certificados',
    label: 'Certificados',
    iconPath: 'M12 15l-2 5 2-1 2 1-2-5z M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
    colorClass: 'bg-info/10',
    textColorClass: 'text-info',
  },
];

/**
 * Comprehensive FAQ data for the dedicated Preguntas Frecuentes page.
 * Contains 31 FAQs across 5 categories, merging content from both templates.
 * Answers use simple HTML for rich formatting (lists, strong, links).
 */
export const FAQ_PAGE_DATA: readonly CategorizedFaq[] = [
  // ── COMPARENDOS (8) ──────────────────────────────────────────
  {
    id: 201,
    category: 'Comparendos',
    question: '¿Qué es un comparendo?',
    answer:
      'Un comparendo es un <strong>documento oficial</strong> que un agente de tránsito emite cuando detecta una infracción a las normas de tránsito. Es una orden de citación para que el infractor comparezca ante las autoridades de tránsito. El comparendo detalla la infracción cometida, el lugar, fecha, hora y los datos del vehículo y conductor.',
  },
  {
    id: 202,
    category: 'Comparendos',
    question:
      '¿Cuál es la diferencia entre comparendo manual y electrónico (fotomulta)?',
    answer:
      '<p class="mb-3"><strong>Comparendo Manual:</strong> Es impuesto directamente por un agente de tránsito en vía. El agente te entrega una copia del comparendo en el momento.</p><p><strong>Comparendo Electrónico (Fotomulta):</strong> Es generado automáticamente por cámaras o sensores de velocidad. La notificación llega por correo certificado o correo electrónico a la dirección registrada en el RUNT.</p><p class="mt-3 text-sm bg-highlight-light p-3 rounded-lg"><strong>Importante:</strong> Los plazos para descuento son diferentes. Manual: 5 días para 50%. Electrónico: 11 días para 50%.</p>',
  },
  {
    id: 203,
    category: 'Comparendos',
    question: '¿Cómo sé si tengo comparendos pendientes?',
    answer:
      'Puedes consultar tus comparendos de dos formas:<ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>SIMIT:</strong> Ingresa a <span class="text-primary font-medium">www.simit.org.co</span> con tu número de cédula o placa del vehículo.</li><li><strong>RUNT:</strong> Ingresa a <span class="text-primary font-medium">www.runt.gov.co</span> para ver tu historial de tránsito.</li></ul><p class="mt-3">También puedes contactarnos y <strong>nosotros consultamos por ti</strong> sin costo.</p>',
  },
  {
    id: 204,
    category: 'Comparendos',
    question: '¿Qué pasa si no pago mi comparendo?',
    answer:
      'No pagar un comparendo puede tener varias consecuencias:<ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Suspensión de la licencia</strong> de conducción</li><li><strong>Imposibilidad de realizar trámites</strong> como traspasos, renovaciones o matrículas</li><li><strong>Intereses y cobros adicionales</strong> sobre el valor de la multa</li><li><strong>Cobro coactivo</strong> donde pueden embargar cuentas o bienes</li><li><strong>Reporte en centrales de riesgo</strong></li></ul><p class="mt-3 text-accent font-medium">¡No dejes pasar el tiempo! Entre más esperes, más costoso será.</p>',
  },
  {
    id: 205,
    category: 'Comparendos',
    question: '¿Puedo impugnar o apelar un comparendo?',
    answer:
      '<strong>Sí</strong>, puedes impugnar un comparendo si consideras que fue impuesto injustamente. El proceso es:<ol class="list-decimal pl-5 mt-2 space-y-1"><li>Presentar un recurso de reposición ante la autoridad de tránsito que impuso el comparendo</li><li>Aportar las pruebas que respalden tu caso</li><li>Esperar la resolución (puede tomar semanas o meses)</li></ol><p class="mt-3"><strong>Importante:</strong> Mientras impugnas, los plazos para descuento siguen corriendo. Si pierdes la impugnación, ya no tendrás derecho al descuento.</p>',
  },
  {
    id: 206,
    category: 'Comparendos',
    question: '¿Qué significa cada categoría de infracción (A, B, C, D, E)?',
    answer:
      'Las infracciones se clasifican por gravedad:<div class="mt-3 space-y-2"><div class="flex items-center gap-3 p-2 bg-info-light rounded-lg"><span class="w-8 h-8 bg-info text-white font-bold rounded-full flex items-center justify-center shrink-0">A</span><span><strong>4 SMDLV</strong> ($189,800) — Infracciones leves</span></div><div class="flex items-center gap-3 p-2 bg-success-light rounded-lg"><span class="w-8 h-8 bg-success text-white font-bold rounded-full flex items-center justify-center shrink-0">B</span><span><strong>8 SMDLV</strong> ($379,600) — Infracciones menores</span></div><div class="flex items-center gap-3 p-2 bg-warning-light rounded-lg"><span class="w-8 h-8 bg-warning text-white font-bold rounded-full flex items-center justify-center shrink-0">C</span><span><strong>15 SMDLV</strong> ($711,750) — Infracciones moderadas</span></div><div class="flex items-center gap-3 p-2 bg-highlight-light rounded-lg"><span class="w-8 h-8 bg-highlight text-white font-bold rounded-full flex items-center justify-center shrink-0">D</span><span><strong>30 SMDLV</strong> ($1,423,500) — Infracciones graves</span></div><div class="flex items-center gap-3 p-2 bg-error-light rounded-lg"><span class="w-8 h-8 bg-error text-white font-bold rounded-full flex items-center justify-center shrink-0">E</span><span><strong>45 SMDLV</strong> ($2,135,250) — Infracciones muy graves</span></div></div><p class="mt-3 text-sm text-text-secondary">* Valores basados en SMDLV 2025: $47,450</p>',
  },
  {
    id: 207,
    category: 'Comparendos',
    question: '¿Cómo se calculan los días hábiles?',
    answer:
      'Los días hábiles son los días de <strong>lunes a viernes</strong>, excluyendo:<ul class="list-disc pl-5 mt-2 space-y-1"><li>Sábados y domingos</li><li>Días festivos nacionales</li></ul><p class="mt-3">El conteo comienza el <strong>día siguiente</strong> a la imposición del comparendo (manual) o a la notificación (electrónico). Por ejemplo, si te imponen un comparendo el martes, el día 1 sería el miércoles.</p>',
  },
  {
    id: 208,
    category: 'Comparendos',
    question: '¿Los comparendos prescriben?',
    answer:
      '<strong>Sí</strong>, los comparendos pueden prescribir, pero los plazos son largos:<ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>3 años</strong> para que prescriba la acción de cobro si no hay gestión de cobro por parte de la entidad</li><li><strong>5 años</strong> para que prescriba la obligación si hay actos de cobro</li></ul><p class="mt-3 text-warning font-medium">Sin embargo, mientras esté activo, te impedirá hacer trámites vehiculares y puede afectar tu historial crediticio.</p>',
  },

  // ── CURSOS (8) ──────────────────────────────────────────────
  {
    id: 301,
    category: 'Cursos',
    question: '¿Qué es el curso pedagógico?',
    answer:
      'Es un programa de educación vial establecido por la <strong>Ley 1383 de 2010</strong>. Su objetivo es sensibilizar y educar a los conductores infractores sobre las normas de tránsito y la seguridad vial. Al completarlo, obtienes un certificado que te permite acceder a descuentos de hasta el 50% en el valor de tu multa.',
  },
  {
    id: 302,
    category: 'Cursos',
    question: '¿Cuánto dura el curso?',
    answer:
      'El curso tiene una duración de aproximadamente <strong>4 horas</strong>. Durante este tiempo se cubren temas de normas de tránsito, señales viales, seguridad vial y responsabilidades del conductor. Al finalizar, recibes tu certificado de manera inmediata.',
  },
  {
    id: 303,
    category: 'Cursos',
    question: '¿El curso es presencial o virtual?',
    answer:
      'Nuestros cursos son <strong>100% presenciales</strong>. Debes asistir a nuestras instalaciones para tomarlo. Esto garantiza una mejor experiencia de aprendizaje y cumple con los requisitos establecidos por el Ministerio de Transporte. Contamos con instalaciones cómodas con aire acondicionado y parqueadero gratuito.',
  },
  {
    id: 304,
    category: 'Cursos',
    question: '¿Qué documentos necesito para el curso?',
    answer:
      'Solo necesitas:<ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Documento de identidad original</strong> (cédula de ciudadanía o extranjería)</li><li><strong>Número del comparendo</strong> o placa del vehículo</li><li><strong>Correo electrónico activo</strong></li></ul><p class="mt-3">Si no tienes el número de comparendo, nosotros te ayudamos a consultarlo sin costo adicional.</p>',
  },
  {
    id: 305,
    category: 'Cursos',
    question: '¿Puedo hacer el curso el mismo día que llamo?',
    answer:
      '<strong>¡Sí!</strong> Dependiendo de la disponibilidad de cupos, podemos programarte para el mismo día. Te recomendamos contactarnos temprano para verificar disponibilidad. Si tu plazo está por vencer, hacemos todo lo posible por atenderte de manera prioritaria.',
  },
  {
    id: 306,
    category: 'Cursos',
    question: '¿El certificado tiene validez nacional?',
    answer:
      '<strong>Sí</strong>, nuestro certificado tiene <strong>validez en todo el territorio colombiano</strong>. Estamos habilitados por el Ministerio de Transporte, lo que garantiza que tu certificado será aceptado sin importar en qué ciudad te hayan impuesto el comparendo.',
  },
  {
    id: 307,
    category: 'Cursos',
    question: '¿Qué aprendo en el curso?',
    answer:
      'El curso cubre los siguientes temas:<ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Normas de tránsito colombianas</strong> — Código Nacional de Tránsito</li><li><strong>Señales de tránsito</strong> — Interpretación y significado</li><li><strong>Seguridad vial</strong> — Prevención de accidentes y conducción defensiva</li><li><strong>Responsabilidades del conductor</strong> — Deberes y obligaciones</li></ul>',
  },
  {
    id: 308,
    category: 'Cursos',
    question: '¿Qué pasa si no puedo asistir el día agendado?',
    answer:
      'No hay problema, puedes <strong>reprogramar tu cita sin costo adicional</strong>. Solo avísanos con anticipación para liberar tu cupo y asignarte una nueva fecha. Recuerda que es importante no perder los plazos para acceder al descuento.',
  },

  // ── DESCUENTOS (6) ──────────────────────────────────────────
  {
    id: 401,
    category: 'Descuentos',
    question: '¿Cuánto descuento puedo obtener?',
    answer:
      'Puedes obtener hasta <strong class="text-success">50% de descuento</strong> si actúas rápido, o <strong class="text-warning">25% de descuento</strong> si actúas dentro de un plazo mayor. El porcentaje depende del tipo de comparendo y los días transcurridos desde su imposición.',
  },
  {
    id: 402,
    category: 'Descuentos',
    question: '¿Cuáles son los plazos para el descuento?',
    answer:
      '<div class="grid sm:grid-cols-2 gap-4 mt-2"><div class="p-4 bg-primary-lighter rounded-xl"><h4 class="font-bold text-primary mb-2">Comparendo Manual</h4><p><span class="text-success font-semibold">50%:</span> Días 1 al 5 hábil</p><p><span class="text-warning font-semibold">25%:</span> Días 6 al 20 hábil</p></div><div class="p-4 bg-accent-light rounded-xl"><h4 class="font-bold text-accent mb-2">Fotomulta / Electrónico</h4><p><span class="text-success font-semibold">50%:</span> Días 1 al 11 hábil</p><p><span class="text-warning font-semibold">25%:</span> Días 12 al 26 hábil</p></div></div>',
  },
  {
    id: 403,
    category: 'Descuentos',
    question: '¿El descuento aplica para todas las infracciones?',
    answer:
      '<strong>Sí</strong>, el descuento aplica para todas las categorías de infracciones (A, B, C, D y E). Sin embargo, ten en cuenta que algunas infracciones graves pueden tener consecuencias adicionales como suspensión de licencia, independientemente del descuento.',
  },
  {
    id: 404,
    category: 'Descuentos',
    question: '¿Qué pasa si ya venció mi plazo para el descuento?',
    answer:
      'Si ya venció el plazo, lamentablemente <strong class="text-error">no podrás acceder al descuento</strong> y deberás pagar el 100% del valor de la multa. Sin embargo, aún puedes tomar el curso para evitar la suspensión de tu licencia de conducción. Te recomendamos contactarnos para asesorarte según tu caso.',
  },
  {
    id: 405,
    category: 'Descuentos',
    question: '¿El descuento es sobre el total de la multa?',
    answer:
      '<strong>Sí</strong>, el descuento se aplica sobre el valor total de la multa. Por ejemplo, si tu multa es de $711,750 y obtienes el 50% de descuento, solo pagarás $355,875. Los intereses de mora (si los hay) siempre se pagan al 100%.',
  },
  {
    id: 406,
    category: 'Descuentos',
    question: '¿Puedo obtener descuento si tengo varios comparendos?',
    answer:
      '<strong>Sí</strong>, puedes aplicar el descuento a cada comparendo individualmente, siempre y cuando cada uno esté dentro de los plazos establecidos. Contáctanos para evaluar tu situación específica.',
  },

  // ── PAGOS (5) ──────────────────────────────────────────────
  {
    id: 501,
    category: 'Pagos',
    question: '¿Cuánto cuesta el curso?',
    answer:
      'El costo del curso es muy accesible y varía según la categoría del comparendo. En la mayoría de los casos el ahorro en la multa supera ampliamente el valor del curso. Contáctanos por WhatsApp para obtener la tarifa exacta según tu comparendo.',
  },
  {
    id: 502,
    category: 'Pagos',
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos múltiples métodos de pago para tu comodidad:<ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Efectivo</strong></li><li><strong>Tarjeta débito</strong> (Datáfono)</li><li><strong>Tarjeta crédito</strong> (Datáfono)</li><li><strong>Transferencia bancaria</strong> (Nequi, Daviplata, etc.)</li></ul>',
  },
  {
    id: 503,
    category: 'Pagos',
    question: '¿El pago del curso incluye la multa?',
    answer:
      '<strong>No</strong>, son pagos separados. El pago del curso se realiza en nuestras instalaciones. Después de recibir tu certificado, debes pagar el saldo restante de la multa (con el descuento aplicado) en la entidad de tránsito correspondiente o a través del SIMIT.',
  },
  {
    id: 504,
    category: 'Pagos',
    question: '¿Dónde pago el saldo de la multa después del curso?',
    answer:
      'Después de obtener tu certificado, puedes pagar el saldo de la multa en:<ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>SIMIT en línea:</strong> <span class="text-primary font-medium">www.simit.org.co</span></li><li><strong>Secretaría de Tránsito</strong> de la ciudad donde te impusieron el comparendo</li><li><strong>Bancos autorizados</strong> con el recibo de pago</li></ul>',
  },
  {
    id: 505,
    category: 'Pagos',
    question: '¿Puedo pagar en cuotas?',
    answer:
      'El pago del curso debe realizarse completo el día del curso. Sin embargo, si pagas con <strong>tarjeta de crédito</strong>, puedes diferirlo según las opciones que ofrezca tu banco. Para el saldo de la multa, algunas entidades de tránsito ofrecen acuerdos de pago.',
  },

  // ── CERTIFICADOS (4) ──────────────────────────────────────────
  {
    id: 601,
    category: 'Certificados',
    question: '¿Cuándo recibo mi certificado?',
    answer:
      'Te entregamos una <strong>copia física al finalizar el curso</strong> y cargamos la información digital al RUNT inmediatamente. En máximo 24 horas el descuento quedará reflejado en el sistema SIMIT para que puedas proceder al pago de tu multa con descuento.',
  },
  {
    id: 602,
    category: 'Certificados',
    question: '¿El certificado sirve para cualquier ciudad?',
    answer:
      '<strong>Sí</strong>, tenemos habilitación nacional del Ministerio de Transporte. Tu certificado es válido para aplicar el descuento en cualquier organismo de tránsito del país, sin importar en qué ciudad recibiste tu comparendo.',
  },
  {
    id: 603,
    category: 'Certificados',
    question: '¿Qué hago con el certificado después del curso?',
    answer:
      'Guárdalo como soporte. Lo importante es que verifiques que el descuento ya aparezca reflejado en el SIMIT para proceder al pago. Si después de 24 horas no ves el descuento reflejado, contáctanos y lo solucionamos de inmediato.',
  },
  {
    id: 604,
    category: 'Certificados',
    question: '¿El certificado tiene fecha de vencimiento?',
    answer:
      'El certificado es válido para la infracción específica que estás subsanando. <strong>No sirve para futuras infracciones</strong>. Si recibes un nuevo comparendo en el futuro, deberás tomar un nuevo curso para acceder al descuento.',
  },
];
