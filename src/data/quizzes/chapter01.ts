// Chapter 1: Introduction to Vectors (Sections 1-3)
// Curriculum: 1.1 Vectors and Linear Combinations, 1.2 Lengths and Dot Products, 1.3 Matrices
import type { QuizQuestion } from './types';

// Section 1: Vectors and Linear Combinations
export const section01Quiz: QuizQuestion[] = [
  {
    id: 's01-q1',
    question: 'What is the result of adding vectors v = (2, 3) and w = (1, -1)?',
    options: ['(3, 2)', '(1, 4)', '(3, 4)', '(2, 2)'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'Vector addition is done component-wise: (2+1, 3+(-1)) = (3, 2).'
  },
  {
    id: 's01-q2',
    question: 'If v = (1, 2), what is 3v?',
    options: ['(3, 2)', '(1, 6)', '(3, 6)', '(4, 5)'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Scalar multiplication multiplies each component: 3·(1, 2) = (3, 6).'
  },
  {
    id: 's01-q3',
    question: 'Which expression represents a linear combination of vectors u and v?',
    options: ['u · v', 'u × v', 'cu + dv', 'u/v'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'A linear combination is of the form cu + dv where c and d are scalars.'
  },
  {
    id: 's01-q4',
    question: 'The linear combinations of v = (1, 0) and w = (0, 1) fill what set?',
    options: ['A line through the origin', 'The entire plane ℝ²', 'A single point', 'A circle'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'These are the standard basis vectors; their combinations cv + dw = (c, d) cover all of ℝ².'
  },
  {
    id: 's01-q5',
    question: 'If v = (2, 4), which vector is parallel to v?',
    options: ['(4, 2)', '(1, 2)', '(-1, -2)', '(2, -4)'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'Parallel vectors are scalar multiples. (-1, -2) = -½·(2, 4), so it\'s parallel to v.'
  }
];

// Section 2: Lengths and Dot Products
export const section02Quiz: QuizQuestion[] = [
  {
    id: 's02-q1',
    question: 'What is the dot product of v = (3, 4) and w = (1, 2)?',
    options: ['7', '11', '14', '5'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'v · w = 3·1 + 4·2 = 3 + 8 = 11.'
  },
  {
    id: 's02-q2',
    question: 'What is the length (norm) of v = (3, 4)?',
    options: ['7', '5', '25', '12'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: '||v|| = √(3² + 4²) = √(9 + 16) = √25 = 5.'
  },
  {
    id: 's02-q3',
    question: 'Two vectors are perpendicular (orthogonal) when their dot product equals:',
    options: ['1', '-1', '0', 'Their product of lengths'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Orthogonal vectors have v · w = 0 because cos(90°) = 0.'
  },
  {
    id: 's02-q4',
    question: 'Which vector is a unit vector?',
    options: ['(1, 1)', '(3/5, 4/5)', '(2, 0)', '(0.5, 0.5)'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: '(3/5)² + (4/5)² = 9/25 + 16/25 = 25/25 = 1, so the length is 1.'
  },
  {
    id: 's02-q5',
    question: 'If v · w = ||v|| ||w||, what is the angle between v and w?',
    options: ['0° (parallel)', '90° (perpendicular)', '180° (opposite)', '45°'],
    correctIndex: 0,
    difficulty: 'hard',
    explanation: 'v · w = ||v|| ||w|| cos θ. If v · w = ||v|| ||w||, then cos θ = 1, so θ = 0°.'
  }
];

// Section 3: Matrices
export const section03Quiz: QuizQuestion[] = [
  {
    id: 's03-q1',
    question: 'A matrix with 3 rows and 2 columns is called a:',
    options: ['2×3 matrix', '3×2 matrix', '6×1 matrix', 'Square matrix'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Matrix dimensions are given as rows × columns, so 3 rows and 2 columns = 3×2 matrix.'
  },
  {
    id: 's03-q2',
    question: 'In the matrix equation Ax = b, what does A represent?',
    options: ['A vector', 'A scalar', 'A coefficient matrix', 'The solution'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'A is the coefficient matrix containing the coefficients of the linear system.'
  },
  {
    id: 's03-q3',
    question: 'How many solutions does a consistent system with infinitely many solutions have?',
    options: ['Zero', 'Exactly one', 'Infinitely many', 'Cannot be determined'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'A consistent system either has exactly one solution (unique) or infinitely many solutions.'
  },
  {
    id: 's03-q4',
    question: 'What is a linear system where b = 0 called?',
    options: ['Consistent system', 'Homogeneous system', 'Overdetermined system', 'Singular system'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'A homogeneous system has the form Ax = 0, meaning all constant terms are zero.'
  },
  {
    id: 's03-q5',
    question: 'To multiply matrix A (2×3) by vector x, x must have how many components?',
    options: ['2', '3', '5', '6'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'For Ax to be defined, the number of columns of A must equal the number of rows (components) of x.'
  }
];

// Chapter 1 Comprehensive Quiz (mix from all sections)
export const chapter01Quiz: QuizQuestion[] = [
  {
    id: 'ch01-q1',
    question: 'What is the result of 2(1, 3) + 3(2, -1)?',
    options: ['(8, 3)', '(4, 6)', '(8, 6)', '(5, 2)'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: '2(1, 3) + 3(2, -1) = (2, 6) + (6, -3) = (8, 3).'
  },
  {
    id: 'ch01-q2',
    question: 'The dot product v · v equals:',
    options: ['||v||', '||v||²', '2||v||', 'v²'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'v · v = ||v||² (the square of the length).'
  },
  {
    id: 'ch01-q3',
    question: 'If vectors u and v are orthogonal, what is u · v?',
    options: ['1', '||u|| ||v||', '0', '-1'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Orthogonal (perpendicular) vectors have zero dot product.'
  },
  {
    id: 'ch01-q4',
    question: 'A 4×3 matrix has how many entries?',
    options: ['7', '12', '16', '9'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'A 4×3 matrix has 4 × 3 = 12 entries.'
  },
  {
    id: 'ch01-q5',
    question: 'What is the angle between (1, 0) and (0, 1)?',
    options: ['0°', '45°', '90°', '180°'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: '(1, 0) · (0, 1) = 0, so they are perpendicular (90°).'
  },
  {
    id: 'ch01-q6',
    question: 'The Cauchy-Schwarz inequality states that |v · w| is at most:',
    options: ['||v|| + ||w||', '||v|| ||w||', '||v||² + ||w||²', '||v - w||'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: '|v · w| ≤ ||v|| ||w||, with equality when v and w are parallel.'
  },
  {
    id: 'ch01-q7',
    question: 'To find a unit vector in the direction of v, you compute:',
    options: ['v/||v||', 'v · v', 'v - ||v||', '||v||/v'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Dividing v by its length gives a unit vector: u = v/||v||.'
  },
  {
    id: 'ch01-q8',
    question: 'Linear combinations of (1, 1) and (2, 2) fill:',
    options: ['The entire plane', 'A line through the origin', 'A point', 'A circle'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: '(2, 2) = 2(1, 1), so they are parallel. Linear combinations fill only a line.'
  },
  {
    id: 'ch01-q9',
    question: 'If A is a 3×2 matrix and x is a 2×1 vector, what are the dimensions of Ax?',
    options: ['3×1', '2×1', '3×2', '2×3'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'A (3×2) times x (2×1) gives a 3×1 result (rows of A × columns of x).'
  },
  {
    id: 'ch01-q10',
    question: 'Ax = b can be viewed as a linear combination of which vectors?',
    options: ['Rows of A', 'Columns of A', 'Rows of b', 'The vector x'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Ax is a linear combination of the columns of A, with coefficients from x.'
  }
];
