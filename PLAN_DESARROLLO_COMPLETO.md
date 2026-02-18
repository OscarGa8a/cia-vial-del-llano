# 🚗 PLAN DE DESARROLLO - CIA VIAL DEL LLANO

## Página Web - Cursos para Descuento en Comparendos

---

## 📋 ÍNDICE

1. [Información General del Proyecto](#1-información-general-del-proyecto)
2. [Paleta de Colores y Diseño](#2-paleta-de-colores-y-diseño)
3. [Arquitectura del Proyecto Angular](#3-arquitectura-del-proyecto-angular)
4. [Mapa del Sitio](#4-mapa-del-sitio)
5. [Detalle de Vistas](#5-detalle-de-vistas)
6. [Componentes Reutilizables](#6-componentes-reutilizables)
7. [Funcionalidades Especiales](#7-funcionalidades-especiales)
8. [Integración WhatsApp](#8-integración-whatsapp)
9. [Base de Datos de Infracciones](#9-base-de-datos-de-infracciones)
10. [SEO y Optimización](#10-seo-y-optimización)
11. [Orden de Desarrollo](#11-orden-de-desarrollo)

---

## 1. INFORMACIÓN GENERAL DEL PROYECTO

### Datos de la Empresa

- **Nombre:** CIA VIAL DEL LLANO
- **Tipo:** Centro Integral de Atención (CIA)
- **Ubicación:** Meta, Colombia (Una sola sede)
- **Servicio Principal:** Cursos para descuento en comparendos y fotomultas

### Objetivo del Sitio Web

Crear una página web profesional, moderna y funcional que:

- Informe claramente sobre los cursos para descuento en multas
- Genere confianza y credibilidad institucional
- Convierta visitantes en clientes a través de WhatsApp
- Sea fácil de usar en móviles y computadores
- Posicione a CIA VIAL DEL LLANO como la mejor opción de la región

### Stack Tecnológico

- **Framework:** Angular 17+ (Standalone Components)
- **Estilos:** Tailwind CSS 4
- **Iconos:** Lucide Angular
- **Mapas:** Google Maps API / Leaflet
- **Fuentes:** Google Fonts (Poppins, Inter)
- **Animaciones:** Angular Animations + AOS (Animate On Scroll)

---

## 2. PALETA DE COLORES Y DISEÑO

### Colores Principales (Extraídos del Logo)

```css
/* === COLORES PRIMARIOS === */
--azul-principal: #1e3a5f; /* Azul oscuro/marino - Color dominante */
--azul-claro: #2d5a87; /* Azul intermedio para hovers */
--azul-muy-claro: #e8f0f8; /* Fondo azul suave */

--rojo-principal: #c8102e; /* Rojo institucional */
--rojo-hover: #a50d24; /* Rojo oscuro para hovers */
--rojo-claro: #ffe8ec; /* Fondo rojo suave */

--naranja-acento: #f5a623; /* Naranja/dorado del logo */
--naranja-hover: #e09000; /* Naranja oscuro */
--naranja-claro: #fff8e8; /* Fondo naranja suave */

/* === COLORES NEUTROS === */
--blanco: #ffffff;
--gris-claro: #f5f7fa;
--gris-medio: #e0e4e8;
--gris-texto: #6b7280;
--gris-oscuro: #374151;
--negro: #111827;

/* === COLORES SEMÁNTICOS === */
--exito: #10b981; /* Verde para éxito/50% descuento */
--advertencia: #f59e0b; /* Amarillo para advertencias/25% */
--error: #ef4444; /* Rojo para errores/vencido */
--info: #3b82f6; /* Azul para información */
```

### Configuración Tailwind 4 (tailwind.config.js)

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A5F",
          light: "#2D5A87",
          lighter: "#E8F0F8",
        },
        accent: {
          red: "#C8102E",
          "red-hover": "#A50D24",
          "red-light": "#FFE8EC",
        },
        highlight: {
          DEFAULT: "#F5A623",
          hover: "#E09000",
          light: "#FFF8E8",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
};
```

### Tipografía

- **Títulos:** Poppins (600, 700)
- **Cuerpo:** Inter (400, 500, 600)

---

## 3. ARQUITECTURA DEL PROYECTO ANGULAR

### Estructura de Carpetas

```
cia-vial-del-llano/
├── src/
│   ├── app/
│   │   ├── core/                          # Servicios singleton y configuración
│   │   │   ├── services/
│   │   │   │   ├── whatsapp.service.ts    # Servicio de integración WhatsApp
│   │   │   │   ├── infracciones.service.ts # Datos de infracciones
│   │   │   │   └── seo.service.ts         # Gestión de meta tags
│   │   │   ├── models/
│   │   │   │   ├── infraccion.model.ts
│   │   │   │   └── testimonio.model.ts
│   │   │   └── data/
│   │   │       ├── infracciones.data.ts   # Base de datos de infracciones
│   │   │       ├── testimonios.data.ts    # Testimonios de clientes
│   │   │       ├── faqs.data.ts           # Preguntas frecuentes
│   │   │       └── config.ts              # Configuración general
│   │   │
│   │   ├── shared/                        # Componentes reutilizables
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   ├── whatsapp-button/       # Botón flotante WhatsApp
│   │   │   │   ├── cta-section/           # Sección Call to Action
│   │   │   │   ├── trust-badges/          # Logos de entidades oficiales
│   │   │   │   ├── testimonial-card/      # Card de testimonio
│   │   │   │   ├── countdown-timer/       # Contador de días restantes
│   │   │   │   ├── discount-card/         # Card de descuento (50%/25%)
│   │   │   │   └── faq-accordion/         # Acordeón de preguntas
│   │   │   └── pipes/
│   │   │       └── currency-cop.pipe.ts   # Formato moneda colombiana
│   │   │
│   │   ├── pages/                         # Páginas/Vistas principales
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── sections/              # Secciones del home
│   │   │   │       ├── hero/
│   │   │   │       ├── trust-badges/
│   │   │   │       ├── descuentos-info/
│   │   │   │       ├── como-funciona/
│   │   │   │       ├── calculadora-rapida/
│   │   │   │       ├── testimonios/
│   │   │   │       ├── ubicacion-preview/
│   │   │   │       └── faqs-home/
│   │   │   │
│   │   │   ├── cursos/
│   │   │   │   ├── cursos.component.ts
│   │   │   │   └── cursos.component.html
│   │   │   │
│   │   │   ├── calculadora/
│   │   │   │   ├── calculadora.component.ts
│   │   │   │   └── calculadora.component.html
│   │   │   │
│   │   │   ├── consultar-multas/
│   │   │   │   ├── consultar-multas.component.ts
│   │   │   │   └── consultar-multas.component.html
│   │   │   │
│   │   │   ├── ubicacion/
│   │   │   │   ├── ubicacion.component.ts
│   │   │   │   └── ubicacion.component.html
│   │   │   │
│   │   │   ├── preguntas-frecuentes/
│   │   │   │   ├── preguntas-frecuentes.component.ts
│   │   │   │   └── preguntas-frecuentes.component.html
│   │   │   │
│   │   │   ├── nosotros/
│   │   │   │   ├── nosotros.component.ts
│   │   │   │   └── nosotros.component.html
│   │   │   │
│   │   │   └── contacto/
│   │   │       ├── contacto.component.ts
│   │   │       └── contacto.component.html
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo/
│   │   │   │   ├── logo-principal.svg
│   │   │   │   ├── logo-blanco.svg
│   │   │   │   └── favicon.ico
│   │   │   ├── backgrounds/
│   │   │   └── entidades/              # Logos MinTransporte, RUNT, etc.
│   │   └── fonts/
│   │
│   ├── styles.css                      # Tailwind imports
│   │
│   └── index.html
│
├── tailwind.config.js
├── angular.json
├── package.json
└── README.md
```

---

## 4. MAPA DEL SITIO

```
🏠 HOME (/)
│
├── 📚 CURSOS (/cursos)
│
├── 🧮 CALCULADORA DE MULTAS (/calculadora)
│
├── 🔍 CONSULTAR MULTAS (/consultar-multas)
│
├── 📍 UBICACIÓN (/ubicacion)
│
├── ❓ PREGUNTAS FRECUENTES (/preguntas-frecuentes)
│
├── 🏢 NOSOTROS (/nosotros)
│
└── 📞 CONTACTO (/contacto)
```

**Total: 8 páginas**

---

## 5. DETALLE DE VISTAS

---

### 5.1 HOME (Vista Principal) 🏠

**Ruta:** `/`
**Archivo:** `pages/home/home.component.ts`

Esta es la vista más importante. Debe ser impactante, informativa y convertidora.

#### Secciones del Home:

---

##### 5.1.1 HERO SECTION

**Objetivo:** Captar atención inmediata y comunicar propuesta de valor

**Elementos:**

- **Fondo:** Gradiente azul-rojo con patrón de puntos sutiles (como el logo)
- **Título Principal:** "Ahorra hasta el 50% en tus multas de tránsito"
- **Subtítulo:** "Cursos pedagógicos certificados por el Ministerio de Transporte"
- **Badge de Urgencia:** Contador animado "⏰ ¡No pierdas tu descuento!"
- **CTA Principal:** Botón "Agenda tu curso ahora" → WhatsApp
- **CTA Secundario:** Botón "Calcular mi descuento" → Ancla a calculadora
- **Imagen/Ilustración:** Gráfico de moto y carro estilo del logo
- **Trust badges pequeños:** Iconos de MinTransporte, RUNT, SIMIT

**Diseño Tailwind:**

```html
<section class="min-h-screen bg-gradient-to-br from-primary to-accent-red">
  <!-- Contenido -->
</section>
```

---

##### 5.1.2 BADGES DE CONFIANZA

**Objetivo:** Generar confianza institucional

**Elementos:**

- Barra horizontal con fondo gris claro
- Logos en escala de grises que se colorean al hover:
  - Ministerio de Transporte
  - RUNT
  - SIMIT
  - Superintendencia de Transporte
- Texto: "Habilitados y vigilados por las entidades oficiales"

---

##### 5.1.3 INFORMACIÓN DE DESCUENTOS

**Objetivo:** Mostrar claramente los beneficios y plazos

**Elementos:**

- Título: "Conoce los descuentos disponibles"
- **2 Cards principales:**

**Card 1 - Comparendo Manual/Físico:**

```
┌─────────────────────────────────────┐
│  🚔 COMPARENDO MANUAL               │
│  ─────────────────────────────────  │
│  ✓ 50% descuento                    │
│    Primeros 5 días hábiles          │
│  ─────────────────────────────────  │
│  ✓ 25% descuento                    │
│    Del día 6 al 20 hábil            │
│  ─────────────────────────────────  │
│  [Quiero este descuento] → WhatsApp │
└─────────────────────────────────────┘
```

**Card 2 - Fotomulta/Electrónico:**

```
┌─────────────────────────────────────┐
│  📷 FOTOMULTA / ELECTRÓNICO         │
│  ─────────────────────────────────  │
│  ✓ 50% descuento                    │
│    Del día 1 al 11 hábil            │
│  ─────────────────────────────────  │
│  ✓ 25% descuento                    │
│    Del día 12 al 26 hábil           │
│  ─────────────────────────────────  │
│  [Quiero este descuento] → WhatsApp │
└─────────────────────────────────────┘
```

- **Nota importante:** Banner de advertencia "⚠️ Si no cumples los plazos, pierdes el derecho al descuento"

---

##### 5.1.4 ¿CÓMO FUNCIONA?

**Objetivo:** Explicar el proceso de manera simple

**Elementos:**

- Título: "Obtén tu descuento en 4 simples pasos"
- Timeline horizontal (desktop) / vertical (móvil):

```
[1] ────── [2] ────── [3] ────── [4]

   📱           📅           📝           ✅
 Consulta    Agenda tu    Realiza el    Obtén tu
 tu multa     curso        curso       descuento
```

**Detalle de cada paso:**

1. **Consulta tu multa:** "Verifica tu comparendo en el SIMIT o con nosotros"
2. **Agenda tu cita:** "Contáctanos por WhatsApp y reserva tu cupo"
3. **Realiza el curso:** "Asiste a nuestras instalaciones (duración: 4 horas)"
4. **Obtén tu descuento:** "Recibe tu certificado y paga con descuento"

- CTA: "Comenzar ahora" → WhatsApp

---

##### 5.1.5 CALCULADORA RÁPIDA (Widget)

**Objetivo:** Herramienta interactiva para captar leads

**Elementos:**

- Título: "¿Cuánto puedes ahorrar? Calcula tu descuento"
- **Mini-calculadora:**
  - Dropdown: Tipo de infracción (las más comunes)
  - Radio buttons: Manual / Electrónico
  - Datepicker: Fecha del comparendo
  - Botón: "Calcular"
- **Resultado:**
  - Valor original de la multa
  - Tu descuento: $XXX.XXX
  - Valor a pagar: $XXX.XXX
  - Días restantes: X días
- CTA: "Quiero pagar esto" → WhatsApp con datos prellenados
- Link: "Ver calculadora completa" → /calculadora

---

##### 5.1.6 TESTIMONIOS

**Objetivo:** Prueba social

**Elementos:**

- Título: "Lo que dicen nuestros clientes"
- Estadística destacada: "Más de X cursos realizados"
- Carousel de testimonios (3-4 visibles en desktop):

```
┌─────────────────────────────────┐
│  ⭐⭐⭐⭐⭐                      │
│  "El proceso fue muy rápido..." │
│                                 │
│  👤 Juan Pérez                  │
│  Conductor de moto, Villavicencio│
└─────────────────────────────────┘
```

---

##### 5.1.7 UBICACIÓN (Preview)

**Objetivo:** Mostrar cómo llegar

**Elementos:**

- Título: "Visítanos en nuestra sede"
- **Dos columnas:**
  - **Izquierda:** Información
    - Dirección completa
    - Horarios de atención
    - Teléfonos
    - Botón "Cómo llegar" → Google Maps/Waze
  - **Derecha:** Mapa embebido (Google Maps)

---

##### 5.1.8 FAQs RESUMIDAS

**Objetivo:** Resolver dudas principales

**Elementos:**

- Título: "Preguntas frecuentes"
- 4-5 acordeones con las preguntas más importantes:
  - ¿Cuánto tiempo tengo para hacer el curso?
  - ¿Qué documentos necesito?
  - ¿Cuánto dura el curso?
  - ¿Cuánto cuesta el curso?
  - ¿Puedo hacer el curso el mismo día?
- Link: "Ver todas las preguntas" → /preguntas-frecuentes

---

##### 5.1.9 CTA FINAL

**Objetivo:** Último empujón para conversión

**Elementos:**

- Fondo gradiente azul-rojo
- Título: "¿Tienes un comparendo? ¡No pierdas tu descuento!"
- Subtítulo: "Nuestro equipo está listo para ayudarte"
- Botón grande: "Escribir por WhatsApp" (con icono de WhatsApp)
- Texto: "Respuesta en menos de 5 minutos"

---

### 5.2 CURSOS 📚

**Ruta:** `/cursos`
**Archivo:** `pages/cursos/cursos.component.ts`

**Secciones:**

1. **Hero**
   - Título: "Cursos para Descuento en Comparendos"
   - Subtítulo: "Ahorra hasta el 50% en tus multas de tránsito"
   - CTA → WhatsApp

2. **¿Qué es el curso?**
   - Explicación clara y concisa
   - Base legal (Ley 1383 de 2010, Artículo 24)
   - Certificación oficial por el Ministerio de Transporte

3. **Beneficios del Curso**
   - ✅ Descuento del 25% al 50% en tu multa
   - ✅ Certificado válido a nivel nacional
   - ✅ Duración: 4 horas
   - ✅ Horarios flexibles
   - ✅ Atención personalizada
   - ✅ Instalaciones cómodas

4. **Tabla de Descuentos Detallada**

   | Tipo        | Descuento | Plazo              |
   | ----------- | --------- | ------------------ |
   | Manual      | 50%       | 1-5 días hábiles   |
   | Manual      | 25%       | 6-20 días hábiles  |
   | Electrónico | 50%       | 1-11 días hábiles  |
   | Electrónico | 25%       | 12-26 días hábiles |

5. **Requisitos para el Curso**
   - Documento de identidad (cédula)
   - Número del comparendo
   - Correo electrónico
   - Llegar 30 minutos antes

6. **¿Qué aprenderás?**
   - Normas de tránsito
   - Señales de tránsito
   - Seguridad vial
   - Responsabilidad del conductor

7. **Proceso paso a paso**
   - Timeline visual del proceso

8. **Preguntas frecuentes específicas**
   - Acordeón con 5-6 preguntas sobre el curso

9. **CTA Final** → WhatsApp

---

### 5.3 CALCULADORA DE MULTAS 🧮

**Ruta:** `/calculadora`
**Archivo:** `pages/calculadora/calculadora.component.ts`

**Funcionalidad:** Calculadora completa e interactiva con todas las infracciones

**Secciones:**

1. **Hero**
   - Título: "Calculadora de Multas"
   - Subtítulo: "Conoce el valor de tu infracción y cuánto puedes ahorrar"

2. **Formulario de Calculadora**

   ```
   ┌─────────────────────────────────────────────────────────────┐
   │  CALCULADORA DE MULTAS                                      │
   │  ─────────────────────────────────────────────────────────  │
   │                                                             │
   │  Tipo de comparendo:                                        │
   │  ○ Manual/Físico    ○ Electrónico/Fotomulta                │
   │                                                             │
   │  Categoría de infracción:                                   │
   │  [Dropdown: A, B, C, D, E]                                  │
   │                                                             │
   │  Código de infracción:                                      │
   │  [Dropdown con búsqueda: Lista completa de infracciones]   │
   │                                                             │
   │  Fecha del comparendo:                                      │
   │  [📅 Seleccionar fecha]                                     │
   │                                                             │
   │  [    CALCULAR MI DESCUENTO    ]                           │
   └─────────────────────────────────────────────────────────────┘
   ```

3. **Resultado**

   ```
   ┌─────────────────────────────────────────────────────────────┐
   │  RESULTADO                                                  │
   │  ─────────────────────────────────────────────────────────  │
   │                                                             │
   │  Infracción: C02 - Estacionar en sitio prohibido           │
   │  SMDLV 2025: $1.423.500                                     │
   │                                                             │
   │  ┌─────────────────┬─────────────────────────────────────┐ │
   │  │ Valor multa     │ $213.525 (15 SMDLV)                 │ │
   │  ├─────────────────┼─────────────────────────────────────┤ │
   │  │ Descuento (50%) │ -$106.763                           │ │
   │  ├─────────────────┼─────────────────────────────────────┤ │
   │  │ TOTAL A PAGAR   │ $106.762                            │ │
   │  └─────────────────┴─────────────────────────────────────┘ │
   │                                                             │
   │  ⏰ Te quedan 3 días hábiles para el 50%                   │
   │  📅 Fecha límite: 12 de febrero de 2025                    │
   │                                                             │
   │  [  QUIERO ESTE DESCUENTO - WhatsApp  ]                    │
   └─────────────────────────────────────────────────────────────┘
   ```

4. **Tabla de Infracciones**
   - Tabla completa con todas las infracciones
   - Filtros por categoría (A, B, C, D, E)
   - Búsqueda por código o descripción
   - Columnas: Código, Descripción, Categoría, SMDLV, Valor 2025

5. **Información de SMDLV**
   - Valor actual del SMDLV (2025)
   - Explicación de cómo se calcula la multa

6. **CTA Final** → WhatsApp

---

### 5.4 CONSULTAR MULTAS 🔍

**Ruta:** `/consultar-multas`
**Archivo:** `pages/consultar-multas/consultar-multas.component.ts`

**Secciones:**

1. **Hero**
   - Título: "Consulta tus Multas"
   - Subtítulo: "Verifica si tienes comparendos pendientes"

2. **Opciones de Consulta**
   - Cards con enlaces directos a:
     - **SIMIT:** Sistema Integrado de Información sobre Multas (Nacional)
     - **RUNT:** Registro Único Nacional de Tránsito

   Cada card incluye:
   - Logo de la entidad
   - Descripción breve
   - Botón "Consultar ahora" (abre en nueva pestaña)

3. **Tutorial de Consulta**
   - Paso a paso de cómo consultar en SIMIT
   - Qué datos necesitas (cédula o placa)
   - Cómo interpretar los resultados

4. **¿Encontraste una multa?**
   - Sección destacada
   - CTA: "Te ayudamos a obtener el descuento" → WhatsApp

5. **Información Importante**
   - Diferencia entre comparendo manual y electrónico
   - Qué hacer si no estás de acuerdo con la multa
   - Consecuencias de no pagar

---

### 5.5 UBICACIÓN 📍

**Ruta:** `/ubicacion`
**Archivo:** `pages/ubicacion/ubicacion.component.ts`

**Secciones:**

1. **Hero**
   - Título: "Nuestra Sede"
   - Subtítulo: "Estamos ubicados en el corazón del Llano"

2. **Información de la Sede**
   - **Dirección completa:** [A definir]
   - **Teléfonos:** Fijo y celular
   - **WhatsApp:** [A definir]
   - **Email:** [A definir]
   - **Horarios:**
     - Lunes a Viernes: X:XX am - X:XX pm
     - Sábados: X:XX am - X:XX pm
     - Domingos: Cerrado

3. **Mapa Interactivo (Grande)**
   - Google Maps embebido a pantalla completa en la sección
   - Marcador de la ubicación exacta
   - Zoom adecuado para ver referencias

4. **Botones de Navegación**
   - "Abrir en Google Maps" (icono + texto)
   - "Abrir en Waze" (icono + texto)
   - "Copiar dirección" (icono + texto)

5. **Indicaciones para Llegar**
   - Puntos de referencia cercanos
   - Rutas de transporte público (si aplica)
   - Información sobre parqueadero

6. **CTA:** "Agenda tu cita" → WhatsApp

---

### 5.6 PREGUNTAS FRECUENTES ❓

**Ruta:** `/preguntas-frecuentes`
**Archivo:** `pages/preguntas-frecuentes/preguntas-frecuentes.component.ts`

**Secciones:**

1. **Hero**
   - Título: "Preguntas Frecuentes"
   - Subtítulo: "Resolvemos todas tus dudas"
   - Barra de búsqueda (opcional)

2. **Categorías de FAQs**
   - Tabs o filtros:
     - Todas
     - Sobre el Curso
     - Sobre Descuentos
     - Sobre Pagos
     - Sobre Documentos

3. **Acordeones de Preguntas**

   **Sobre el Curso:**
   - ¿Qué es el curso de comparendos?
   - ¿Cuánto dura el curso?
   - ¿Qué aprendo en el curso?
   - ¿El curso es presencial o virtual?
   - ¿Puedo hacer el curso el mismo día que lo agendo?
   - ¿El certificado es válido en todo el país?
   - ¿Qué pasa si no puedo asistir el día agendado?

   **Sobre Descuentos:**
   - ¿Cuánto descuento puedo obtener?
   - ¿Cuánto tiempo tengo para hacer el curso?
   - ¿Qué pasa si se me vence el plazo?
   - ¿El descuento aplica para cualquier infracción?
   - ¿Cómo se cuentan los días hábiles?

   **Sobre Pagos:**
   - ¿Cuánto cuesta el curso?
   - ¿Qué métodos de pago aceptan?
   - ¿El pago del curso incluye el pago de la multa?
   - ¿Dónde pago la multa después del curso?

   **Sobre Documentos:**
   - ¿Qué documentos necesito para el curso?
   - ¿Necesito llevar el comparendo físico?
   - ¿Cómo obtengo mi certificado?

   **Generales:**
   - ¿Cuáles son los horarios de atención?
   - ¿Dónde están ubicados?
   - ¿Tienen parqueadero?

4. **¿No encontraste tu respuesta?**
   - CTA: "Pregúntanos por WhatsApp" → WhatsApp

---

### 5.7 NOSOTROS 🏢

**Ruta:** `/nosotros`
**Archivo:** `pages/nosotros/nosotros.component.ts`

**Secciones:**

1. **Hero**
   - Título: "Sobre CIA VIAL DEL LLANO"
   - Subtítulo: "Tu Centro Integral de Atención de confianza"

2. **¿Quiénes Somos?**
   - Descripción de la empresa
   - Años de experiencia
   - Cantidad de cursos realizados
   - Compromiso con la seguridad vial

3. **Misión y Visión**
   - **Misión:** Capacitar y sensibilizar a los conductores infractores...
   - **Visión:** Ser el centro de atención líder en la región...

4. **¿Por qué elegirnos?**
   - ✓ Habilitados por el Ministerio de Transporte
   - ✓ Más de X años de experiencia
   - ✓ Atención personalizada
   - ✓ Horarios flexibles
   - ✓ Precios competitivos
   - ✓ Ubicación céntrica
   - ✓ Instalaciones cómodas
   - ✓ Certificación inmediata

5. **Certificaciones y Habilitaciones**
   - Logos grandes de entidades oficiales
   - Ministerio de Transporte
   - Superintendencia de Transporte
   - RUNT
   - Número de resolución/habilitación (si aplica)

6. **CTA Final** → WhatsApp

---

### 5.8 CONTACTO 📞

**Ruta:** `/contacto`
**Archivo:** `pages/contacto/contacto.component.ts`

**Secciones:**

1. **Hero**
   - Título: "Contáctanos"
   - Subtítulo: "Estamos para ayudarte"

2. **Información de Contacto**
   - Grid de cards con:
     - 📍 **Dirección:** [Dirección completa]
     - 📞 **Teléfono:** [Número fijo]
     - 📱 **WhatsApp:** [Número] + Botón directo
     - 📧 **Email:** [Correo]
     - 🕐 **Horarios:** Lun-Vie: X-X / Sáb: X-X

3. **Formulario de Contacto**

   ```
   ┌─────────────────────────────────────────┐
   │  Nombre completo *                      │
   │  [________________________________]     │
   │                                         │
   │  Teléfono/WhatsApp *                    │
   │  [________________________________]     │
   │                                         │
   │  Tipo de consulta                       │
   │  [Dropdown:                             │
   │    - Información sobre cursos           │
   │    - Agendar cita                       │
   │    - Consulta sobre mi comparendo       │
   │    - Otro                               │
   │  ]                                      │
   │                                         │
   │  Mensaje                                │
   │  [________________________________]     │
   │  [________________________________]     │
   │  [________________________________]     │
   │                                         │
   │  [    ENVIAR POR WHATSAPP    ]         │
   └─────────────────────────────────────────┘
   ```

   **Al enviar:** Abre WhatsApp con mensaje prellenado

4. **Mapa**
   - Google Maps embebido (más pequeño que en /ubicacion)

5. **Redes Sociales** (Si tienen)
   - Facebook
   - Instagram

---

## 6. COMPONENTES REUTILIZABLES

### 6.1 Header

**Archivo:** `shared/components/header/`

**Elementos:**

- Logo CIA VIAL DEL LLANO (link a home)
- Menú de navegación:
  - Inicio
  - Cursos
  - Calculadora
  - Consultar Multas
  - Ubicación
  - Nosotros
  - Contacto
- Botón destacado "Agenda tu cita" → WhatsApp
- Menú hamburguesa (móvil)

**Comportamiento:**

- Sticky al hacer scroll
- Fondo transparente → blanco al scroll
- Menú móvil con animación slide desde derecha

---

### 6.2 Footer

**Archivo:** `shared/components/footer/`

**Elementos:**

- Logo
- Columnas:
  - **Navegación:** Links principales
  - **Contacto:** Dirección, teléfono, horarios
  - **Legal:** Política de privacidad
- Logos de entidades oficiales (pequeños)
- Redes sociales
- Copyright: "© 2025 CIA VIAL DEL LLANO. Todos los derechos reservados."

---

### 6.3 Botón WhatsApp Flotante

**Archivo:** `shared/components/whatsapp-button/`

**Elementos:**

- Botón circular verde (#25D366) con icono de WhatsApp
- Tooltip "¿Necesitas ayuda?"
- Animación de pulso sutil
- Posición fija en esquina inferior derecha

**Comportamiento:**

- Siempre visible en todas las páginas
- Al click: Abre WhatsApp con mensaje según página actual

---

### 6.4 CTA Section

**Archivo:** `shared/components/cta-section/`

**Inputs:**

- `title: string`
- `subtitle: string`
- `buttonText: string`
- `whatsappMessage: string`
- `variant: 'primary' | 'gradient'`

---

### 6.5 Discount Card

**Archivo:** `shared/components/discount-card/`

**Inputs:**

- `tipo: 'manual' | 'electronico'`
- `descuento: 50 | 25`
- `diasInicio: number`
- `diasFin: number`

---

### 6.6 Trust Badges

**Archivo:** `shared/components/trust-badges/`

Logos de:

- Ministerio de Transporte
- RUNT
- SIMIT
- Superintendencia de Transporte

---

### 6.7 FAQ Accordion

**Archivo:** `shared/components/faq-accordion/`

**Inputs:**

- `question: string`
- `answer: string`
- `isOpen: boolean`

---

### 6.8 Testimonial Card

**Archivo:** `shared/components/testimonial-card/`

**Inputs:**

- `nombre: string`
- `ocupacion: string`
- `ciudad: string`
- `testimonio: string`
- `rating: number`

---

## 7. FUNCIONALIDADES ESPECIALES

### 7.1 Calculadora de Multas (Funcional)

**Características:**

- Base de datos completa de infracciones (Código Nacional de Tránsito)
- Cálculo automático según SMDLV vigente (2025)
- Cálculo de días hábiles (excluyendo fines de semana y festivos colombianos)
- Indicador visual de urgencia (verde/amarillo/rojo)
- Generación de mensaje para WhatsApp con datos del cálculo

### 7.2 Integración Google Maps

**Características:**

- Mapa embebido con marcador personalizado
- Botón para abrir en Google Maps (app o web)
- Botón para abrir en Waze
- Coordenadas exactas de la sede

### 7.3 Animaciones

**Características:**

- Fade-in al scroll (AOS library)
- Transiciones suaves en hover
- Hover effects en cards y botones
- Animación del menú móvil

### 7.4 Formularios Inteligentes

**Características:**

- Validación en tiempo real
- Mensajes de error claros
- Al enviar → Abre WhatsApp con datos prellenados
- No requiere backend

---

## 8. INTEGRACIÓN WHATSAPP

### Número de WhatsApp

```typescript
// core/data/config.ts
export const CONFIG = {
  whatsappNumber: "573XXXXXXXXX", // Número con código de país
  empresaNombre: "CIA VIAL DEL LLANO",
};
```

### Servicio de WhatsApp

```typescript
// core/services/whatsapp.service.ts
@Injectable({ providedIn: "root" })
export class WhatsappService {
  private readonly numero = CONFIG.whatsappNumber;

  generarEnlace(mensaje: string): string {
    const mensajeCodificado = encodeURIComponent(mensaje);
    return `https://wa.me/${this.numero}?text=${mensajeCodificado}`;
  }

  abrirChat(mensaje: string): void {
    window.open(this.generarEnlace(mensaje), "_blank");
  }
}
```

### Mensajes Predefinidos por Contexto

| Página/Contexto             | Mensaje                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| General (Botón flotante)    | "Hola, estoy interesado en los cursos de CIA VIAL DEL LLANO"                                                  |
| Home - CTA                  | "Hola, tengo un comparendo y quiero información sobre el curso para obtener descuento"                        |
| Cursos                      | "Hola, quiero agendar un curso para descuento en mi comparendo"                                               |
| Calculadora (con resultado) | "Hola, calculé mi multa:\n• Infracción: [CÓDIGO]\n• Valor con descuento: $[VALOR]\n\nQuiero agendar mi curso" |
| Contacto (Formulario)       | "Hola, soy [NOMBRE].\nTeléfono: [TELEFONO]\nConsulta: [TIPO]\n\n[MENSAJE]"                                    |

---

## 9. BASE DE DATOS DE INFRACCIONES

### Estructura de Datos

```typescript
// core/models/infraccion.model.ts
export interface Infraccion {
  codigo: string; // Ej: "C02"
  categoria: "A" | "B" | "C" | "D" | "E";
  descripcion: string;
  smdlv: number; // Salarios mínimos
  inmovilizacion: boolean;
  suspension: boolean;
}
```

### Valores SMDLV 2025

| Categoría | SMDLV | Valor 2025\* |
| --------- | ----- | ------------ |
| A         | 4     | $189,800     |
| B         | 8     | $379,600     |
| C         | 15    | $711,750     |
| D         | 30    | $1,423,500   |
| E         | 45    | $2,135,250   |

\*Basado en SMDLV 2025: $47,450

### Lista de Infracciones (Archivo separado)

Se creará un archivo `infracciones.data.ts` con todas las infracciones del Código Nacional de Tránsito (~100+ infracciones).

---

## 10. SEO Y OPTIMIZACIÓN

### Meta Tags por Página

| Página      | Title                                                      | Description                                                                                            |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Home        | CIA VIAL DEL LLANO \| Cursos para Descuento en Comparendos | Ahorra hasta 50% en tus multas de tránsito. Cursos pedagógicos certificados en Villavicencio, Meta.    |
| Cursos      | Cursos para Comparendos \| CIA VIAL DEL LLANO              | Realiza tu curso pedagógico y obtén hasta 50% de descuento en tu multa. Certificado por MinTransporte. |
| Calculadora | Calculadora de Multas \| CIA VIAL DEL LLANO                | Calcula el valor de tu infracción y conoce cuánto puedes ahorrar con nuestro curso.                    |
| Ubicación   | Ubicación y Horarios \| CIA VIAL DEL LLANO                 | Visítanos en nuestra sede. Dirección, horarios y cómo llegar.                                          |
| FAQs        | Preguntas Frecuentes \| CIA VIAL DEL LLANO                 | Resolvemos todas tus dudas sobre cursos, descuentos, pagos y documentos.                               |
| Nosotros    | Sobre Nosotros \| CIA VIAL DEL LLANO                       | Conoce más sobre CIA VIAL DEL LLANO, tu centro de atención de confianza en el Meta.                    |
| Contacto    | Contacto \| CIA VIAL DEL LLANO                             | Contáctanos por WhatsApp, teléfono o visítanos. Estamos para ayudarte.                                 |

### Optimización de Imágenes

- Formato WebP para mejor compresión
- Lazy loading con `loading="lazy"`
- Tamaños responsivos con srcset

### Performance

- Lazy loading de rutas en Angular
- Standalone components para tree shaking
- Preload de rutas críticas

---

## 11. ORDEN DE DESARROLLO

### ✅ Fase 1: Configuración Inicial

1. ☐ Crear proyecto Angular 17+ standalone
2. ☐ Configurar Tailwind CSS 4
3. ☐ Instalar Lucide Angular
4. ☐ Configurar variables CSS y tema de colores
5. ☐ Configurar Google Fonts (Poppins, Inter)
6. ☐ Crear estructura de carpetas

### ✅ Fase 2: Core y Shared

7. ☐ Crear modelos (infraccion.model.ts, etc.)
8. ☐ Crear servicio WhatsApp
9. ☐ Crear datos de infracciones
10. ☐ Crear datos de FAQs
11. ☐ Crear datos de testimonios
12. ☐ Componente Header
13. ☐ Componente Footer
14. ☐ Componente WhatsApp Button flotante
15. ☐ Componente CTA Section
16. ☐ Componente Trust Badges
17. ☐ Componente FAQ Accordion
18. ☐ Componente Testimonial Card
19. ☐ Componente Discount Card

### ✅ Fase 3: Home Page

20. ☐ Home - Hero Section
21. ☐ Home - Trust Badges Section
22. ☐ Home - Descuentos Info Section
23. ☐ Home - Cómo Funciona Section
24. ☐ Home - Calculadora Rápida Section
25. ☐ Home - Testimonios Section
26. ☐ Home - Ubicación Preview Section
27. ☐ Home - FAQs Section
28. ☐ Home - CTA Final Section
29. ☐ Integrar todas las secciones

### ✅ Fase 4: Páginas Secundarias

30. ☐ Página Cursos (completa)
31. ☐ Página Calculadora (completa con funcionalidad)
32. ☐ Página Consultar Multas
33. ☐ Página Ubicación (con mapa)
34. ☐ Página Preguntas Frecuentes
35. ☐ Página Nosotros
36. ☐ Página Contacto (con formulario)

### ✅ Fase 5: Pulido Final

37. ☐ Animaciones AOS
38. ☐ Responsive testing (móvil, tablet, desktop)
39. ☐ SEO meta tags
40. ☐ Favicon y PWA básico
41. ☐ Testing final
42. ☐ Build de producción

---

## DATOS PENDIENTES POR DEFINIR

Antes de comenzar, necesitamos definir:

1. **Número de WhatsApp:** ******\_\_\_******
2. **Dirección de la sede:** ******\_\_\_******
3. **Coordenadas GPS:** ******\_\_\_******
4. **Teléfono fijo:** ******\_\_\_******
5. **Email:** ******\_\_\_******
6. **Horarios de atención:**
   - Lunes a Viernes: ******\_\_\_******
   - Sábados: ******\_\_\_******
7. **Precio del curso:** ******\_\_\_******
8. **Duración del curso:** ******\_\_\_****** (asumí 4 horas)
9. **Redes sociales (si tienen):**
   - Facebook: ******\_\_\_******
   - Instagram: ******\_\_\_******

---

## PRÓXIMOS PASOS

Una vez aprobado este plan, comenzaremos con:

1. **Fase 1:** Configuración del proyecto Angular + Tailwind + Lucide
2. **Fase 2:** Componentes compartidos (Header, Footer, WhatsApp Button)
3. **Fase 3:** Home page completo
4. Continuar con las demás páginas...

---

_Documento creado para: CIA VIAL DEL LLANO_
_Fecha: Febrero 2025_
_Versión: 2.0 - Enfocado en Cursos de Comparendos_
