import type { Faq } from '../models/faq.model';

/** Frequently asked questions for the home page FAQ section. */
export const FAQS: readonly Faq[] = [
  {
    id: 1,
    question: '¿Cuánto tiempo tengo para hacer el curso y obtener el descuento?',
    answer:
      'Depende del tipo de comparendo. Para comparendos manuales tienes hasta 20 días hábiles desde la fecha de notificación (50% en los primeros 5 días, 25% del día 6 al 20). Para fotomultas tienes hasta 26 días hábiles (50% del día 1 al 11, 25% del día 12 al 26). Es fundamental actuar rápido para no perder el descuento.',
  },
  {
    id: 2,
    question: '¿Qué documentos necesito para tomar el curso?',
    answer:
      'Solo necesitas: (1) Documento de identidad vigente (cédula de ciudadanía), (2) Número de tu comparendo o fotomulta, y (3) Correo electrónico para recibir el certificado. Te recomendamos llegar 30 minutos antes de la hora de inicio.',
  },
  {
    id: 3,
    question: '¿Cuánto dura el curso y qué aprendo?',
    answer:
      'El curso tiene una duración de 4 horas y es 100% presencial en nuestras instalaciones. Aprenderás normas de tránsito, señales viales, seguridad vial y responsabilidad del conductor. Al finalizar recibirás un certificado oficial habilitado por el Ministerio de Transporte.',
  },
  {
    id: 4,
    question: '¿Cuánto cuesta el curso?',
    answer:
      'El costo del curso es muy accesible y varía según la categoría del comparendo. En la mayoría de los casos el ahorro en la multa supera ampliamente el valor del curso. Contáctanos por WhatsApp para obtener la tarifa exacta según tu comparendo.',
  },
  {
    id: 5,
    question: '¿Puedo hacer el curso el mismo día que me contacto?',
    answer:
      'Sí, en muchos casos tenemos cupos disponibles para el mismo día o el día siguiente. Te recomendamos contactarnos con anticipación para reservar tu cupo, especialmente si tu plazo está próximo a vencer. Escríbenos por WhatsApp y te confirmamos disponibilidad inmediatamente.',
  },
];

/** Course-specific frequently asked questions for the courses page. */
export const COURSE_FAQS: readonly Faq[] = [
  {
    id: 101,
    question: '¿Qué es el curso pedagógico por infracción de tránsito?',
    answer:
      'Es un curso obligatorio establecido por la Ley 1383 de 2010 para conductores que han recibido un comparendo o fotomulta. Al completarlo, puedes obtener un descuento de hasta el 50% en el valor de tu multa. Es impartido por centros autorizados por el Ministerio de Transporte.',
  },
  {
    id: 102,
    question: '¿El certificado del curso tiene validez nacional?',
    answer:
      'Sí. El certificado que emitimos está avalado por el Ministerio de Transporte y tiene validez en todo el territorio nacional. Queda registrado automáticamente en el RUNT (Registro Único Nacional de Tránsito) para que puedas aplicar tu descuento en cualquier organismo de tránsito.',
  },
  {
    id: 103,
    question: '¿Los días para el descuento son hábiles o calendario?',
    answer:
      'Los plazos se cuentan en días hábiles (lunes a viernes, sin contar festivos). Para comparendos manuales tienes 5 días hábiles para el 50% y 20 días para el 25%. Para fotomultas, 11 días hábiles para el 50% y 26 días para el 25%. ¡Cada día cuenta!',
  },
  {
    id: 104,
    question: '¿Puedo tomar el curso si mi comparendo es de otra ciudad?',
    answer:
      'Sí. Como nuestro certificado tiene validez nacional y se registra en el RUNT, puedes tomar el curso en nuestras instalaciones en Villavicencio sin importar en qué ciudad recibiste tu comparendo. El descuento se aplica igualmente.',
  },
  {
    id: 105,
    question: '¿Qué pasa si no tomo el curso dentro del plazo?',
    answer:
      'Si no realizas el curso dentro de los plazos establecidos, pierdes el derecho al descuento y deberás pagar el 100% del valor del comparendo. Además, la multa podría generar intereses de mora. Por eso te recomendamos actuar lo antes posible.',
  },
  {
    id: 106,
    question: '¿El curso sirve para fotomultas y comparendos electrónicos?',
    answer:
      'Sí, el curso aplica tanto para comparendos manuales (impuestos por un agente de tránsito) como para fotomultas y comparendos electrónicos (capturados por cámaras). Los plazos de descuento varían según el tipo, pero el curso es el mismo para ambos.',
  },
];
