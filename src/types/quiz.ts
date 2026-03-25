export interface Alternativa {
  opcion: string;
  value: string;
}

export interface Pregunta {
  id: number;
  pregunta: string;
  alternativas: Alternativa[];
  respuesta_correcta: string;
}

export interface TriviaData {
  trivia: Pregunta[];
}

export type QuizStatus = 'idle' | 'playing' | 'answer' | 'finished';

export interface QuizState {
  questions: Pregunta[];
  currentIndex: number;
  score: number;
  selectedOption: string | null;
  status: QuizStatus;
}
