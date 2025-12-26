import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '@/config';
import { useGamification } from '@/contexts/GamificationContext';

import { renderContent } from '@magic-internet-math/shared';
import type { QuizQuestion, QuestionType } from '@magic-internet-math/shared';

// Re-export types for convenience
export type { QuizQuestion, QuestionType } from '@magic-internet-math/shared';

interface SectionQuizProps {
  sectionId: number;
  questions: QuizQuestion[];
  title?: string;
}

export function SectionQuiz({ sectionId, questions, title = 'Section Quiz' }: SectionQuizProps) {
  // Always call hook unconditionally, then conditionally use the result
  const gamificationContext = useGamification();
  const gamification = FEATURES.gamification ? gamificationContext : null;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [numericError, setNumericError] = useState('');

  // Randomize questions on mount, take 5
  const shuffledQuestions = useMemo(() => {
    return [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [questions]);

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;
  const questionType: QuestionType = currentQuestion?.type ?? 'multiple-choice';

  const handleMultipleChoiceAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [...prev, isCorrect]);
    setShowResult(true);
  };

  const handleNumericAnswer = () => {
    if (numericAnswer === null) {
      setNumericError('Please enter a number');
      return;
    }

    const { min, max } = currentQuestion.numericRange ?? {};
    
    // Check range validation
    if (min !== undefined && numericAnswer < min) {
      setNumericError(`Answer must be at least ${min}`);
      return;
    }
    
    if (max !== undefined && numericAnswer > max) {
      setNumericError(`Answer must be at most ${max}`);
      return;
    }

    setNumericError('');
    const isCorrect = numericAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [...prev, isCorrect]);
    setShowResult(true);
  };

  const handleTextAnswer = () => {
    const trimmedAnswer = textAnswer.trim();
    
    if (trimmedAnswer === '') {
      return;
    }

    const isCorrect = trimmedAnswer.toLowerCase() === String(currentQuestion.correctAnswer ?? '').toLowerCase();
    
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
      setNumericAnswer(null);
      setTextAnswer('');
      setShowResult(false);
      setNumericError('');
    } else {
      // Quiz complete
      setIsComplete(true);

      if (gamification) {
        const finalScore = score + (showResult ? (
          questionType === 'multiple-choice' && selectedAnswer === currentQuestion.correctIndex ? 1 :
          questionType === 'numeric' && numericAnswer === currentQuestion.correctAnswer ? 1 :
          questionType === 'text' && textAnswer.toLowerCase() === String(currentQuestion.correctAnswer ?? '').toLowerCase() ? 1 : 0
        ) : 0);
        const finalPercentage = Math.round((finalScore / totalQuestions) * 100);
        
        gamification.recordQuiz(
          sectionId,
          currentQuestion.difficulty,
          finalPercentage,
          finalScore,
          totalQuestions
        );
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setNumericAnswer(null);
    setTextAnswer('');
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
    setNumericError('');
  };

  if (isComplete) {
    const finalScore = answers.filter(Boolean).length;
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    return (
      <div className="mt-12 p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h3 className="text-2xl font-bold text-dark-100 mb-2">Quiz Complete!</h3>
          <p className="text-dark-400 mb-6">
            You scored {finalScore} out of {totalQuestions} ({percentage}%)
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            {answers.map((correct, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  correct ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleRetry}
            className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-dark-100">{title}</h3>
        <span className="text-sm text-dark-400">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1 bg-dark-700 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-primary-500"
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
      <p className="text-lg text-dark-200 mb-6">
        <span dangerouslySetInnerHTML={{ __html: renderContent(currentQuestion.question) }} />
      </p>

      {/* Multiple-choice options */}
      {questionType === 'multiple-choice' && currentQuestion.options && (
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleMultipleChoiceAnswer(index)}
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
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-dark-600 flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: renderContent(option) }} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Numeric input */}
      {questionType === 'numeric' && (
        <div className="space-y-4 mb-6">
          <input
            type="number"
            step={currentQuestion.numericRange?.precision ? 1 / Math.pow(10, currentQuestion.numericRange.precision) : 1}
            min={currentQuestion.numericRange?.min}
            max={currentQuestion.numericRange?.max}
            value={numericAnswer ?? ''}
            onChange={(e) => setNumericAnswer(parseFloat(e.target.value) || null)}
            disabled={showResult}
            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="Enter your answer..."
          />
          {numericError && (
            <p className="text-red-400 text-sm">{numericError}</p>
          )}
          <button
            onClick={handleNumericAnswer}
            disabled={showResult || numericAnswer === null}
            className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors disabled:bg-dark-600 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        </div>
      )}

      {/* Text input */}
      {questionType === 'text' && (
        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showResult}
            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="Type your answer..."
          />
          <button
            onClick={handleTextAnswer}
            disabled={showResult || !textAnswer.trim()}
            className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors disabled:bg-dark-600 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        </div>
      )}

      {/* Explanation */}
      {showResult && currentQuestion.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-dark-700/50 border border-dark-600/50 mb-6"
        >
          <p className="text-sm text-dark-300">
            <span className="font-medium text-dark-200">Explanation: </span>
            <span dangerouslySetInnerHTML={{ __html: renderContent(currentQuestion.explanation) }} />
          </p>
        </motion.div>
      )}

      {/* Next button */}
      {showResult && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          {currentIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
        </motion.button>
      )}
    </div>
  );
}
