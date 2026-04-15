const messages = {
  motivador: {
    idle: [
      'Vas muy bien, una tarea más y sigues creciendo.',
      'Tu progreso de hoy cuenta. Sigue adelante.',
      'Constancia + acción = resultados reales.',
    ],
    completed: [
      '¡Excelente! Sumaste puntos con esa tarea.',
      '¡Buen trabajo! Vas construyendo una gran racha.',
      'Otra tarea cerrada. ¡Mantén el impulso!',
    ],
    completed_all: [
      '¡Día completado al 100%! Te llevas bonus.',
      '¡Perfecto! Terminaste todo lo de hoy con bonus.',
    ],
  },
  sarcastico: {
    idle: [
      'Qué raro: organizarte sí funciona.',
      'Impresionante, una lista de tareas que realmente se usa.',
      'Quizá hoy sí derrotes a la procrastinación. Quizá.',
    ],
    completed: [
      'Wow, completaste una tarea. El universo sigue intacto.',
      'Milagro: una tarea menos en la lista.',
      'No estuvo mal... para ser lunes eterno.',
    ],
    completed_all: [
      'Completaste todo hoy. Sospechosamente eficiente.',
      'Día limpio y bonus. ¿Quién eres y qué hiciste contigo?',
    ],
  },
  agresivo: {
    idle: [
      'Sin excusas: ejecuta la siguiente tarea ya.',
      'Disciplina primero, motivación después.',
      'Menos pensar, más cerrar pendientes.',
    ],
    completed: [
      'Bien. Otra tarea aplastada.',
      'Eso. Ritmo alto, foco total.',
      'Cumplida. Sigue hasta vaciar la lista.',
    ],
    completed_all: [
      'Objetivo diario destruido. Bonus asegurado.',
      'Lista del día aniquilada. Rendimiento máximo.',
    ],
  },
};

const defaultPersonality = 'motivador';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getValidPersonalities() {
  return Object.keys(messages);
}

export function normalizePersonality(personality) {
  return messages[personality] ? personality : defaultPersonality;
}

export function getAssistantMessage(personality, eventType, streak = 0) {
  const normalizedPersonality = normalizePersonality(personality);
  const current = messages[normalizedPersonality];
  const baseSet = current[eventType] ?? current.idle;
  const base = randomItem(baseSet);

  if ((eventType === 'completed' || eventType === 'completed_all') && streak >= 3) {
    return `${base} Racha activa de ${streak} días 🔥`;
  }

  return base;
}
