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
