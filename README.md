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

4. **Personalidad del asistente**
   - Estilos: motivador, zen y estratega.
   - Frases dinámicas por evento y racha.

5. **Optimización UI móvil**
   - Diseño mobile-first, tarjetas compactas y controles táctiles.
   - Ajuste de layout para pantallas más anchas via media query.

## Persistencia en localStorage

Se guarda automáticamente en `localStorage`:
- tareas
- puntos
- racha
- última fecha de finalización
- personalidad seleccionada

## Ejecutar

Abre `index.html` en un navegador moderno.
