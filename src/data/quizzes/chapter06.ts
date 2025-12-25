// Chapter 6: Eigenvalues and Eigenvectors (Sections 23-27)
import type { QuizQuestion } from './types';

// Section 23: Introduction to Eigenvalues
export const section23Quiz: QuizQuestion[] = [
  {
    id: 's23-q1',
    question: 'An eigenvector x satisfies Ax = :',
    options: ['0', 'x', 'λx', 'Aλ'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Ax = λx defines eigenvector x with eigenvalue λ.'
  },
  {
    id: 's23-q2',
    question: 'Eigenvalues are found by solving:',
    options: ['det(A) = 0', 'det(A - λI) = 0', 'A = λI', 'Ax = 0'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'The characteristic equation det(A - λI) = 0 gives eigenvalues.'
  },
  {
    id: 's23-q3',
    question: 'The sum of eigenvalues equals:',
    options: ['det(A)', 'trace(A)', 'rank(A)', '0'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Sum of eigenvalues = trace = sum of diagonal entries.'
  },
  {
    id: 's23-q4',
    question: 'The product of eigenvalues equals:',
    options: ['trace(A)', 'det(A)', 'rank(A)', 'n'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Product of eigenvalues = determinant.'
  }
];

// Section 24: Diagonalization
export const section24Quiz: QuizQuestion[] = [
  {
    id: 's24-q1',
    question: 'A is diagonalizable if A = :',
    options: ['SDS⁻¹', 'S + D', 'D/S', 'SᵀDS'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'A = SDS⁻¹ where D is diagonal (eigenvalues) and S has eigenvectors.'
  },
  {
    id: 's24-q2',
    question: 'The columns of S in A = SDS⁻¹ are:',
    options: ['Eigenvalues', 'Eigenvectors', 'Rows of A', 'Random vectors'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'S has eigenvectors as columns, D has eigenvalues on diagonal.'
  },
  {
    id: 's24-q3',
    question: 'A is diagonalizable if it has:',
    options: ['n eigenvalues (counting multiplicity)', 'n linearly independent eigenvectors', 'All positive eigenvalues', 'Integer eigenvalues'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Need n independent eigenvectors to form invertible S.'
  },
  {
    id: 's24-q4',
    question: 'Aᵏ can be computed as:',
    options: ['S Dᵏ S⁻¹', 'Sᵏ D Sᵏ', 'kA', 'A + kI'],
    correctIndex: 0,
    difficulty: 'hard',
    explanation: 'Aᵏ = (SDS⁻¹)ᵏ = SDᵏS⁻¹, and Dᵏ is easy (diagonal).'
  }
];

// Section 25: Differential Equations
export const section25Quiz: QuizQuestion[] = [
  {
    id: 's25-q1',
    question: 'The solution to du/dt = Au involves:',
    options: ['sin(t)', 'eᴬᵗ', 't²', 'log(t)'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'u(t) = eᴬᵗu(0), the matrix exponential.'
  },
  {
    id: 's25-q2',
    question: 'Stability (u → 0 as t → ∞) requires all eigenvalues to have:',
    options: ['Positive real parts', 'Negative real parts', 'Zero imaginary parts', 'Magnitude > 1'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Re(λ) < 0 for all λ ensures exponential decay to zero.'
  },
  {
    id: 's25-q3',
    question: 'Pure imaginary eigenvalues (λ = ±bi) give:',
    options: ['Exponential growth', 'Exponential decay', 'Oscillations', 'Constant solutions'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'e^(ibt) = cos(bt) + i sin(bt), pure oscillation.'
  },
  {
    id: 's25-q4',
    question: 'eᴬᵗ can be computed using:',
    options: ['Just e^λt', 'S eᴰᵗ S⁻¹', 'A + t', 'tA'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'eᴬᵗ = S eᴰᵗ S⁻¹ where eᴰᵗ has e^(λᵢt) on diagonal.'
  }
];

// Section 26: Symmetric Matrices
export const section26Quiz: QuizQuestion[] = [
  {
    id: 's26-q1',
    question: 'A symmetric matrix has:',
    options: ['Complex eigenvalues', 'Real eigenvalues', 'Zero eigenvalues', 'No eigenvalues'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Symmetric matrices always have real eigenvalues.'
  },
  {
    id: 's26-q2',
    question: 'Eigenvectors of a symmetric matrix are:',
    options: ['Parallel', 'Orthogonal', 'Equal', 'Complex'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Eigenvectors for distinct eigenvalues are orthogonal.'
  },
  {
    id: 's26-q3',
    question: 'A symmetric matrix can be written as:',
    options: ['A = SDS⁻¹', 'A = QDQᵀ', 'A = LU', 'A = QR'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Spectral theorem: A = QDQᵀ with orthogonal Q.'
  },
  {
    id: 's26-q4',
    question: 'For symmetric A, the eigenvector matrix S is:',
    options: ['Lower triangular', 'Upper triangular', 'Orthogonal', 'Diagonal'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'S = Q is orthogonal (Qᵀ = Q⁻¹) for symmetric matrices.'
  }
];

// Section 27: Positive Definite Matrices
export const section27Quiz: QuizQuestion[] = [
  {
    id: 's27-q1',
    question: 'A positive definite matrix has:',
    options: ['All eigenvalues < 0', 'All eigenvalues > 0', 'Mixed eigenvalues', 'Zero eigenvalues'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Positive definite ⟺ all eigenvalues strictly positive.'
  },
  {
    id: 's27-q2',
    question: 'For positive definite A, xᵀAx is always:',
    options: ['Zero', 'Negative', 'Positive (for x ≠ 0)', 'Complex'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'xᵀAx > 0 for all nonzero x defines positive definite.'
  },
  {
    id: 's27-q3',
    question: 'AᵀA is always:',
    options: ['Positive definite', 'Positive semidefinite', 'Negative definite', 'Indefinite'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'xᵀ(AᵀA)x = ||Ax||² ≥ 0, so AᵀA is positive semidefinite.'
  },
  {
    id: 's27-q4',
    question: 'A positive definite matrix can be factored as:',
    options: ['A = LU', 'A = LLᵀ (Cholesky)', 'A = QR', 'A = SVD'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Cholesky: A = LLᵀ with L lower triangular, positive diagonal.'
  }
];

// Chapter 6 Comprehensive Quiz
export const chapter06Quiz: QuizQuestion[] = [
  {
    id: 'ch06-q1',
    question: 'Eigenvalue λ = 0 means:',
    options: ['A is invertible', 'A is singular', 'A is symmetric', 'A is orthogonal'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'λ = 0 ⟺ det(A) = 0 ⟺ A is singular.'
  },
  {
    id: 'ch06-q2',
    question: 'If A has eigenvalue λ, then A² has eigenvalue:',
    options: ['2λ', 'λ²', 'λ + 1', '√λ'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Ax = λx ⟹ A²x = A(λx) = λ(Ax) = λ²x.'
  },
  {
    id: 'ch06-q3',
    question: 'Similar matrices A and B = P⁻¹AP have:',
    options: ['Same eigenvectors', 'Same eigenvalues', 'Same determinant only', 'Nothing in common'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Similar matrices share eigenvalues (same characteristic polynomial).'
  },
  {
    id: 'ch06-q4',
    question: 'An n×n matrix with n distinct eigenvalues is:',
    options: ['Never diagonalizable', 'Always diagonalizable', 'Sometimes diagonalizable', 'Always singular'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Distinct eigenvalues guarantee n independent eigenvectors.'
  },
  {
    id: 'ch06-q5',
    question: 'The spectral theorem applies to:',
    options: ['All matrices', 'Symmetric matrices', 'Only diagonal matrices', 'Only 2×2 matrices'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Symmetric (or Hermitian) matrices have orthogonal eigenvectors.'
  },
  {
    id: 'ch06-q6',
    question: 'A matrix with all positive pivots is:',
    options: ['Symmetric', 'Positive definite', 'Orthogonal', 'Singular'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'All positive pivots is one test for positive definiteness.'
  },
  {
    id: 'ch06-q7',
    question: 'Eigenvalues of A⁻¹ are:',
    options: ['Same as A', '1/λ for each λ of A', '-λ for each λ of A', 'λ² for each λ of A'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Ax = λx ⟹ x = A⁻¹(λx) ⟹ A⁻¹x = (1/λ)x.'
  },
  {
    id: 'ch06-q8',
    question: 'The trace of a matrix equals:',
    options: ['Product of eigenvalues', 'Sum of eigenvalues', 'Determinant', 'Rank'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'trace(A) = λ₁ + λ₂ + ... + λₙ.'
  },
  {
    id: 'ch06-q9',
    question: 'For differential equation u\' = Au to be stable:',
    options: ['det(A) > 0', 'trace(A) < 0 and det(A) > 0 (for 2×2)', 'All entries positive', 'A symmetric'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'For 2×2: need both eigenvalues negative, which requires trace < 0, det > 0.'
  },
  {
    id: 'ch06-q10',
    question: 'xᵀAx is called a:',
    options: ['Linear form', 'Quadratic form', 'Bilinear form', 'Determinant'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'xᵀAx is a quadratic form (degree 2 polynomial in components of x).'
  }
];
