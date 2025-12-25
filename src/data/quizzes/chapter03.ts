// Chapter 3: Vector Spaces and Subspaces (Sections 11-15)
// Curriculum: 3.1-3.5 from Strang's Linear Algebra
import type { QuizQuestion } from './types';

// Section 11: Spaces of Vectors (3.1)
export const section11Quiz: QuizQuestion[] = [
  {
    id: 's11-q1',
    question: 'Which is a vector space?',
    options: ['All vectors with positive components', 'ℝⁿ', 'Vectors with integer components only', 'The empty set'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'ℝⁿ satisfies all vector space axioms. The others fail closure under scalar multiplication or addition.'
  },
  {
    id: 's11-q2',
    question: 'A subspace must contain:',
    options: ['At least two vectors', 'The zero vector', 'Only unit vectors', 'Exactly n vectors'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Every subspace contains 0 (it\'s closed under scalar multiplication by 0).'
  },
  {
    id: 's11-q3',
    question: 'The column space of A contains all vectors that can be written as:',
    options: ['Ax for some x', 'xᵀA for some x', 'Solutions to Ax = 0', 'Rows of A'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'C(A) = {Ax : x ∈ ℝⁿ} = all linear combinations of columns of A.'
  },
  {
    id: 's11-q4',
    question: 'Which is NOT a subspace of ℝ³?',
    options: ['A plane through the origin', 'A line through the origin', 'The zero vector alone', 'A plane not through the origin'],
    correctIndex: 3,
    difficulty: 'medium',
    explanation: 'A plane not through origin doesn\'t contain 0, so it\'s not a subspace.'
  },
  {
    id: 's11-q5',
    question: 'The row space of A is the column space of:',
    options: ['A⁻¹', 'Aᵀ', 'A²', '-A'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Row space = C(Aᵀ) since the rows of A become columns of Aᵀ.'
  }
];

// Section 12: The Nullspace of A (3.2)
export const section12Quiz: QuizQuestion[] = [
  {
    id: 's12-q1',
    question: 'The null space of A consists of all solutions to:',
    options: ['Ax = b', 'Ax = 0', 'xA = 0', 'A = 0'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'N(A) = {x : Ax = 0}, the set of all solutions to the homogeneous equation.'
  },
  {
    id: 's12-q2',
    question: 'The null space is always a:',
    options: ['Subspace', 'Full space ℝⁿ', 'Single vector', 'Empty set'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'N(A) is a subspace of ℝⁿ (contains 0, closed under addition and scalar multiplication).'
  },
  {
    id: 's12-q3',
    question: 'If A is invertible, its null space contains:',
    options: ['Infinitely many vectors', 'All of ℝⁿ', 'Only the zero vector', 'No vectors'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Invertible A means Ax = 0 has only x = 0 as solution.'
  },
  {
    id: 's12-q4',
    question: 'Free variables in Ax = 0 correspond to:',
    options: ['Pivot columns', 'Non-pivot columns', 'Rows of A', 'Zero rows'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Free variables come from columns without pivots; they can take any value.'
  },
  {
    id: 's12-q5',
    question: 'The dimension of the null space is called the:',
    options: ['Rank', 'Nullity', 'Trace', 'Determinant'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Nullity = dim(N(A)) = number of free variables = n - rank.'
  }
];

// Section 13: The Complete Solution to Ax = b (3.3)
export const section13Quiz: QuizQuestion[] = [
  {
    id: 's13-q1',
    question: 'The complete solution to Ax = b is written as:',
    options: ['xₚ only', 'xₙ only', 'x = xₚ + xₙ', 'x = xₚ × xₙ'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Complete solution = particular solution + any null space vector: x = xₚ + xₙ.'
  },
  {
    id: 's13-q2',
    question: 'A particular solution xₚ satisfies:',
    options: ['Axₚ = 0', 'Axₚ = b', 'xₚ = 0', 'xₚ is in N(A)'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'A particular solution is any specific solution to Ax = b.'
  },
  {
    id: 's13-q3',
    question: 'If adding any null space vector to xₚ still solves Ax = b, this is because:',
    options: ['A(xₙ) = b', 'A(xₙ) = 0', 'xₚ = 0', 'N(A) is empty'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'A(xₚ + xₙ) = Axₚ + Axₙ = b + 0 = b.'
  },
  {
    id: 's13-q4',
    question: 'For Ax = b to have a solution, b must be in:',
    options: ['N(A)', 'C(A) (column space)', 'Row space', 'N(Aᵀ)'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Ax = b solvable ⟺ b is a linear combination of columns ⟺ b ∈ C(A).'
  },
  {
    id: 's13-q5',
    question: 'If rank(A) = rank([A|b]), then Ax = b:',
    options: ['Has no solution', 'Has a unique solution', 'Is consistent (has at least one solution)', 'Has exactly rank solutions'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'Equal ranks means b is in the column space of A, so a solution exists.'
  }
];

// Section 14: Independence, Basis and Dimension (3.4)
export const section14Quiz: QuizQuestion[] = [
  {
    id: 's14-q1',
    question: 'Vectors v₁, v₂, ..., vₖ are linearly independent if:',
    options: ['c₁v₁ + ... + cₖvₖ = 0 has only the trivial solution', 'They span ℝⁿ', 'They are orthogonal', 'k = n'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'Independence means the only linear combination giving 0 has all coefficients = 0.'
  },
  {
    id: 's14-q2',
    question: 'A basis for a subspace V is a set that:',
    options: ['Spans V only', 'Is independent only', 'Spans V and is independent', 'Contains all vectors of V'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'A basis must both span the space and be linearly independent.'
  },
  {
    id: 's14-q3',
    question: 'The dimension of a subspace equals:',
    options: ['The number of vectors in any spanning set', 'The number of vectors in a basis', 'The number of equations', 'n'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Dimension = number of vectors in any basis (all bases have the same size).'
  },
  {
    id: 's14-q4',
    question: 'If a set has more vectors than the dimension of the space, the vectors are:',
    options: ['Independent', 'Dependent', 'Orthogonal', 'A basis'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'More vectors than dimension ⟹ at least one vector is a combination of others.'
  },
  {
    id: 's14-q5',
    question: 'The pivot columns of A form a basis for:',
    options: ['N(A)', 'C(A)', 'Row space', 'ℝⁿ'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Pivot columns are independent and span the column space.'
  }
];

// Section 15: Dimensions of the Four Subspaces (3.5)
export const section15Quiz: QuizQuestion[] = [
  {
    id: 's15-q1',
    question: 'The four fundamental subspaces are C(A), N(A), C(Aᵀ), and:',
    options: ['C(A⁻¹)', 'N(Aᵀ)', 'R(A)', 'S(A)'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'The four subspaces: column space, null space, row space, and left null space N(Aᵀ).'
  },
  {
    id: 's15-q2',
    question: 'The rank of a matrix equals:',
    options: ['Number of rows', 'Number of columns', 'Number of pivots', 'Number of entries'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Rank = number of pivots = dim(C(A)) = dim(C(Aᵀ)).'
  },
  {
    id: 's15-q3',
    question: 'If rank(A) = r for an m×n matrix, the null space has dimension:',
    options: ['r', 'm - r', 'n - r', 'm'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'The rank-nullity theorem: dim(N(A)) = n - r.'
  },
  {
    id: 's15-q4',
    question: 'The left null space N(Aᵀ) has dimension:',
    options: ['r', 'n - r', 'm - r', 'n'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'N(Aᵀ) is in ℝᵐ and dim(N(Aᵀ)) = m - r.'
  },
  {
    id: 's15-q5',
    question: 'For a 5×7 matrix of rank 3, dim(N(A)) equals:',
    options: ['2', '3', '4', '5'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'dim(N(A)) = n - r = 7 - 3 = 4.'
  }
];

// Chapter 3 Comprehensive Quiz
export const chapter03Quiz: QuizQuestion[] = [
  {
    id: 'ch03-q1',
    question: 'Which is required for a set to be a subspace?',
    options: ['Contains only positive vectors', 'Contains exactly n vectors', 'Closed under addition and scalar multiplication', 'Contains the vector (1,1,...,1)'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'A subspace must be closed under addition and scalar multiplication (and contain 0).'
  },
  {
    id: 'ch03-q2',
    question: 'The intersection of two subspaces is:',
    options: ['Never a subspace', 'Always a subspace', 'A subspace only if they\'re equal', 'Empty'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'The intersection of any subspaces is also a subspace.'
  },
  {
    id: 'ch03-q3',
    question: 'For A (m×n), if rank(A) = n, then N(A) = :',
    options: ['ℝⁿ', '{0}', 'ℝᵐ', 'C(A)'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Full column rank means no free variables, so only x = 0 solves Ax = 0.'
  },
  {
    id: 'ch03-q4',
    question: 'The rank-nullity theorem states:',
    options: ['rank + nullity = m', 'rank + nullity = n', 'rank × nullity = n', 'rank = nullity'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'For an m×n matrix: rank(A) + dim(N(A)) = n.'
  },
  {
    id: 'ch03-q5',
    question: 'The four fundamental subspaces are related to matrix A and:',
    options: ['A⁻¹', 'Aᵀ', 'A²', 'A + I'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'The four subspaces: C(A), N(A), C(Aᵀ), N(Aᵀ).'
  },
  {
    id: 'ch03-q6',
    question: 'If Ax = b is inconsistent, then b is:',
    options: ['In the null space of A', 'In the column space of A', 'Not in the column space of A', 'Zero'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Ax = b solvable ⟺ b ∈ C(A). Inconsistent means b ∉ C(A).'
  },
  {
    id: 'ch03-q7',
    question: 'Special solutions to Ax = 0 form a:',
    options: ['Basis for C(A)', 'Basis for N(A)', 'Basis for ℝⁿ', 'Single vector'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Setting each free variable to 1 (others to 0) gives basis vectors for N(A).'
  },
  {
    id: 'ch03-q8',
    question: 'The row space of A has the same dimension as:',
    options: ['N(A)', 'C(A)', 'N(Aᵀ)', 'ℝᵐ'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'dim(row space) = dim(column space) = rank(A).'
  },
  {
    id: 'ch03-q9',
    question: 'A matrix is full rank if:',
    options: ['rank = 0', 'rank = max(m,n)', 'rank = min(m,n)', 'rank = m + n'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Full rank means rank equals the smaller dimension: min(m, n).'
  },
  {
    id: 'ch03-q10',
    question: 'The column space and left null space are:',
    options: ['Equal', 'Orthogonal complements in ℝᵐ', 'The same dimension', 'Both subspaces of ℝⁿ'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'C(A) and N(Aᵀ) are orthogonal complements: C(A) ⊕ N(Aᵀ) = ℝᵐ.'
  }
];
