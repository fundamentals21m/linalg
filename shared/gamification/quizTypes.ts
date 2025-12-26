import type { Difficulty } from './types';
import type { ParsedSegment } from './latexParser';
import { renderLaTeX } from './latexParser';

/**
 * Standardized quiz question type definition
 * Used across all section quizzes in all courses
 * Supports: multiple-choice (4 options), numeric input, text input
 */
export type QuestionType = 'multiple-choice' | 'numeric' | 'text';

export interface NumericRange {
  min?: number;
  max?: number;
  precision?: number;
}

export interface QuizQuestion {
  id: string | number;
  type?: QuestionType;  // defaults to 'multiple-choice'
  question: string;  // Can contain LaTeX
  options?: string[];  // Only for multiple-choice (4 options A, B, C, D)
  correctIndex?: number;  // Only for multiple-choice (0-3)
  correctAnswer?: number | string;  // For numeric/text questions
  numericRange?: NumericRange;  // For numeric questions
  difficulty: Difficulty;
  explanation?: string;  // Can contain LaTeX
}

/**
 * Render quiz content (question, options, explanations) with LaTeX support
 */
export function renderContent(content: string | ParsedSegment[]): string {
  if (typeof content === 'string') {
    return renderLaTeX(content);
  }

  // Already parsed segments
  return content.map(seg => {
    if (seg.type === 'text') {
      return seg.content;
    }
    // Return LaTeX already rendered by parseLaTeX
    return seg.content;
  }).join('');
}

/**
 * Type for section quiz exports
 */
export type SectionQuestions = QuizQuestion[];
