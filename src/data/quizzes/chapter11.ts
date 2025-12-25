// Chapter 11: Numerical Linear Algebra (Sections 45-47)
import type { QuizQuestion } from './types';

// Section 45: Gaussian Elimination in Practice
export const section45Quiz: QuizQuestion[] = [
  {
    id: 's45-q1',
    question: 'Partial pivoting chooses the pivot with:',
    options: ['Smallest absolute value', 'Largest absolute value in column', 'Random selection', 'First nonzero entry'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Partial pivoting: choose largest |entry| in column below pivot.'
  },
  {
    id: 's45-q2',
    question: 'Floating-point errors accumulate due to:',
    options: ['Exact arithmetic', 'Rounding at each operation', 'Matrix size', 'Determinant value'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Finite precision means each operation introduces small errors.'
  },
  {
    id: 's45-q3',
    question: 'An ill-conditioned matrix has condition number that is:',
    options: ['Close to 1', 'Very large', 'Negative', 'Zero'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Large κ(A) = σmax/σmin means high sensitivity to errors.'
  },
  {
    id: 's45-q4',
    question: 'Complete pivoting searches for the largest entry in:',
    options: ['Current column only', 'Current row only', 'Entire remaining submatrix', 'Diagonal only'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'Complete pivoting: max over all remaining entries (costly).'
  }
];

// Section 46: Iterative Methods
export const section46Quiz: QuizQuestion[] = [
  {
    id: 's46-q1',
    question: 'The Jacobi method updates xₙ₊₁ using:',
    options: ['Only xₙ values', 'Mix of xₙ and xₙ₊₁', 'Only xₙ₊₁ values', 'Random values'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Jacobi uses all old values xₙ to compute new xₙ₊₁.'
  },
  {
    id: 's46-q2',
    question: 'Gauss-Seidel differs from Jacobi by:',
    options: ['Using updated values immediately', 'Being slower', 'Never converging', 'Using random order'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Gauss-Seidel uses new values as soon as computed.'
  },
  {
    id: 's46-q3',
    question: 'Iterative methods converge when the spectral radius ρ(M) is:',
    options: ['> 1', '= 1', '< 1', 'Complex'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'Convergence requires ρ(M) < 1 for iteration matrix M.'
  },
  {
    id: 's46-q4',
    question: 'Conjugate gradient method is designed for:',
    options: ['Any matrix', 'Symmetric positive definite matrices', 'Singular matrices', 'Complex matrices'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'CG exploits symmetry and positive definiteness for efficiency.'
  }
];

// Section 47: Eigenvalue Algorithms
export const section47Quiz: QuizQuestion[] = [
  {
    id: 's47-q1',
    question: 'Power iteration finds:',
    options: ['All eigenvalues', 'The smallest eigenvalue', 'The largest eigenvalue (in magnitude)', 'The median eigenvalue'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Power method: Aᵏv converges to dominant eigenvector.'
  },
  {
    id: 's47-q2',
    question: 'Inverse iteration finds eigenvalues near:',
    options: ['Zero', 'Infinity', 'A chosen shift μ', 'One'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: '(A - μI)⁻¹ has largest eigenvalue 1/(λ - μ) for λ nearest μ.'
  },
  {
    id: 's47-q3',
    question: 'The QR algorithm computes eigenvalues by:',
    options: ['Direct formula', 'Repeated QR factorizations', 'Random sampling', 'Interpolation'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'A = QR, then A\' = RQ, repeat: converges to eigenvalue form.'
  },
  {
    id: 's47-q4',
    question: 'Shifting in QR algorithm (A - μI) accelerates convergence near:',
    options: ['All eigenvalues', 'The eigenvalue closest to μ', 'Zero', 'Infinity'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Shift μ speeds up convergence for eigenvalue near μ.'
  }
];

// Chapter 11 Comprehensive Quiz
export const chapter11Quiz: QuizQuestion[] = [
  {
    id: 'ch11-q1',
    question: 'Why is pivoting important in Gaussian elimination?',
    options: ['It makes the algorithm faster', 'It prevents division by zero and reduces error', 'It computes eigenvalues', 'It is not important'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Pivoting avoids zero pivots and small divisors (stability).'
  },
  {
    id: 'ch11-q2',
    question: 'The relative error in solving Ax = b is bounded by:',
    options: ['κ(A) × relative error in b', 'det(A)', 'rank(A)', '1/det(A)'],
    correctIndex: 0,
    difficulty: 'hard',
    explanation: 'Condition number κ(A) amplifies input errors.'
  },
  {
    id: 'ch11-q3',
    question: 'For a diagonally dominant matrix, Jacobi and Gauss-Seidel:',
    options: ['Never converge', 'Always converge', 'Sometimes converge', 'Are identical'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Diagonal dominance guarantees convergence of both methods.'
  },
  {
    id: 'ch11-q4',
    question: 'Successive Over-Relaxation (SOR) uses parameter ω to:',
    options: ['Slow down convergence', 'Speed up convergence', 'Guarantee divergence', 'Compute eigenvalues'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Optimal ω (1 < ω < 2) can greatly accelerate Gauss-Seidel.'
  },
  {
    id: 'ch11-q5',
    question: 'Power iteration requires the matrix to have:',
    options: ['All equal eigenvalues', 'One dominant eigenvalue', 'Complex eigenvalues', 'Zero determinant'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Need |λ₁| > |λ₂| for convergence to λ₁ eigenvector.'
  },
  {
    id: 'ch11-q6',
    question: 'The rate of convergence of power iteration depends on:',
    options: ['Matrix size', '|λ₂/λ₁|', 'The determinant', 'The trace'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Smaller |λ₂/λ₁| means faster convergence.'
  },
  {
    id: 'ch11-q7',
    question: 'Hessenberg form (for QR algorithm) has zeros:',
    options: ['Everywhere', 'Below the subdiagonal', 'Above the diagonal', 'On the diagonal'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Upper Hessenberg: aᵢⱼ = 0 for i > j + 1.'
  },
  {
    id: 'ch11-q8',
    question: 'Sparse matrices benefit from iterative methods because:',
    options: ['Direct methods fail', 'They preserve sparsity', 'They are always faster', 'They give exact answers'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Direct methods create fill-in; iterative methods preserve sparsity.'
  },
  {
    id: 'ch11-q9',
    question: 'The Rayleigh quotient R(x) = xᵀAx/xᵀx approximates:',
    options: ['The determinant', 'An eigenvalue', 'The trace', 'The norm'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'R(x) equals an eigenvalue when x is an eigenvector.'
  },
  {
    id: 'ch11-q10',
    question: 'Krylov subspace methods build solutions from:',
    options: ['Random vectors', 'Span of {b, Ab, A²b, ...}', 'Eigenvectors only', 'Null space vectors'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Krylov space Kₖ = span{b, Ab, ..., Aᵏ⁻¹b}.'
  }
];
