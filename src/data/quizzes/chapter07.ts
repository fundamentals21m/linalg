// Chapter 7: Singular Value Decomposition (Sections 28-31)
import type { QuizQuestion } from './types';

// Section 28: Introduction to SVD
export const section28Quiz: QuizQuestion[] = [
  {
    id: 's28-q1',
    question: 'SVD decomposes A as:',
    options: ['A = LU', 'A = QR', 'A = UΣVᵀ', 'A = SDS⁻¹'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'A = UΣVᵀ where U, V are orthogonal and Σ is diagonal.'
  },
  {
    id: 's28-q2',
    question: 'The singular values are:',
    options: ['Eigenvalues of A', 'Square roots of eigenvalues of AᵀA', 'Entries of A', 'Ranks'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'σᵢ = √λᵢ where λᵢ are eigenvalues of AᵀA.'
  },
  {
    id: 's28-q3',
    question: 'SVD works for:',
    options: ['Only square matrices', 'Only symmetric matrices', 'Any matrix', 'Only invertible matrices'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Every matrix has an SVD, rectangular or square.'
  },
  {
    id: 's28-q4',
    question: 'The columns of V in A = UΣVᵀ are:',
    options: ['Eigenvectors of A', 'Eigenvectors of AᵀA', 'Left singular vectors', 'Random orthonormal vectors'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'V contains right singular vectors = eigenvectors of AᵀA.'
  }
];

// Section 29: Computing the SVD
export const section29Quiz: QuizQuestion[] = [
  {
    id: 's29-q1',
    question: 'The number of nonzero singular values equals:',
    options: ['n', 'm', 'rank(A)', 'det(A)'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Number of nonzero σᵢ = rank of A.'
  },
  {
    id: 's29-q2',
    question: 'Singular values are always:',
    options: ['Complex', 'Negative', 'Non-negative real', 'Zero'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'σᵢ ≥ 0 (square roots of non-negative eigenvalues).'
  },
  {
    id: 's29-q3',
    question: 'U contains eigenvectors of:',
    options: ['A', 'Aᵀ', 'AAᵀ', 'AᵀA'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'U has left singular vectors = eigenvectors of AAᵀ.'
  },
  {
    id: 's29-q4',
    question: 'If A is m×n with m > n, then Σ is:',
    options: ['Square n×n', 'm×n with zeros below', 'n×m', 'Always square'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Σ is m×n, with n singular values and zeros below.'
  }
];

// Section 30: Principal Component Analysis
export const section30Quiz: QuizQuestion[] = [
  {
    id: 's30-q1',
    question: 'PCA finds directions that:',
    options: ['Minimize variance', 'Maximize variance', 'Keep all data', 'Are random'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Principal components are directions of maximum variance.'
  },
  {
    id: 's30-q2',
    question: 'The first principal component is:',
    options: ['The smallest singular vector', 'The largest singular vector', 'Any column of V', 'A random direction'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'First PC = right singular vector for largest singular value.'
  },
  {
    id: 's30-q3',
    question: 'Keeping only the top k singular values/vectors is called:',
    options: ['Full SVD', 'Low-rank approximation', 'Eigendecomposition', 'QR factorization'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Truncated SVD gives the best rank-k approximation.'
  },
  {
    id: 's30-q4',
    question: 'The Eckart-Young theorem says the best rank-k approximation minimizes:',
    options: ['||A||₂', '||A - Aₖ||', 'rank(A)', 'trace(A)'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Aₖ = UₖΣₖVₖᵀ minimizes ||A - B||₂ among all rank-k matrices B.'
  }
];

// Section 31: Pseudoinverse
export const section31Quiz: QuizQuestion[] = [
  {
    id: 's31-q1',
    question: 'The pseudoinverse A⁺ is computed from SVD as:',
    options: ['UΣVᵀ', 'VΣ⁻¹Uᵀ', 'VΣ⁺Uᵀ', 'Σ⁻¹'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'A⁺ = VΣ⁺Uᵀ where Σ⁺ inverts nonzero singular values.'
  },
  {
    id: 's31-q2',
    question: 'For invertible A, the pseudoinverse equals:',
    options: ['0', 'A', 'A⁻¹', 'Aᵀ'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'When A is invertible, A⁺ = A⁻¹.'
  },
  {
    id: 's31-q3',
    question: 'A⁺b gives the least squares solution when:',
    options: ['A is square', 'A has full column rank', 'A is any matrix', 'A is symmetric'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'A⁺b is the minimum-norm least squares solution for any A.'
  },
  {
    id: 's31-q4',
    question: 'The polar decomposition writes A as:',
    options: ['A = QR', 'A = QS where Q orthogonal, S symmetric positive semidefinite', 'A = LU', 'A = UΣ'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'A = QS (or A = SQ) with Q orthogonal, S = √(AᵀA).'
  }
];

// Chapter 7 Comprehensive Quiz
export const chapter07Quiz: QuizQuestion[] = [
  {
    id: 'ch07-q1',
    question: 'In A = UΣVᵀ, U and V are:',
    options: ['Lower triangular', 'Upper triangular', 'Orthogonal', 'Diagonal'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'U and V are orthogonal matrices (orthonormal columns).'
  },
  {
    id: 'ch07-q2',
    question: '||A||₂ (spectral norm) equals:',
    options: ['Sum of singular values', 'Largest singular value σ₁', 'Product of singular values', 'Trace of Σ'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'The 2-norm is the largest singular value.'
  },
  {
    id: 'ch07-q3',
    question: 'The condition number κ(A) = :',
    options: ['σ₁', 'σ₁/σᵣ', 'σ₁ + σᵣ', 'σ₁ - σᵣ'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'κ = σmax/σmin = σ₁/σᵣ measures sensitivity to errors.'
  },
  {
    id: 'ch07-q4',
    question: 'SVD reveals the four fundamental subspaces via:',
    options: ['Only U', 'Only V', 'U and V columns', 'Σ entries'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'First r columns of U span C(A), last m-r span N(Aᵀ), etc.'
  },
  {
    id: 'ch07-q5',
    question: 'For data compression, SVD is used because:',
    options: ['It\'s fast', 'Low-rank approximation is optimal', 'It works only on images', 'It increases data size'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Eckart-Young: best low-rank approximation in Frobenius and 2-norm.'
  },
  {
    id: 'ch07-q6',
    question: 'The Frobenius norm ||A||F equals:',
    options: ['σ₁', '√(σ₁² + ... + σᵣ²)', 'σ₁ + ... + σᵣ', 'σ₁σ₂...σᵣ'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: '||A||F = √(sum of σᵢ²) = √(sum of all aᵢⱼ²).'
  },
  {
    id: 'ch07-q7',
    question: 'PCA on mean-centered data X uses SVD of:',
    options: ['X', 'Xᵀ', 'XXᵀ', 'XᵀX'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'SVD of X directly gives principal components in V.'
  },
  {
    id: 'ch07-q8',
    question: 'The nuclear norm ||A||* is:',
    options: ['σ₁', 'Sum of all singular values', 'Product of singular values', 'Largest eigenvalue'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: '||A||* = σ₁ + σ₂ + ... + σᵣ (trace norm).'
  },
  {
    id: 'ch07-q9',
    question: 'Image compression via SVD stores:',
    options: ['The full matrix A', 'Uₖ, Σₖ, Vₖ', 'Only Σ', 'Only U'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Store top k singular values and corresponding u and v vectors.'
  },
  {
    id: 'ch07-q10',
    question: 'A⁺A is:',
    options: ['Always I', 'Projection onto row space', 'Projection onto null space', 'Always 0'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'A⁺A projects onto the row space of A.'
  }
];
