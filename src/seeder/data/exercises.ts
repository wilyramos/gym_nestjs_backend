import { Exercise } from '../../exercises/entities/exercise.entity';

export const exercisesSeed: Partial<Exercise>[] = [
  // PECHO
  {
    name: 'Press de banca',
    description: 'Ejercicio compuesto para trabajar el pecho, tríceps y hombros.',
    muscleGroup: 'Pecho',
  },
  {
    name: 'Press inclinado con barra',
    description: 'Enfocado en la parte superior del pectoral.',
    muscleGroup: 'Pecho',
  },
  {
    name: 'Press declinado',
    description: 'Trabaja la parte inferior del pectoral.',
    muscleGroup: 'Pecho',
  },
  {
    name: 'Aperturas con mancuernas',
    description: 'Ejercicio de aislamiento para el pectoral mayor.',
    muscleGroup: 'Pecho',
  },
  {
    name: 'Fondos en paralelas para pecho',
    description: 'Variación que enfatiza el pectoral.',
    muscleGroup: 'Pecho',
  },

  // ESPALDA
  {
    name: 'Dominadas',
    description: 'Ejercicio para espalda y bíceps, usando el peso corporal.',
    muscleGroup: 'Espalda',
  },
  {
    name: 'Remo con barra',
    description: 'Ejercicio compuesto para la parte media de la espalda.',
    muscleGroup: 'Espalda',
  },
  {
    name: 'Jalón al pecho en polea',
    description: 'Alternativa a dominadas, ideal para principiantes.',
    muscleGroup: 'Espalda',
  },
  {
    name: 'Remo con mancuerna a una mano',
    description: 'Ejercicio unilateral para mejorar equilibrio muscular.',
    muscleGroup: 'Espalda',
  },
  {
    name: 'Peso muerto',
    description: 'Ejercicio para toda la cadena posterior, incluyendo espalda baja.',
    muscleGroup: 'Espalda baja',
  },

  // PIERNAS
  {
    name: 'Sentadillas',
    description: 'Ejercicio fundamental para piernas y glúteos.',
    muscleGroup: 'Piernas',
  },
  {
    name: 'Prensa de piernas',
    description: 'Ejercicio en máquina para cuádriceps y glúteos.',
    muscleGroup: 'Piernas',
  },
  {
    name: 'Zancadas',
    description: 'Ejercicio unilateral para cuádriceps y glúteos.',
    muscleGroup: 'Piernas',
  },
  {
    name: 'Curl femoral tumbado',
    description: 'Ejercicio en máquina para isquiotibiales.',
    muscleGroup: 'Piernas',
  },
  {
    name: 'Extensiones de piernas',
    description: 'Ejercicio de aislamiento para cuádriceps.',
    muscleGroup: 'Piernas',
  },
  {
    name: 'Elevación de talones de pie',
    description: 'Trabaja los músculos de la pantorrilla.',
    muscleGroup: 'Pantorrillas',
  },

  // BÍCEPS
  {
    name: 'Curl de bíceps con mancuernas',
    description: 'Ejercicio básico de aislamiento para bíceps.',
    muscleGroup: 'Bíceps',
  },
  {
    name: 'Curl con barra',
    description: 'Permite levantar más peso y trabajar ambos brazos a la vez.',
    muscleGroup: 'Bíceps',
  },
  {
    name: 'Curl martillo',
    description: 'Trabaja el braquial y contribuye al grosor del brazo.',
    muscleGroup: 'Bíceps',
  },
  {
    name: 'Curl en banco inclinado',
    description: 'Estira más el bíceps durante el movimiento.',
    muscleGroup: 'Bíceps',
  },

  // TRÍCEPS
  {
    name: 'Fondos en paralelas',
    description: 'Ejercicio compuesto para tríceps y pecho.',
    muscleGroup: 'Tríceps',
  },
  {
    name: 'Extensiones de tríceps en polea',
    description: 'Aislamiento efectivo con cuerda o barra.',
    muscleGroup: 'Tríceps',
  },
  {
    name: 'Press francés',
    description: 'Extensión con barra para trabajar la cabeza larga del tríceps.',
    muscleGroup: 'Tríceps',
  },
  {
    name: 'Patada de tríceps con mancuernas',
    description: 'Ejercicio de aislamiento enfocado.',
    muscleGroup: 'Tríceps',
  },

  // HOMBROS
  {
    name: 'Elevaciones laterales',
    description: 'Ejercicio para deltoides laterales.',
    muscleGroup: 'Hombros',
  },
  {
    name: 'Press militar con barra',
    description: 'Ejercicio compuesto para hombros y tríceps.',
    muscleGroup: 'Hombros',
  },
  {
    name: 'Elevaciones frontales',
    description: 'Trabajan la parte anterior del deltoide.',
    muscleGroup: 'Hombros',
  },
  {
    name: 'Pájaros (elevaciones posteriores)',
    description: 'Ejercicio para deltoides posteriores.',
    muscleGroup: 'Hombros',
  },

  // ABDOMEN
  {
    name: 'Plancha abdominal',
    description: 'Ejercicio isométrico para core y estabilidad.',
    muscleGroup: 'Abdomen',
  },
  {
    name: 'Crunch abdominal',
    description: 'Ejercicio básico para los músculos abdominales.',
    muscleGroup: 'Abdomen',
  },
  {
    name: 'Elevación de piernas',
    description: 'Ejercicio enfocado en el abdomen inferior.',
    muscleGroup: 'Abdomen',
  },
  {
    name: 'Ab wheel rollout',
    description: 'Ejercicio avanzado para abdomen y estabilidad.',
    muscleGroup: 'Abdomen',
  },
];
