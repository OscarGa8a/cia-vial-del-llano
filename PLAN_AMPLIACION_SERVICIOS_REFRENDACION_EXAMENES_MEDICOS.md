# Plan de ampliación de servicios — Refrendación y Exámenes Médicos

**Proyecto:** CIA Vial del Llano  
**Fecha:** 19 de agosto de 2026  
**Estado:** Plan de implementación  
**Alcance:** Incorporar en la web los servicios de **Refrendación de licencia** y **Exámenes médicos**, integrándolos a la experiencia actual sin rediseñar el proyecto desde cero.

---

## 1. Resumen ejecutivo

La web actual está construida y posicionada casi por completo alrededor de un servicio: **cursos pedagógicos para descuento en comparendos**. La nueva necesidad del cliente es ampliar la oferta visible para que el sitio también comunique:

1. **Refrendación de licencia**.
2. **Exámenes médicos para trámites de licencia de conducción**.

El objetivo no es agregar dos enlaces aislados ni convertir el sitio en un portal diferente. La propuesta es evolucionar la percepción de CIA Vial del Llano desde una web centrada únicamente en comparendos hacia una web de **servicios para conductores**, manteniendo los cursos y la calculadora como elementos diferenciales importantes.

La ampliación debe conservar:

- La identidad visual actual.
- La arquitectura Angular existente.
- El enfoque de conversión por WhatsApp.
- El prerender/SSR de las páginas públicas.
- El SEO local orientado a Villavicencio y Meta.
- La accesibilidad WCAG AA definida en `AGENTS.md`.
- El enfoque mobile-first del sitio.

No se requiere backend para esta ampliación.

---

## 2. Contexto confirmado y límites del alcance

### 2.1 Confirmado por el cliente

- CIA Vial del Llano es un **Centro Integral de Atención (CIA)**.
- No es un CRC.
- El cliente quiere que la web muestre como parte de su oferta:
  - Refrendación.
  - Exámenes médicos.

### 2.2 Decisión de producto

No se solicitará al cliente un desglose de su operación interna ni de los terceros que puedan intervenir en esos servicios. Para esta fase, la web debe comunicar la disponibilidad comercial de los servicios y dirigir la conversación a WhatsApp.

### 2.3 Guardrail de contenido

Aunque los servicios se mostrarán como parte de la oferta de CIA Vial del Llano, el contenido debe evitar afirmaciones específicas que no están confirmadas, por ejemplo:

- No afirmar que CIA Vial del Llano es un **CRC**.
- No afirmar que CIA Vial del Llano **expide directamente** el certificado de aptitud física, mental y de coordinación motriz.
- No afirmar que los exámenes son realizados **en la misma sede** mientras ese dato no esté confirmado.
- No afirmar tiempos exactos, precios, profesionales, convenios, categorías atendidas o entrega inmediata mientras esos datos no hayan sido entregados por el cliente.
- No inventar habilitaciones, registros, certificaciones o alianzas.

### 2.4 Contexto normativo utilizado solo como límite de comunicación

La información oficial del Ministerio de Transporte distingue el trámite de renovación de licencia del examen de aptitud física, mental y de coordinación motriz, y señala que el certificado correspondiente es expedido por un CRC registrado en RUNT. Por esa razón, el sitio puede promocionar y captar solicitudes relacionadas con el servicio, pero no debe redactarse como si CIA Vial fuera un CRC.

Este punto no debe convertirse en una explicación jurídica dentro de la página. Es una regla interna para redactar el contenido de manera segura y precisa.

---

## 3. Diagnóstico del estado actual

### 3.1 Navegación

Actualmente el router público contiene:

- `/`
- `/cursos`
- `/calculadora`
- `/ubicacion`
- `/preguntas-frecuentes`
- `/nosotros`
- `/contacto`

Todas las rutas usan lazy loading mediante `loadComponent`.

El header presenta todos esos destinos como enlaces de primer nivel. Agregar dos enlaces adicionales directamente produciría una navegación demasiado larga, especialmente en resoluciones cercanas al breakpoint desktop.

### 3.2 Prerender

`app.routes.server.ts` declara explícitamente cada ruta pública con `RenderMode.Prerender`. Por tanto, toda página nueva debe agregarse también allí. Agregarla únicamente en `app.routes.ts` dejaría incompleta la estrategia SSR/SEO actual.

### 3.3 Home

El Home actual sigue este orden:

1. Hero.
2. Trust badges.
3. Descuentos.
4. Pasos.
5. Preview de calculadora.
6. Testimonios.
7. Ubicación.
8. FAQ.
9. CTA final.

No existe una sección general de servicios. El visitante entra directamente al embudo de comparendos.

### 3.4 Mensaje de marca

El sitio sigue definiendo el negocio principalmente como:

> Cursos para descuento en comparendos y fotomultas.

Esto aparece en configuración global, metadatos y diferentes CTAs. Con la ampliación de servicios debe conservarse el posicionamiento de cursos, pero la presentación general del negocio debe dejar de parecer de un solo servicio.

### 3.5 WhatsApp

Existe un servicio centralizado `Whatsapp` que permite generar mensajes personalizados. Esto es una ventaja: no se necesita crear otra integración; solo se debe definir una estrategia consistente de mensajes por intención.

### 3.6 SEO

`PAGE_SEO_CONFIG` ya centraliza títulos, descripciones y keywords por página. Las nuevas páginas deben seguir el mismo patrón.

También deben revisarse:

- `SEO_CONFIG.defaultTitle`.
- `SEO_CONFIG.defaultDescription`.
- `SEO_CONFIG.defaultKeywords`.
- `defaultImageAlt`.
- Metadatos estáticos de `src/index.html`.

### 3.7 Analítica

Google Tag Manager ya está instalado en `src/index.html` con el contenedor actual. La ampliación debe aprovecharlo para diferenciar los leads según servicio.

### 3.8 Hallazgos colaterales a corregir

1. El teléfono definido en `CONFIG.contact` no coincide con el número hardcodeado en el SEO de la página de contacto.
2. `src/app/app.spec.ts` todavía espera el texto inicial generado por Angular (`Hello, cia-vial-del-llano`), por lo que esa prueba está obsoleta y debe corregirse antes de utilizar el test suite como criterio de aceptación.
3. El `README.md` continúa siendo mayormente el README genérico de Angular. No bloquea esta feature, pero debería actualizarse en una tarea separada.
4. El plan de desarrollo original describe una versión anterior del alcance y del stack. Este documento debe considerarse la fuente específica para esta ampliación.

---

## 4. Objetivo de experiencia

Después de la implementación, un visitante debe entender en pocos segundos que CIA Vial del Llano ofrece atención relacionada con tres necesidades principales:

```text
CIA Vial del Llano
│
├── Cursos pedagógicos
├── Refrendación de licencia
└── Exámenes médicos

+ Calculadora de multas como herramienta de captación
```

La experiencia debe responder rápidamente:

- ¿Qué servicios ofrecen?
- ¿Cuál de ellos necesito?
- ¿Dónde están ubicados?
- ¿Cómo los contacto?

El siguiente paso comercial principal seguirá siendo **WhatsApp**.

---

## 5. Nueva arquitectura de información

### 5.1 Navegación principal propuesta

Desktop:

```text
Inicio
Servicios ▾
  ├── Cursos pedagógicos
  ├── Refrendación
  └── Exámenes médicos
Calculadora
Ubicación
Preguntas
Contacto
[WhatsApp]
```

`Nosotros` deja de ocupar espacio en la navegación principal, pero la página **no se elimina**. Debe continuar accesible desde el footer y desde enlaces contextuales cuando tenga sentido.

### 5.2 Navegación móvil

En móvil no debe implementarse un hover dropdown. El bloque **Servicios** debe funcionar como sección desplegable accesible o como grupo visual de enlaces dentro del menú.

Requisitos:

- Botón real para expandir/contraer.
- `aria-expanded`.
- `aria-controls`.
- Navegación completa por teclado.
- No depender únicamente de animaciones.
- Al seleccionar un servicio, cerrar el menú móvil.

### 5.3 Nuevas rutas

Agregar:

```text
/refrendacion
/examenes-medicos
```

Decisión: utilizar slugs cortos y claros. Los títulos y textos SEO pueden incluir las expresiones más descriptivas como “refrendación de licencia de conducción” y “exámenes médicos para licencia de conducción”.

Ambas rutas deben existir en:

- `src/app/app.routes.ts`.
- `src/app/app.routes.server.ts` con `RenderMode.Prerender`.

---

## 6. Cambios en el Home

### 6.1 Nueva sección `ServicesSection`

Crear una sección nueva inmediatamente después de `TrustBadgesSection` y antes de `DiscountsSection`.

Orden propuesto:

```text
Hero
Trust badges
NUEVO → Servicios
Descuentos
Pasos
Calculadora
Testimonios
Ubicación
FAQ
CTA final
```

### 6.2 Objetivo de la sección

Permitir que el visitante identifique la amplitud de la oferta sin tener que abrir el menú.

### 6.3 Contenido inicial recomendado

#### Card 1 — Cursos pedagógicos

**Título:** Cursos pedagógicos  
**Descripción:** Realiza tu curso y conoce las condiciones aplicables para acceder a descuentos en comparendos de tránsito.  
**CTA:** `Conocer cursos`  
**Destino:** `/cursos`

#### Card 2 — Refrendación

**Título:** Refrendación de licencia  
**Descripción:** Realiza tu proceso de refrendación de licencia con orientación clara y atención en Villavicencio.  
**CTA:** `Ver refrendación`  
**Destino:** `/refrendacion`

#### Card 3 — Exámenes médicos

**Título:** Exámenes médicos  
**Descripción:** Consulta el servicio de exámenes médicos requeridos para trámites relacionados con tu licencia de conducción.  
**CTA:** `Ver exámenes`  
**Destino:** `/examenes-medicos`

> El copy es base de implementación y puede ajustarse visualmente durante desarrollo, manteniendo los guardrails del punto 2.3.

### 6.4 Diseño

La sección debe reutilizar el sistema visual existente:

- `max-w-7xl` y espaciados consistentes con Home.
- Colores institucionales existentes.
- Lucide Angular para iconografía.
- Cards con estados hover/focus consistentes.
- No crear un sistema de diseño paralelo.
- 1 columna móvil, 3 columnas desktop cuando haya espacio.
- Toda card debe tener jerarquía semántica correcta y CTA visible.

### 6.5 Hero del Home

No se recomienda reemplazar completamente el Hero actual por un mensaje genérico, porque los cursos y descuentos siguen siendo el activo diferencial más fuerte del sitio.

Sí se recomienda ampliar la percepción de la oferta mediante uno de estos recursos:

- Eyebrow/badge: `Cursos · Refrendación · Exámenes médicos`.
- Microcopy secundario que indique que existen más servicios para conductores.
- Enlace discreto a la sección de servicios.

Evitar que el Hero pierda su CTA principal o el acceso a la calculadora.

### 6.6 Texto del logo/header

Actualmente el subtítulo junto al logo comunica únicamente “Cursos para descuento en multas”. Debe evaluarse una variante más amplia, por ejemplo:

> Servicios para conductores

O una variante equivalente que no prometa una habilitación distinta a CIA.

---

## 7. Página `/refrendacion`

### 7.1 Objetivo

Captar usuarios que llegan con intención de renovar/refrendar su licencia y llevarlos a WhatsApp con contexto suficiente.

### 7.2 H1 recomendado

> Refrendación de licencia de conducción en Villavicencio

### 7.3 Estructura de página

1. **Hero**
   - Breadcrumb.
   - H1.
   - Descripción corta.
   - CTA WhatsApp.
   - Elemento visual/icono relacionado con licencia.

2. **Qué es la refrendación**
   - Explicación breve y orientada al usuario.
   - Utilizar también el término “renovación” en el texto para claridad y búsqueda.

3. **¿Cuándo puede necesitar este servicio?**
   - Licencia vencida.
   - Licencia próxima a vencer.
   - Necesidad de continuar conduciendo con documentación vigente.
   - No introducir plazos particulares sin verificar fuente vigente.

4. **Qué puedes esperar del proceso**
   - Presentar la experiencia de manera general.
   - Evitar describir como propias etapas ejecutadas por autoridades o CRC.
   - CTA de consulta si el usuario necesita saber qué debe llevar.

5. **Requisitos / preparación**
   - Solo información oficialmente verificable o confirmada por el cliente.
   - No publicar precios o tiempos inventados.
   - Si faltan datos comerciales, utilizar: “Escríbenos para confirmar requisitos y disponibilidad”.

6. **FAQ específica**
   - ¿Qué es la refrendación de licencia?
   - ¿Cómo sé si mi licencia está vencida?
   - ¿Necesito exámenes médicos?
   - ¿Debo agendar?
   - ¿Dónde puedo solicitar información?
   - Las respuestas deben respetar los límites de contenido definidos.

7. **CTA final**
   - WhatsApp específico de refrendación.
   - Mostrar dirección/ubicación como apoyo secundario.

### 7.4 WhatsApp sugerido

```text
Hola, quiero información sobre el servicio de refrendación de licencia de conducción.
```

---

## 8. Página `/examenes-medicos`

### 8.1 Objetivo

Captar usuarios interesados en exámenes médicos relacionados con trámites de licencia y conducirlos a WhatsApp.

### 8.2 H1 recomendado

> Exámenes médicos para licencia de conducción en Villavicencio

### 8.3 Estructura de página

1. **Hero**
   - Breadcrumb.
   - H1.
   - Descripción corta.
   - CTA WhatsApp.

2. **¿Para qué sirven estos exámenes?**
   - Explicación sencilla del propósito del examen de aptitud para trámites de conducción.
   - Evitar lenguaje que implique que CIA Vial expide el certificado directamente.

3. **Aspectos que se evalúan**
   - Utilizar únicamente conceptos respaldados por fuentes oficiales vigentes.
   - Presentación visual mediante iconos/cards.
   - Evitar inventar especialidades médicas, equipos, profesionales o duración.

4. **¿En qué trámites pueden solicitarse?**
   - Contenido general y verificable.
   - Enlazar conceptualmente con la página de refrendación.

5. **Antes de asistir / consultar**
   - Si no existe información confirmada sobre documentos, precio, cita o sede del examen, no inventarla.
   - CTA a WhatsApp para obtener la información actual.

6. **FAQ específica**
   - ¿Para qué sirven los exámenes?
   - ¿Necesito examen para refrendar mi licencia?
   - ¿Debo agendar?
   - ¿Qué debo llevar?
   - ¿Cómo consulto el valor?

7. **CTA final**
   - WhatsApp específico de exámenes médicos.

### 8.4 WhatsApp sugerido

```text
Hola, quiero información sobre los exámenes médicos para licencia de conducción.
```

---

## 9. Datos y modelo de servicios

Evitar hardcodear el mismo nombre, descripción y mensaje de WhatsApp en Home, header, footer y páginas.

Crear un archivo central, por ejemplo:

```text
src/app/core/data/services.data.ts
```

Modelo sugerido:

```ts
export interface ServiceOffering {
  readonly id: 'courses' | 'license-renewal' | 'medical-exams';
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly route: string;
  readonly whatsappMessage: string;
}
```

Datos conceptuales:

```text
courses
license-renewal
medical-exams
```

Beneficios:

- Un solo origen para cards y navegación.
- Menor riesgo de textos contradictorios.
- Más fácil agregar un cuarto servicio en el futuro.
- Facilita tracking y pruebas.

No incluir en este modelo precios, tiempos o requisitos no confirmados.

---

## 10. WhatsApp y conversión

### 10.1 Mantener el servicio existente

No crear otro servicio de WhatsApp. Extender el uso de `Whatsapp.generateLink()`.

### 10.2 Mensaje global

El `CONFIG.defaultWhatsappMessage` actual está orientado exclusivamente a cursos. Cambiarlo a un mensaje neutral, por ejemplo:

```text
Hola, quiero información sobre los servicios de CIA Vial del Llano.
```

Los CTAs de alta intención deben seguir usando mensajes específicos.

### 10.3 Mensajes por intención

- `course`
- `license_renewal`
- `medical_exam`
- `general_contact`
- `calculator_result`

### 10.4 Regla

Nunca dirigir un CTA de refrendación o exámenes al mensaje genérico de cursos.

---

## 11. SEO

### 11.1 Nuevas entradas en `PAGE_SEO_CONFIG`

#### Refrendación

**Title propuesto:**

> Refrendación de Licencia en Villavicencio | CIA Vial del Llano

**Description propuesta:**

> Consulta el servicio de refrendación de licencia de conducción en Villavicencio con CIA Vial del Llano. Recibe información y atención por WhatsApp.

**Keywords base:**

- refrendación licencia Villavicencio
- renovación licencia Villavicencio
- refrendar licencia conducción
- renovar pase Villavicencio
- licencia conducción Villavicencio

#### Exámenes médicos

**Title propuesto:**

> Exámenes Médicos para Licencia en Villavicencio | CIA Vial del Llano

**Description propuesta:**

> Consulta información sobre exámenes médicos para trámites de licencia de conducción en Villavicencio. Atención de CIA Vial del Llano por WhatsApp.

**Keywords base:**

- exámenes médicos licencia Villavicencio
- examen médico licencia conducción
- examen para pase Villavicencio
- exámenes conducción Villavicencio

### 11.2 SEO global

Actualizar el mensaje general para que el sitio no se describa exclusivamente como una web de cursos.

No eliminar las keywords de comparendos porque siguen siendo relevantes.

### 11.3 `src/index.html`

Actualizar como mínimo:

- `<title>` inicial.
- `meta description` inicial.

La metadata dinámica seguirá siendo administrada por `Seo` en cada página.

### 11.4 Canonical y breadcrumb

Cada página debe utilizar:

- Canonical propia.
- `BreadcrumbList` mediante `Seo.generateBreadcrumbSchema()`.

### 11.5 Structured data adicional

No agregar en la primera fase un schema `Service` que pueda implicar detalles de prestación no confirmados. Mantener Organization/LocalBusiness y BreadcrumbList. Evaluar `Service` posteriormente si el cliente confirma el modelo comercial exacto.

---

## 12. Analítica con Google Tag Manager

GTM ya está instalado. Agregar medición diferenciada para los nuevos CTAs.

Eventos propuestos:

```text
whatsapp_click
```

Parámetros:

```text
service: courses | license_renewal | medical_exams | general | calculator
placement: header | home_services | service_hero | service_final_cta | footer
```

Alternativa si se prefiere eventos separados:

```text
whatsapp_course
whatsapp_license_renewal
whatsapp_medical_exam
```

Se recomienda el primer enfoque porque escala mejor.

No bloquear la feature si la capa de eventos requiere una segunda iteración; pero los CTAs deben quedar preparados para identificar su intención.

---

## 13. Footer

Actualizar `quickLinks` para reflejar los nuevos servicios.

Propuesta de agrupación visual:

```text
Servicios
- Cursos pedagógicos
- Refrendación
- Exámenes médicos

Enlaces
- Calculadora
- Ubicación
- Preguntas frecuentes
- Nosotros
- Contacto
```

Si el diseño actual no permite una quinta columna sin romper el layout, mantener cuatro columnas y redistribuir enlaces internamente.

---

## 14. Componentes y reutilización

### 14.1 Nuevo componente de Home

```text
src/app/pages/home/components/services-section/
  services-section.ts
  services-section.html
  services-section.css
```

Actualizar el barrel `components/index.ts` correspondiente.

### 14.2 Nuevas páginas

Propuesta:

```text
src/app/pages/license-renewal/
  license-renewal.ts
  license-renewal.html
  license-renewal.css
  components/

src/app/pages/medical-exams/
  medical-exams.ts
  medical-exams.html
  medical-exams.css
  components/
```

Los nombres internos pueden permanecer en inglés, siguiendo el patrón actual (`courses`, `calculator`, `ubication`, `contact`), mientras las rutas públicas permanecen en español.

### 14.3 Reutilización

Antes de crear componentes nuevos para CTA, FAQ, cards o iconografía, revisar los componentes existentes en `shared/components` y los patrones de `pages/courses/components`.

Principio:

> Compartir comportamiento y UI repetidos; no abstraer prematuramente secciones que solo coinciden visualmente una vez.

---

## 15. Accesibilidad

La implementación debe respetar `AGENTS.md`:

- WCAG AA.
- AXE sin errores.
- Focus visible.
- Contraste suficiente.
- Menús accesibles por teclado.
- Botones y enlaces con nombres accesibles.
- Jerarquía H1 → H2 → H3 correcta.
- No convertir `div` en controles interactivos.
- `aria-expanded`/`aria-controls` en submenús.
- Imágenes con `NgOptimizedImage` cuando sean estáticas.
- `alt` significativo; decorativas con tratamiento adecuado.

El dropdown desktop y el grupo móvil de Servicios son los puntos de mayor riesgo de accesibilidad.

---

## 16. Responsive

Validar como mínimo:

- 320 px.
- 375/390 px.
- 768 px.
- 1024 px.
- 1280 px o superior.

Especial atención a:

- Header con nuevo menú Servicios.
- Cards de servicios.
- H1 largos de las nuevas páginas.
- CTAs de WhatsApp.
- Breadcrumbs.
- FAQ.
- Footer con mayor cantidad de enlaces.

---

## 17. Pruebas y QA

### 17.1 Antes de implementar

Corregir o reemplazar la prueba obsoleta de `app.spec.ts` que espera el contenido inicial de Angular.

### 17.2 Unit/component tests recomendados

Agregar pruebas de alto valor para:

- La app se renderiza.
- `ServicesSection` muestra los tres servicios.
- Cada card utiliza la ruta correcta.
- Los mensajes de WhatsApp por servicio son distintos.
- El header contiene acceso a los tres servicios.
- El submenú móvil abre/cierra correctamente.
- Las páginas nuevas pueden instanciarse.
- SEO de cada página utiliza su entrada correcta.

No es necesario probar clases Tailwind una por una.

### 17.3 Build

Criterios mínimos:

```bash
pnpm test
pnpm build
```

El build SSR/prerender debe producir correctamente ambas rutas nuevas.

### 17.4 QA manual

Comprobar:

- `/refrendacion` carga directamente y al refrescar.
- `/examenes-medicos` carga directamente y al refrescar.
- Menú desktop.
- Menú móvil.
- Botones atrás/adelante del navegador.
- Canonical correcta.
- `<title>` correcto.
- CTA abre el número correcto.
- Mensaje de WhatsApp corresponde al servicio.
- No hay referencias visibles que indiquen que CIA Vial es un CRC.
- No hay textos que prometan precios, tiempos o habilitaciones no confirmados.

---

## 18. Matriz de archivos a modificar

### Archivos existentes

| Archivo | Cambio |
|---|---|
| `src/app/app.routes.ts` | Agregar las dos rutas lazy |
| `src/app/app.routes.server.ts` | Agregar prerender de las dos rutas |
| `src/app/pages/home/home.ts` | Importar `ServicesSection` |
| `src/app/pages/home/home.html` | Insertar la nueva sección |
| `src/app/pages/home/components/index.ts` | Exportar nueva sección |
| `src/app/pages/home/components/hero-section/*` | Ampliar percepción de servicios sin perder foco de cursos |
| `src/app/shared/components/header/header.ts` | Modelo de navegación/submenú y mensajes generales |
| `src/app/shared/components/header/header.html` | UI desktop/mobile de Servicios |
| `src/app/shared/components/header/header.css` | Solo si hacen falta estilos no cubiertos por utilidades |
| `src/app/shared/components/footer/footer.ts` | Agregar/redistribuir servicios |
| `src/app/shared/components/footer/footer.html` | Ajustar agrupación visual si aplica |
| `src/app/core/data/config.data.ts` | Slogan/mensaje general; verificar datos de contacto |
| `src/app/core/constants/seo.ts` | SEO de páginas nuevas y mensaje global |
| `src/app/core/services/whatsapp.ts` | Mantener API; extender solo si centralizar intención aporta valor |
| `src/index.html` | Title/description iniciales más amplios |
| `src/app/app.spec.ts` | Eliminar expectativa obsoleta y agregar prueba útil |

### Archivos nuevos

```text
src/app/core/data/services.data.ts
src/app/pages/home/components/services-section/services-section.ts
src/app/pages/home/components/services-section/services-section.html
src/app/pages/home/components/services-section/services-section.css
src/app/pages/license-renewal/license-renewal.ts
src/app/pages/license-renewal/license-renewal.html
src/app/pages/license-renewal/license-renewal.css
src/app/pages/medical-exams/medical-exams.ts
src/app/pages/medical-exams/medical-exams.html
src/app/pages/medical-exams/medical-exams.css
```

Los subcomponentes internos de las dos páginas se crearán únicamente donde ayuden a mantener cada componente enfocado y pequeño.

---

## 19. Orden de implementación recomendado

### Fase 0 — Higiene previa

1. Verificar número de teléfono oficial y corregir inconsistencia SEO/CONFIG.
2. Corregir `app.spec.ts` obsoleto.
3. Confirmar que `pnpm build` parte de una base funcional.

### Fase 1 — Modelo y routing

1. Crear `services.data.ts`.
2. Agregar `/refrendacion`.
3. Agregar `/examenes-medicos`.
4. Agregar ambas rutas al prerender.
5. Crear shells iniciales de las dos páginas.

### Fase 2 — Navegación

1. Convertir Cursos en parte de `Servicios`.
2. Implementar dropdown desktop accesible.
3. Implementar grupo/desplegable móvil accesible.
4. Mantener Nosotros en footer.

### Fase 3 — Home

1. Crear `ServicesSection`.
2. Insertarla después de trust badges.
3. Ajustar microcopy del Hero.
4. Revisar CTA final para que no hable exclusivamente de cursos si es global.

### Fase 4 — Página Refrendación

1. Hero + breadcrumb.
2. Contenido informativo.
3. Proceso general.
4. Requisitos/preparación sin datos inventados.
5. FAQ.
6. CTA específico.
7. SEO y canonical.

### Fase 5 — Página Exámenes Médicos

1. Hero + breadcrumb.
2. Propósito del servicio.
3. Aspectos evaluados con información verificada.
4. Trámites relacionados.
5. FAQ.
6. CTA específico.
7. SEO y canonical.

### Fase 6 — Globales

1. Actualizar `CONFIG.company.slogan` si se adopta nueva frase general.
2. Actualizar WhatsApp general.
3. Actualizar SEO global.
4. Actualizar `index.html`.
5. Actualizar footer.

### Fase 7 — Analítica

1. Definir helper/evento de conversión si todavía no existe.
2. Etiquetar CTAs por `service` y `placement`.
3. Validar en GTM Preview/Debug durante despliegue.

### Fase 8 — QA

1. Tests.
2. Build.
3. Responsive.
4. Accesibilidad.
5. SEO.
6. Prerender.
7. WhatsApp.
8. Revisión final de contenido y guardrails.

---

## 20. Criterios de aceptación

La feature se considera terminada cuando:

- [ ] La web muestra claramente Cursos, Refrendación y Exámenes médicos.
- [ ] Existe `/refrendacion`.
- [ ] Existe `/examenes-medicos`.
- [ ] Ambas páginas funcionan con carga directa y prerender.
- [ ] El header no queda saturado con nueve enlaces de primer nivel.
- [ ] Servicios funciona correctamente en desktop y móvil.
- [ ] El Home muestra una sección clara con los tres servicios.
- [ ] Los tres servicios tienen CTA de WhatsApp contextual.
- [ ] La calculadora conserva su posición como herramienta independiente.
- [ ] SEO contiene títulos, descriptions y canonical específicos.
- [ ] El contenido global ya no describe a la empresa únicamente por cursos cuando el contexto es general.
- [ ] No se afirma que CIA Vial del Llano sea un CRC.
- [ ] No se afirma que expida directamente certificados médicos.
- [ ] No existen precios, tiempos, alianzas o condiciones inventadas.
- [ ] El número de teléfono es consistente en CONFIG, SEO, footer, contacto y WhatsApp.
- [ ] `pnpm test` pasa con pruebas relevantes.
- [ ] `pnpm build` pasa.
- [ ] No hay errores AXE críticos/serios en las vistas nuevas.
- [ ] Los nuevos CTAs pueden diferenciarse por intención en analítica.

---

## 21. Qué NO hacer

- No agregar `Refrendación` y `Exámenes médicos` como dos links adicionales al header actual sin reorganizar la navegación.
- No duplicar la misma información de servicios en múltiples archivos si puede centralizarse.
- No crear otro servicio de WhatsApp innecesario.
- No quitar la calculadora del menú; es una herramienta diferenciadora.
- No eliminar `/nosotros`; solo reducir su prioridad en el header.
- No convertir todo el Home en una landing genérica que haga perder el posicionamiento actual de comparendos.
- No usar “CRC” como keyword/promesa comercial de forma que sugiera que CIA Vial es uno.
- No hardcodear un número de WhatsApp diferente al `CONFIG`.
- No incorporar costos, duración o requisitos comerciales no entregados por el cliente.
- No sobrearquitecturar con backend, CMS o nueva dependencia de estado para contenido estático.

---

## 22. Decisiones abiertas no bloqueantes

Estas decisiones pueden resolverse durante la implementación sin volver al cliente salvo que se quiera mayor precisión comercial:

1. Copy final exacto del Hero.
2. Icono de cada servicio.
3. Imagen/ilustración específica de cada página.
4. Si el submenú desktop abre por click, hover + keyboard, o click únicamente. Se recomienda click para comportamiento predecible y accesible.
5. Si se crea un componente compartido de Hero para páginas de servicio después de comparar ambas implementaciones.
6. Si GTM recibe un único evento parametrizado o tres eventos separados.

Datos como precio, duración, necesidad de cita o sede exacta del examen **no bloquean** la publicación inicial: pueden resolverse mediante WhatsApp hasta que el cliente decida publicarlos.

---

## 23. Resultado esperado

Antes:

```text
CIA Vial del Llano
→ Cursos para descuento en comparendos
→ Calculadora
→ WhatsApp
```

Después:

```text
CIA Vial del Llano
→ Servicios para conductores
   → Cursos pedagógicos
   → Refrendación
   → Exámenes médicos
→ Calculadora de multas
→ Ubicación / FAQ
→ WhatsApp contextual por intención
```

La ampliación debe sentirse como una evolución natural del producto actual, no como dos páginas añadidas al final. El sitio mantiene su fortaleza en comparendos, pero presenta una oferta comercial más amplia y permite medir qué servicio genera cada conversación.
