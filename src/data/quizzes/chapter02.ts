// Chapter 2: Solving Linear Equations (Sections 4-10)
// Curriculum: 2.1-2.7 from Strang's Linear Algebra
import type { QuizQuestion } from './types';

// Section 4: Vectors and Linear Equations (2.1)
export const section04Quiz: QuizQuestion[] = [
  {
    id: 's04-q1',
    question: 'The "row picture" of Ax = b shows:',
    options: ['Column vectors', 'Intersecting planes/lines', 'A single vector', 'The inverse matrix'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'The row picture shows each equation as a plane (or line in 2D). The solution is their intersection.'
  },
  {
    id: 's04-q2',
    question: 'The "column picture" of Ax = b expresses b as:',
    options: ['A row of A', 'A linear combination of columns of A', 'The determinant', 'A pivot'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Ax = b means b = x₁(col 1) + x₂(col 2) + ... , a linear combination of A\'s columns.'
  },
  {
    id: 's04-q3',
    question: 'A 2×2 system has no solution when the row picture shows:',
    options: ['Intersecting lines', 'Parallel lines', 'Identical lines', 'Perpendicular lines'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Parallel lines never intersect, so there is no solution.'
  },
  {
    id: 's04-q4',
    question: 'In the column picture, "b is in the column space" means:',
    options: ['The system has no solution', 'The system has at least one solution', 'A is invertible', 'b = 0'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'If b is a linear combination of A\'s columns, then Ax = b has a solution.'
  },
  {
    id: 's04-q5',
    question: 'For a 3×3 system, the row picture shows intersection of:',
    options: ['Three lines', 'Three planes', 'Three points', 'Three circles'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Each equation in 3 unknowns represents a plane. The solution is where all three planes meet.'
  }
];

// Section 5: The Idea of Elimination (2.2)
export const section05Quiz: QuizQuestion[] = [
  {
    id: 's05-q1',
    question: 'The goal of elimination is to transform A into what type of matrix?',
    options: ['Diagonal', 'Upper triangular', 'Lower triangular', 'Identity'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Gaussian elimination creates zeros below the diagonal, producing upper triangular form U.'
  },
  {
    id: 's05-q2',
    question: 'What is the first pivot in the elimination process?',
    options: ['Any nonzero entry', 'The entry a₁₁', 'The largest entry', 'The entry a₁ₙ'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'The first pivot is a₁₁ (if nonzero), used to eliminate entries below it in column 1.'
  },
  {
    id: 's05-q3',
    question: 'When does elimination fail (require a row exchange)?',
    options: ['When the pivot is 1', 'When the pivot is 0', 'When the pivot is negative', 'Never'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'A zero pivot requires a row exchange to find a nonzero pivot below it.'
  },
  {
    id: 's05-q4',
    question: 'The multiplier ℓᵢⱼ used to eliminate entry (i,j) equals:',
    options: ['aᵢⱼ/aⱼⱼ', 'aⱼⱼ/aᵢⱼ', 'aᵢⱼ × aⱼⱼ', 'aᵢⱼ - aⱼⱼ'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'The multiplier ℓᵢⱼ = (entry to eliminate)/(pivot) = aᵢⱼ/aⱼⱼ.'
  },
  {
    id: 's05-q5',
    question: 'After elimination, if a row becomes 0 = c (where c ≠ 0), the system is:',
    options: ['Consistent', 'Inconsistent', 'Has infinitely many solutions', 'Homogeneous'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: '0 = c (c ≠ 0) is a contradiction, indicating no solution exists.'
  }
];

// Section 6: Elimination Using Matrices (2.3)
export const section06Quiz: QuizQuestion[] = [
  {
    id: 's06-q1',
    question: 'An elimination matrix Eᵢⱼ subtracts a multiple of row j from row i. Eᵢⱼ differs from I in position:',
    options: ['(i, i)', '(j, j)', '(i, j)', '(j, i)'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Eᵢⱼ has -ℓᵢⱼ in position (i, j), which causes row j to be subtracted from row i.'
  },
  {
    id: 's06-q2',
    question: 'The product E₃₁E₂₁A eliminates entries in column 1. Which elimination happens first?',
    options: ['E₃₁ (row 3)', 'E₂₁ (row 2)', 'Both simultaneously', 'Neither'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Matrix multiplication is right to left: E₂₁ acts first, then E₃₁.'
  },
  {
    id: 's06-q3',
    question: 'The augmented matrix [A | b] combines:',
    options: ['A and its inverse', 'A and the right-hand side b', 'A and U', 'Two copies of A'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'The augmented matrix appends b as an extra column to track the right-hand side.'
  },
  {
    id: 's06-q4',
    question: 'Back substitution solves equations starting from:',
    options: ['The first equation', 'The last equation', 'Any equation', 'The middle equation'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'After elimination to upper triangular form, solve from bottom to top.'
  },
  {
    id: 's06-q5',
    question: 'The product of all elimination matrices E...E₂E₁ has an inverse that equals:',
    options: ['U', 'A', 'L (lower triangular)', 'I'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'The inverse of the elimination product is L, giving A = LU.'
  }
];

// Section 7: Rules for Matrix Operations (2.4)
export const section07Quiz: QuizQuestion[] = [
  {
    id: 's07-q1',
    question: 'For matrices A and B, when is A + B defined?',
    options: ['Always', 'When they have the same dimensions', 'When A is square', 'When B is square'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Matrix addition requires matching dimensions (same number of rows and columns).'
  },
  {
    id: 's07-q2',
    question: 'For AB to be defined, the number of columns of A must equal:',
    options: ['The number of rows of B', 'The number of columns of B', 'The number of rows of A', '1'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'Matrix multiplication A(m×n) · B(n×p) requires columns of A = rows of B.'
  },
  {
    id: 's07-q3',
    question: 'If A is 3×4 and B is 4×2, what are the dimensions of AB?',
    options: ['3×2', '4×4', '3×4', '2×3'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'A(3×4) · B(4×2) = C(3×2). Result has rows of A and columns of B.'
  },
  {
    id: 's07-q4',
    question: 'Is matrix multiplication commutative (AB = BA)?',
    options: ['Always', 'Never', 'Only for square matrices', 'Generally not'],
    correctIndex: 3,
    difficulty: 'medium',
    explanation: 'AB ≠ BA in general. Even when both products exist, they usually differ.'
  },
  {
    id: 's07-q5',
    question: '(AB)C equals:',
    options: ['A(BC)', 'C(BA)', 'ACB', 'CAB'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Matrix multiplication is associative: (AB)C = A(BC).'
  }
];

// Section 8: Inverse Matrices (2.5)
export const section08Quiz: QuizQuestion[] = [
  {
    id: 's08-q1',
    question: 'If A⁻¹ exists, then A⁻¹A equals:',
    options: ['A', '2A', 'I (identity)', '0'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'By definition, A⁻¹A = AA⁻¹ = I (the identity matrix).'
  },
  {
    id: 's08-q2',
    question: 'A matrix with an inverse is called:',
    options: ['Singular', 'Invertible (nonsingular)', 'Orthogonal', 'Symmetric'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'An invertible (or nonsingular) matrix has an inverse.'
  },
  {
    id: 's08-q3',
    question: 'Which condition guarantees that A is NOT invertible?',
    options: ['All pivots are nonzero', 'det(A) = 0', 'A is square', 'A = Aᵀ'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'A singular matrix has det(A) = 0 and has no inverse.'
  },
  {
    id: 's08-q4',
    question: 'The inverse of AB (when it exists) is:',
    options: ['A⁻¹B⁻¹', 'B⁻¹A⁻¹', 'BA⁻¹', 'A⁻¹ + B⁻¹'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: '(AB)⁻¹ = B⁻¹A⁻¹. The order reverses!'
  },
  {
    id: 's08-q5',
    question: 'For a 2×2 matrix A = [[a,b],[c,d]], the inverse involves dividing by:',
    options: ['a + d', 'ad + bc', 'ad - bc', 'a - d'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'A⁻¹ = (1/(ad-bc))[[d,-b],[-c,a]]. The denominator is det(A) = ad - bc.'
  }
];

// Section 9: Elimination = Factorization: A = LU (2.6)
export const section09Quiz: QuizQuestion[] = [
  {
    id: 's09-q1',
    question: 'In the LU factorization A = LU, L is:',
    options: ['Upper triangular', 'Lower triangular', 'Diagonal', 'Orthogonal'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'L is lower triangular (with 1s on diagonal), U is upper triangular.'
  },
  {
    id: 's09-q2',
    question: 'The entries below the diagonal of L are:',
    options: ['The pivots', 'The multipliers from elimination', 'Always 1', 'Always 0'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'L stores the multipliers ℓᵢⱼ used during elimination.'
  },
  {
    id: 's09-q3',
    question: 'The main advantage of LU factorization is:',
    options: ['It never fails', 'It works for any matrix', 'Solving Ax = b for multiple b vectors efficiently', 'It is faster than elimination'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Once A = LU is computed, solving for new b only requires forward/back substitution.'
  },
  {
    id: 's09-q4',
    question: 'The number of operations for LU factorization of an n×n matrix is approximately:',
    options: ['n²', 'n³/3', 'n³', '2ⁿ'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'LU factorization requires about n³/3 multiplications and additions.'
  },
  {
    id: 's09-q5',
    question: 'To solve Ax = b using LU factorization, we solve:',
    options: ['Lx = b, then Ux = c', 'Ux = b, then Lx = c', 'Lc = b, then Ux = c', 'LUx = b directly'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'First solve Lc = b (forward substitution), then Ux = c (back substitution).'
  }
];

// Section 10: Transposes and Permutations (2.7)
export const section10Quiz: QuizQuestion[] = [
  {
    id: 's10-q1',
    question: 'The transpose of a matrix exchanges:',
    options: ['Rows and columns', 'Diagonal entries', 'First and last rows', 'Positive and negative entries'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: '(Aᵀ)ᵢⱼ = Aⱼᵢ: rows become columns and columns become rows.'
  },
  {
    id: 's10-q2',
    question: 'A permutation matrix P has the property:',
    options: ['P⁻¹ = P', 'P⁻¹ = Pᵀ', 'P² = 0', 'P + Pᵀ = I'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Permutation matrices are orthogonal: P⁻¹ = Pᵀ.'
  },
  {
    id: 's10-q3',
    question: 'The equation (AB)ᵀ equals:',
    options: ['AᵀBᵀ', 'BᵀAᵀ', 'AᵀBᵀ only if A = B', 'BA'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'The transpose of a product reverses order: (AB)ᵀ = BᵀAᵀ.'
  },
  {
    id: 's10-q4',
    question: 'A symmetric matrix satisfies:',
    options: ['A = -Aᵀ', 'A = Aᵀ', 'A = A⁻¹', 'Aᵀ = 0'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'A symmetric matrix equals its transpose: A = Aᵀ.'
  },
  {
    id: 's10-q5',
    question: 'When row exchanges are needed, LU factorization becomes:',
    options: ['Impossible', 'PA = LU', 'A = PLU', 'A = UP'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'With row exchanges, we get PA = LU where P is a permutation matrix.'
  }
];

// Chapter 2 Comprehensive Quiz
export const chapter02Quiz: QuizQuestion[] = [
  {
    id: 'ch02-q1',
    question: 'Gaussian elimination transforms A into:',
    options: ['L (lower triangular)', 'U (upper triangular)', 'D (diagonal)', 'I (identity)'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Elimination creates zeros below the diagonal, giving upper triangular U.'
  },
  {
    id: 'ch02-q2',
    question: 'If elimination produces a zero pivot with no nonzero entry below it, then:',
    options: ['The system has a unique solution', 'The system is inconsistent', 'The matrix is singular', 'We multiply by -1'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'A zero pivot that cannot be fixed means the matrix is singular (not invertible).'
  },
  {
    id: 'ch02-q3',
    question: 'The product of the pivots equals:',
    options: ['0', 'det(A)', 'rank(A)', 'n'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'For triangular matrices, det = product of diagonal entries. det(A) = det(U) = product of pivots.'
  },
  {
    id: 'ch02-q4',
    question: 'If A and B are both invertible n×n matrices, then AB is:',
    options: ['Always singular', 'Always invertible', 'Invertible only if A = B', 'Sometimes invertible'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'The product of invertible matrices is invertible: (AB)⁻¹ = B⁻¹A⁻¹.'
  },
  {
    id: 'ch02-q5',
    question: 'The identity matrix I has the property that IA equals:',
    options: ['I', 'A', 'AI', '2A'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'The identity matrix satisfies IA = AI = A for any matrix A.'
  },
  {
    id: 'ch02-q6',
    question: 'A matrix with linearly dependent columns:',
    options: ['Is always invertible', 'Has det ≠ 0', 'Has det = 0', 'Must be square'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'Dependent columns mean the matrix is singular, so det = 0.'
  },
  {
    id: 'ch02-q7',
    question: 'The row picture of a 3×3 system shows:',
    options: ['Three lines', 'Three planes', 'A single plane', 'A line'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Each equation in 3 unknowns defines a plane. The solution is where they intersect.'
  },
  {
    id: 'ch02-q8',
    question: 'For a symmetric matrix, A = Aᵀ means:',
    options: ['A is invertible', 'aᵢⱼ = aⱼᵢ for all i, j', 'All entries are positive', 'A² = I'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Symmetry means the (i,j) entry equals the (j,i) entry.'
  },
  {
    id: 'ch02-q9',
    question: 'If A⁻¹ = A, then A is called:',
    options: ['Symmetric', 'Orthogonal', 'Involutory', 'Nilpotent'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'A matrix satisfying A⁻¹ = A (or A² = I) is called involutory.'
  },
  {
    id: 'ch02-q10',
    question: 'LU factorization is useful because:',
    options: ['It gives the eigenvalues', 'It solves Ax = b for many different b efficiently', 'It works for non-square matrices', 'L and U are always integers'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Once A = LU is computed, each new b requires only O(n²) work instead of O(n³).'
  }
];
