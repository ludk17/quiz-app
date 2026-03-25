import type { Alternativa, Pregunta } from '../types/quiz';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Picks up to `max` random questions and shuffles their alternatives
 */
export function prepareQuestions(questions: Pregunta[], max = 20): Pregunta[] {
  return shuffle(questions)
    .slice(0, max)
    .map((q) => ({
      ...q,
      alternativas: shuffle(q.alternativas) as Alternativa[],
    }));
}
