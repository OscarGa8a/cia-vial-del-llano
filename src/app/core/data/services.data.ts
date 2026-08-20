import { ClipboardCheckIcon, GraduationCapIcon, StethoscopeIcon } from 'lucide-angular';
import { SERVICE_IDS, type Service } from '@core/models/service.model';

/** Public-facing service summaries. Details are confirmed directly through WhatsApp. */
export const SERVICES: readonly Service[] = [
  {
    id: SERVICE_IDS.COURSES,
    title: 'Cursos pedagógicos',
    description: 'Solicita el servicio de cursos pedagógicos en Villavicencio.',
    route: '/cursos',
    whatsappMessage: 'Hola, quiero solicitar información sobre cursos pedagógicos.',
    icon: GraduationCapIcon,
    orientationTitle: 'Servicio de cursos pedagógicos',
    orientationCards: [],
    preparationChecklist: [],
    timeline: [],
    faqs: [],
  },
  {
    id: SERVICE_IDS.LICENSE_RENEWAL,
    title: 'Refrendación de licencia',
    description: 'Solicita el servicio de refrendación o renovación de tu licencia en Villavicencio.',
    route: '/refrendacion',
    whatsappMessage:
      'Hola, quiero solicitar el servicio de refrendación o renovación de mi licencia de conducción. ¿Me ayudan a confirmar la atención y los detalles para mi caso?',
    icon: ClipboardCheckIcon,
    orientationTitle: 'Servicio de refrendación de licencia',
    orientationCards: [
      {
        title: 'Información de tu licencia',
        description: 'Comparte los datos disponibles de tu licencia para iniciar tu solicitud.',
      },
      {
        title: 'Atención para tu caso',
        description: 'Solicita el servicio y confirma los detalles que necesitas conocer.',
      },
      {
        title: 'Detalles confirmados',
        description: 'Confirma documentación, cita, valor y disponibilidad antes de continuar.',
      },
    ],
    preparationChecklist: [
      'Ten a mano la información disponible de tu licencia.',
      'Comparte el motivo de tu solicitud y las dudas que quieres resolver.',
      'Confirma documentación, cita, valor y disponibilidad para tu caso.',
    ],
    timeline: [
      {
        title: 'Solicita el servicio',
        description: 'Escríbenos para solicitar la refrendación o renovación de tu licencia.',
      },
      {
        title: 'Confirma los detalles',
        description: 'Revisa la atención y la información disponible para tu caso.',
      },
      {
        title: 'Continúa con la información confirmada',
        description: 'Avanza con los detalles que confirmaste para tu solicitud.',
      },
    ],
    faqs: [
      {
        question: '¿Qué información es útil para iniciar?',
        answer: 'Puedes compartir los datos disponibles de tu licencia y el motivo de tu solicitud.',
      },
      {
        question: '¿Qué detalles puedo confirmar?',
        answer: 'Por WhatsApp puedes confirmar documentación, cita, valor y disponibilidad para tu caso.',
      },
    ],
  },
  {
    id: SERVICE_IDS.MEDICAL_EXAMS,
    title: 'Exámenes médicos',
    description: 'Solicita exámenes médicos para licencia de conducción en Villavicencio.',
    route: '/examenes-medicos',
    whatsappMessage:
      'Hola, quiero solicitar exámenes médicos para mi licencia de conducción. ¿Me ayudan a confirmar la cita, ubicación, valor y disponibilidad?',
    icon: StethoscopeIcon,
    orientationTitle: 'Servicio de exámenes médicos',
    orientationCards: [
      {
        title: 'Exámenes para tu licencia',
        description: 'Solicita el servicio de exámenes médicos para tu licencia de conducción.',
      },
      {
        title: 'Información para tu solicitud',
        description: 'Comparte el tipo de trámite de licencia que deseas realizar.',
      },
      {
        title: 'Detalles confirmados',
        description: 'Confirma documentación, cita, ubicación, valor y disponibilidad.',
      },
    ],
    preparationChecklist: [
      'Ten claro el trámite de licencia para el que solicitas los exámenes.',
      'Comparte la información que tengas disponible para tu solicitud.',
      'Confirma documentación, cita, ubicación, valor y disponibilidad.',
    ],
    timeline: [
      {
        title: 'Solicita los exámenes médicos',
        description: 'Escríbenos por WhatsApp para solicitar el servicio.',
      },
      {
        title: 'Comparte tu trámite de licencia',
        description: 'Cuéntanos qué trámite deseas realizar.',
      },
      {
        title: 'Confirma los detalles',
        description: 'Revisa cita, ubicación, valor y disponibilidad.',
      },
      {
        title: 'Continúa con la información confirmada',
        description: 'Avanza con los detalles que confirmaste para tu solicitud.',
      },
    ],
    faqs: [
      {
        question: '¿Para qué sirven los exámenes médicos para licencia?',
        answer: 'Son un servicio para personas que realizan trámites de licencia de conducción.',
      },
      {
        question: '¿Qué detalles puedo confirmar?',
        answer: 'Por WhatsApp puedes confirmar documentación, cita, ubicación, valor y disponibilidad.',
      },
    ],
  },
] as const;

export const getServiceById = (id: Service['id']): Service =>
  SERVICES.find((service) => service.id === id) ?? SERVICES[0];
