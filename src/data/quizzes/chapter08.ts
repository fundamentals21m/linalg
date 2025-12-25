// Chapter 8: Linear Transformations (Sections 32-34)
import type { QuizQuestion } from './types';

// Section 32: Linear Transformations
export const section32Quiz: QuizQuestion[] = [
  {
    id: 's32-q1',
    question: 'A transformation T is linear if:',
    options: ['T(x + y) = T(x) + T(y) and T(cx) = cT(x)', 'T(x) = Ax for some A', 'T(0) = 0', 'All of these are equivalent'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'Linearity means preserving addition and scalar multiplication.'
  },
  {
    id: 's32-q2',
    question: 'The matrix of a linear transformation is found by:',
    options: ['Guessing', 'Applying T to standard basis vectors', 'Taking the inverse', 'Computing the determinant'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Column j of A is T(eⱼ), where eⱼ is the jth standard basis vector.'
  },
  {
    id: 's32-q3',
    question: 'The kernel of a linear transformation is:',
    options: ['The range', 'The null space', 'The identity', 'The inverse'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'ker(T) = {x : T(x) = 0} = null space of the matrix.'
  },
  {
    id: 's32-q4',
    question: 'rank(T) + nullity(T) = :',
    options: ['0', 'dim(domain)', 'dim(range)', '1'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Rank-nullity theorem: dim(range) + dim(kernel) = dim(domain).'
  }
];

// Section 33: Matrix of a Transformation
export const section33Quiz: QuizQuestion[] = [
  {
    id: 's33-q1',
    question: 'Rotation by angle θ in 2D has matrix:',
    options: ['[[cos θ, -sin θ], [sin θ, cos θ]]', '[[sin θ, cos θ], [cos θ, sin θ]]', '[[1, θ], [θ, 1]]', '[[θ, 0], [0, θ]]'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Rotation: [[cos θ, -sin θ], [sin θ, cos θ]].'
  },
  {
    id: 's33-q2',
    question: 'Projection onto the x-axis has matrix:',
    options: ['[[1, 0], [0, 0]]', '[[0, 0], [0, 1]]', '[[1, 0], [0, 1]]', '[[0, 1], [1, 0]]'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: '(x, y) → (x, 0), so matrix is [[1, 0], [0, 0]].'
  },
  {
    id: 's33-q3',
    question: 'The composition ST corresponds to matrix:',
    options: ['S + T', 'S - T', 'ST (matrix product)', 'TS'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Composition of linear maps = product of matrices.'
  },
  {
    id: 's33-q4',
    question: 'Reflection across the line y = x has matrix:',
    options: ['[[0, 1], [1, 0]]', '[[1, 0], [0, -1]]', '[[-1, 0], [0, 1]]', '[[1, 0], [0, 1]]'],
    correctIndex: 0,
    difficulty: 'hard',
    explanation: '(x, y) → (y, x), so matrix swaps coordinates: [[0, 1], [1, 0]].'
  }
];

// Section 34: Change of Basis
export const section34Quiz: QuizQuestion[] = [
  {
    id: 's34-q1',
    question: 'If B is a basis and P is the change of basis matrix, then coordinates transform as:',
    options: ['[x]_B = P[x]', '[x]_B = P⁻¹[x]', '[x] = P[x]_B', 'Both B and C'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Standard coords = P × (coords in basis B).'
  },
  {
    id: 's34-q2',
    question: 'Similar matrices represent:',
    options: ['Different transformations', 'The same transformation in different bases', 'Inverse transformations', 'Orthogonal transformations'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'B = P⁻¹AP means A and B are the same transformation, different bases.'
  },
  {
    id: 's34-q3',
    question: 'Diagonalization A = SDS⁻¹ is a change of basis to:',
    options: ['Standard basis', 'Eigenvector basis', 'Random basis', 'Orthonormal basis'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'In the eigenvector basis, the transformation is diagonal.'
  },
  {
    id: 's34-q4',
    question: 'Similar matrices always have the same:',
    options: ['Entries', 'Eigenvectors', 'Eigenvalues', 'Columns'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Similar matrices share eigenvalues, determinant, trace, rank.'
  }
];

// Chapter 8 Comprehensive Quiz
export const chapter08Quiz: QuizQuestion[] = [
  {
    id: 'ch08-q1',
    question: 'T(x) = x + b (translation) is:',
    options: ['Linear', 'Not linear', 'Linear only if b = 0', 'Always invertible'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'T(0) = b ≠ 0 (unless b = 0), so not linear.'
  },
  {
    id: 'ch08-q2',
    question: 'The image (range) of T: ℝ² → ℝ³ is a subspace of:',
    options: ['ℝ²', 'ℝ³', 'ℝ⁵', 'ℝ'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Range is a subspace of the codomain ℝ³.'
  },
  {
    id: 'ch08-q3',
    question: 'If T is 1-1 (injective), then:',
    options: ['ker(T) = {0}', 'T is onto', 'T is not linear', 'rank(T) = 0'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: '1-1 means only 0 maps to 0, so null space is trivial.'
  },
  {
    id: 'ch08-q4',
    question: 'Scaling by factor k in all directions has matrix:',
    options: ['kI', 'I/k', 'k + I', 'kᵀ'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'Uniform scaling: x → kx, matrix is kI.'
  },
  {
    id: 'ch08-q5',
    question: 'The derivative d/dx is a linear transformation on:',
    options: ['ℝ²', 'ℝ³', 'The space of polynomials', 'Only constants'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'd/dx(f + g) = df/dx + dg/dx and d/dx(cf) = c(df/dx).'
  },
  {
    id: 'ch08-q6',
    question: 'Integration ∫₀ˣ is linear because:',
    options: ['∫(f+g) = ∫f + ∫g and ∫(cf) = c∫f', 'It gives polynomials', 'It\'s the inverse of d/dx', 'It maps to ℝ'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Integration is linear: respects sums and scalar multiples.'
  },
  {
    id: 'ch08-q7',
    question: 'The matrix of T relative to basis B has columns that are:',
    options: ['The basis vectors', 'T(basis vectors) in coordinates relative to B', 'Eigenvalues', 'Random'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Column j is [T(vⱼ)]_B, coordinates of T(vⱼ) in basis B.'
  },
  {
    id: 'ch08-q8',
    question: 'An isomorphism is a linear transformation that is:',
    options: ['Only 1-1', 'Only onto', '1-1 and onto (bijective)', 'Neither 1-1 nor onto'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Isomorphism = bijective linear map = invertible.'
  },
  {
    id: 'ch08-q9',
    question: 'dim(V) = dim(W) and T: V → W is 1-1 implies T is:',
    options: ['Not onto', 'Onto', 'Not linear', 'Zero'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'By rank-nullity: 1-1 means nullity = 0, so rank = dim(V) = dim(W), hence onto.'
  },
  {
    id: 'ch08-q10',
    question: 'Jordan form is used when a matrix is:',
    options: ['Diagonalizable', 'Not diagonalizable', 'Symmetric', 'Orthogonal'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Jordan form generalizes diagonalization for non-diagonalizable matrices.'
  }
];
