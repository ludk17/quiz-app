import { useState, useEffect } from 'react';
import type { Pregunta, QuizStatus } from '../types/quiz';
import { prepareQuestions } from '../utils/quizUtils';

const JSON_PATH = '/semana01/preguntas_1.json';
const MAX_QUESTIONS = 20;

export function useQuiz() {
  const [allQuestions, setAllQuestions] = useState<Pregunta[]>([]);
  const [questions, setQuestions] = useState<Pregunta[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(JSON_PATH)
      .then((r) => r.json())
      .then((data) => {
        setAllQuestions(data.trivia ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar el archivo de preguntas.');
        setLoading(false);
      });
  }, []);

  const start = () => {
    const prepared = prepareQuestions(allQuestions, MAX_QUESTIONS);
    setQuestions(prepared);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setStatus('playing');
  };

  const answer = (opcion: string) => {
    if (status !== 'playing') return;
    setSelectedOption(opcion);
    const correct = questions[currentIndex].respuesta_correcta;
    if (opcion === correct) setScore((s) => s + 1);
    setStatus('answer');
  };

  const next = () => {
    if (currentIndex + 1 >= questions.length) {
      setStatus('finished');
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setStatus('playing');
    }
  };

  const restart = () => {
    setStatus('idle');
    setSelectedOption(null);
    setCurrentIndex(0);
    setScore(0);
  };

  return {
    loading,
    error,
    status,
    questions,
    currentIndex,
    score,
    selectedOption,
    start,
    answer,
    next,
    restart,
  };
}
