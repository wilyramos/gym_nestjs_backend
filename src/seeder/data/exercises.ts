import { Exercise } from '../../exercises/entities/exercise.entity';

export const exercisesSeed: Partial<Exercise>[] = [
  {
    name: 'Press de banca',
    description: 'Ejercicio compuesto para trabajar el pecho, tríceps y hombros.',
    muscleGroup: 'Pecho',
  },
  {
    name: 'Dominadas',
    description: 'Ejercicio para la espalda y bíceps. Se realiza colgándose de una barra.',
    muscleGroup: 'Espalda',
  },
  {
    name: 'Sentadillas',
    description: 'Ejercicio fundamental para piernas y glúteos.',
    muscleGroup: 'Piernas',
  },
  {
    name: 'Curl de bíceps con mancuernas',
    description: 'Ejercicio de aislamiento para bíceps.',
    muscleGroup: 'Bíceps',
  },
  {
    name: 'Fondos en paralelas',
    description: 'Ejercicio corporal que trabaja el pecho y tríceps.',
    muscleGroup: 'Tríceps',
  },
  {
    name: 'Peso muerto',
    description: 'Ejercicio compuesto para toda la cadena posterior.',
    muscleGroup: 'Espalda baja',
  },
  {
    name: 'Prensa de piernas',
    description: 'Ejercicio de máquina para trabajar cuádriceps y glúteos.',
    muscleGroup: 'Piernas',
  },
  {
    name: 'Elevaciones laterales',
    description: 'Ejercicio para deltoides laterales.',
    muscleGroup: 'Hombros',
  },
  {
    name: 'Plancha abdominal',
    description: 'Ejercicio isométrico para core y estabilidad.',
    muscleGroup: 'Abdomen',
  },
  {
    name: 'Zancadas',
    description: 'Ejercicio unilateral para piernas y equilibrio.',
    muscleGroup: 'Piernas',
  },
];
