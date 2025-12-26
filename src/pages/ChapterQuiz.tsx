import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { curriculum } from '@/data/curriculum';
import { getChapterQuiz } from '@/data/quizzes';
import { FEATURES } from '@/config';
import { useGamification } from '@/contexts/GamificationContext';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import type { QuizQuestion } from '@magic-internet-math/shared';

export default function ChapterQuiz() {
  const { id } = useParams<{ id: string }>();
  const chapterId = parseInt(id || '1', 10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chapter = curriculum.find((p) => p.id === chapterId);
  const questions = getChapterQuiz(chapterId);

  if (!chapter || !questions) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark-100 mb-4">Quiz Not Found</h1>
          <p className="text-dark-400 mb-6">This chapter quiz is not yet available.</p>
          <Link to="/" className="text-primary-400 hover:text-primary-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-20 pb-24 px-4 lg:pl-80 lg:pr-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-dark-400">
            <Link to="/" className="hover:text-dark-200 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-dark-500">{chapter.title}</span>
            <span>/</span>
            <span className="text-dark-200">Chapter Quiz</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-primary-400">
                Chapter {chapterId}
              </span>
              <span className="text-dark-600">•</span>
              <span className="text-sm text-dark-500">Comprehensive Quiz</span>
            </div>
            <h1 className="text-3xl font-bold text-dark-100 mb-3">
              {chapter.title} Quiz
            </h1>
            <p className="text-dark-400 text-lg">
              Test your understanding of all concepts from Chapter {chapterId}.
            </p>
          </header>

          {/* Quiz Component */}
          <ChapterQuizComponent
            chapterId={chapterId}
            chapterTitle={chapter.title}
            questions={questions}
          />

          {/* Navigation back to chapter */}
          <div className="mt-8 pt-8 border-t border-dark-800">
            <Link
              to={`/section/${chapter.sections[0].id}`}
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Chapter {chapterId}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ChapterQuizComponentProps {
  chapterId: number;
  chapterTitle: string;
  questions: QuizQuestion[];
}

function ChapterQuizComponent({ chapterId, chapterTitle, questions }: ChapterQuizComponentProps) {
  // Always call hook unconditionally, then conditionally use the result
  const gamificationContext = useGamification();
  const gamification = FEATURES.gamification ? gamificationContext : null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Shuffle questions on start
  const shuffledQuestions = useMemo(() => {
    return [...questions].sort(() => Math.random() - 0.5);
  }, [questions]);

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [...prev, isCorrect]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete
      setIsComplete(true);

      if (gamification) {
        const finalScore = Math.round(
          ((score + (selectedAnswer === currentQuestion.correctIndex ? 1 : 0)) / totalQuestions) * 100
        );
        // Record the quiz for the first section of this chapter
        const firstSectionId = chapterId; // We'll use chapter ID for tracking
        gamification.recordQuiz(
          firstSectionId,
          'hard', // Chapter quizzes are comprehensive
          finalScore,
          score + (selectedAnswer === currentQuestion.correctIndex ? 1 : 0),
          totalQuestions
        );
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
  };

  // Start screen
  if (!hasStarted) {
    return (
      <div className="p-8 rounded-2xl bg-dark-800/50 border border-dark-700/50 text-center">
        <div className="text-6xl mb-6">📚</div>
        <h2 className="text-2xl font-bold text-dark-100 mb-4">
          Chapter {chapterId}: {chapterTitle}
        </h2>
        <p className="text-dark-400 mb-6 max-w-md mx-auto">
          This comprehensive quiz covers all sections from this chapter.
          You'll answer {totalQuestions} questions testing your understanding of the key concepts.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="px-4 py-2 rounded-lg bg-dark-700/50">
            <span className="text-dark-400 text-sm">Questions</span>
            <div className="text-dark-100 font-bold">{totalQuestions}</div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-dark-700/50">
            <span className="text-dark-400 text-sm">Difficulty</span>
            <div className="text-dark-100 font-bold">Mixed</div>
          </div>
        </div>
        <button
          onClick={handleStart}
          className="px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors text-lg"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // Completion screen
  if (isComplete) {
    const finalScore = answers.filter(Boolean).length;
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    return (
      <div className="p-8 rounded-2xl bg-dark-800/50 border border-dark-700/50">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {percentage >= 90 ? '🏆' : percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
          </div>
          <h3 className="text-2xl font-bold text-dark-100 mb-2">Chapter Quiz Complete!</h3>
          <p className="text-dark-400 mb-6">
            You scored {finalScore} out of {totalQuestions} ({percentage}%)
          </p>

          {/* Score breakdown */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {answers.map((correct, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full ${
                  correct ? 'bg-emerald-500' : 'bg-red-500'
                }`}
                title={`Question ${i + 1}: ${correct ? 'Correct' : 'Incorrect'}`}
              />
            ))}
          </div>

          {/* Feedback */}
          <div className="p-4 rounded-xl bg-dark-700/50 mb-8 max-w-md mx-auto">
            <p className="text-dark-300">
              {percentage >= 90
                ? "Excellent! You've mastered this chapter's concepts."
                : percentage >= 70
                ? "Great job! You have a solid understanding of the material."
                : percentage >= 50
                ? "Good effort! Review the sections you struggled with."
                : "Keep studying! Review the chapter sections and try again."}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleRetry}
              className="px-6 py-3 rounded-xl bg-dark-700 hover:bg-dark-600 text-dark-200 font-medium transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm text-dark-400">Chapter {chapterId} Quiz</span>
          <h3 className="text-xl font-semibold text-dark-100">
            Question {currentIndex + 1} of {totalQuestions}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-sm text-dark-400">Score</span>
          <div className="text-xl font-bold text-dark-100">{score}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-dark-700 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Difficulty badge */}
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            currentQuestion.difficulty === 'easy'
              ? 'bg-emerald-500/20 text-emerald-400'
              : currentQuestion.difficulty === 'medium'
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
        </span>
      </div>

      {/* Question */}
      <p className="text-xl text-dark-100 mb-8 leading-relaxed">{currentQuestion.question}</p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options?.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === currentQuestion.correctIndex;
          const showCorrect = showResult && isCorrect;
          const showIncorrect = showResult && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                showCorrect
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : showIncorrect
                  ? 'bg-red-500/20 border-red-500/50 text-red-300'
                  : isSelected
                  ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                  : 'bg-dark-700/50 border-dark-600/50 text-dark-200 hover:bg-dark-700 hover:border-dark-500'
              } border`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    showCorrect
                      ? 'bg-emerald-500/30'
                      : showIncorrect
                      ? 'bg-red-500/30'
                      : 'bg-dark-600'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrect && (
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {showResult && isSelected && !isCorrect && (
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && currentQuestion.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-dark-700/50 border border-dark-600/50 mb-6"
        >
          <p className="text-dark-300">
            <span className="font-medium text-dark-200">Explanation: </span>
            {currentQuestion.explanation}
          </p>
        </motion.div>
      )}

      {/* Next button */}
      {showResult && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors text-lg"
        >
          {currentIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
        </motion.button>
      )}
    </div>
  );
}
