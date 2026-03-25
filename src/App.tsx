import { useQuiz } from './hooks/useQuiz';
import './App.css';

/** Renders a string that may contain HTML tags safely */
const Html = ({ html }: { html: string }) => (
  <span dangerouslySetInnerHTML={{ __html: html }} />
);

export default function App() {
  const {
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
  } = useQuiz();

  /* ─── Loading / Error ─── */
  if (loading) {
    return (
      <div className="screen center">
        <div className="spinner" />
        <p className="hint">Cargando preguntas…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen center">
        <div className="error-icon">⚠️</div>
        <p className="error-msg">{error}</p>
      </div>
    );
  }

  /* ─── Idle (start screen) ─── */
  if (status === 'idle') {
    return (
      <div className="screen center">
        <div className="logo">🧠</div>
        <h1 className="title">Trivia Quiz</h1>
        <p className="subtitle">
          Responde hasta <strong>{Math.min(questions.length || 20, 20)}</strong>{' '}
          preguntas al azar y pon a prueba tu conocimiento.
        </p>
        <button className="btn btn-primary btn-lg" onClick={start}>
          Iniciar
        </button>
      </div>
    );
  }

  /* ─── Finished ─── */
  if (status === 'finished') {
    const pct = Math.round((score / questions.length) * 100);
    let medal = '🥉';
    if (pct >= 90) medal = '🏆';
    else if (pct >= 70) medal = '🥇';
    else if (pct >= 50) medal = '🥈';

    return (
      <div className="screen center">
        <div className="logo">{medal}</div>
        <h2 className="title">¡Fin del Quiz!</h2>
        <p className="subtitle">
          Acertaste <strong>{score}</strong> de <strong>{questions.length}</strong>{' '}
          preguntas
        </p>
        <div className="score-bar-wrap">
          <div className="score-bar" style={{ width: `${pct}%` }} />
        </div>
        <p className="pct-label">{pct}% correcto</p>
        <button className="btn btn-primary btn-lg" onClick={restart}>
          Volver a jugar
        </button>
      </div>
    );
  }

  /* ─── Playing / Answer ─── */
  const q = questions[currentIndex];
  const total = questions.length;

  return (
    <div className="screen">
      {/* Header */}
      <header className="quiz-header">
        <span className="counter">
          {currentIndex + 1} / {total}
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
        <span className="score-chip">⭐ {score}</span>
      </header>

      {/* Question card */}
      <main className="quiz-main">
        <div className="question-card">
          <p className="question-text">
            <Html html={q.pregunta} />
          </p>
        </div>

        {/* Alternatives */}
        <ul className="options-list">
          {q.alternativas.map((alt) => {
            let cls = 'option-btn';
            if (status === 'answer') {
              if (alt.opcion === q.respuesta_correcta) cls += ' correct';
              else if (alt.opcion === selectedOption) cls += ' wrong';
            }
            return (
              <li key={alt.opcion}>
                <button
                  className={cls}
                  disabled={status === 'answer'}
                  onClick={() => answer(alt.opcion)}
                >
                  <span className="opt-letter">
                    {String.fromCharCode(64 + parseInt(alt.opcion))}
                  </span>
                  <span className="opt-text">
                    <Html html={alt.value} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Feedback + Next */}
        {status === 'answer' && (
          <div
            className={`feedback ${
              selectedOption === q.respuesta_correcta ? 'feedback-ok' : 'feedback-err'
            }`}
          >
            <p className="feedback-text">
              {selectedOption === q.respuesta_correcta ? (
                <>✅ ¡Correcto!</>
              ) : (
                <>
                  ❌ Incorrecto — La respuesta era:{' '}
                  <strong>
                    <Html
                      html={
                        q.alternativas.find(
                          (a) => a.opcion === q.respuesta_correcta
                        )?.value ?? ''
                      }
                    />
                  </strong>
                </>
              )}
            </p>
            <button className="btn btn-primary" onClick={next}>
              {currentIndex + 1 >= total ? 'Ver resultados' : 'Siguiente →'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
