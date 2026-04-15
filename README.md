# TaskFlow

Aplicación web mobile-first para gestión de tareas con gamificación y personalidad de asistente.

## Fases implementadas

1. **Estructura del proyecto**
   - `index.html` como entrada principal.
   - `styles/main.css` para layout/responsive.
   - Módulos separados en `src/`.

2. **Sistema de tareas (CRUD)**
   - Añadir tareas.
   - Marcar tareas como completadas.
   - Eliminar tareas.

3. **Gamificación**
   - +10 puntos por completar una tarea.
   - Racha diaria basada en fecha de última finalización.
   - Bonus diario al completar todas las tareas creadas en el día.

4. **Personalidad del asistente**
   - Modos: motivador, sarcástico y agresivo.
   - Respuestas aleatorias al completar tareas.

5. **Optimización UI móvil**
   - Botones grandes y táctiles (área mínima cómoda para pulgar).
   - Navegación simple con accesos rápidos y barra inferior fija.
   - Diseño limpio tipo app nativa con tarjetas y jerarquía visual clara.

## Persistencia en localStorage

Se guarda automáticamente en `localStorage`:
- tareas
- puntos
- racha
- última fecha de finalización
- fecha del último bonus diario por completar todas
- personalidad seleccionada

## Ejecutar

Abre `index.html` en un navegador moderno.
