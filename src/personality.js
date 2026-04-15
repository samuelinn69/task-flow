const messages = {
  motivador: {
    idle: [
      'Cada tarea terminada suma impulso. ¡Vamos por una más!',
      'Tienes lo necesario para avanzar hoy.',
      'Pequeños pasos, grandes resultados.',
    ],
    completed: [
      '¡Excelente! Has ganado ritmo y puntos.',
      '¡Bien hecho! Vas construyendo constancia.',
      'Otra victoria desbloqueada. Sigue así.',
    ],
  },
  zen: {
    idle: [
      'Respira. Una tarea a la vez.',
      'La claridad llega cuando empiezas por lo simple.',
      'Hoy también cuenta, aunque avances despacio.',
    ],
    completed: [
      'Buen trabajo. Mantén este flujo tranquilo.',
      'Cumpliste una más. Continúa con calma.',
      'Ese progreso sereno también es poder.',
    ],
  },
  estratega: {
    idle: [
      'Prioriza impacto alto y ejecuta en bloques cortos.',
      'Optimiza: termina primero la tarea más crítica.',
      'Avance sostenido > perfección tardía.',
    ],
    completed: [
      'Objetivo cumplido. Recalcula y sigue.',
      'Buen movimiento. La métrica de progreso sube.',
      'Ejecución eficiente: tarea cerrada.',
    ],
  },
};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getAssistantMessage(personality, eventType, streak = 0) {
  const current = messages[personality] ?? messages.motivador;
  const baseSet = current[eventType] ?? current.idle;
  const base = randomItem(baseSet);

  if (eventType === 'completed' && streak >= 3) {
    return `${base} Racha activa de ${streak} días 🔥`;
  }

  return base;
}
