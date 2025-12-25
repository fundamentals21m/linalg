// Chapter 10: Applications (Sections 38-44)
import type { QuizQuestion } from './types';

// Section 38: Graphs and Networks
export const section38Quiz: QuizQuestion[] = [
  {
    id: 's38-q1',
    question: 'The incidence matrix of a graph has rows for:',
    options: ['Edges', 'Nodes', 'Paths', 'Cycles'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'Each row represents an edge, columns represent nodes.'
  },
  {
    id: 's38-q2',
    question: 'The null space of the incidence matrix contains:',
    options: ['Edge flows', 'Node potentials (up to a constant)', 'Shortest paths', 'Cycles'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Ax = 0 when all nodes have equal potential (constant vector).'
  },
  {
    id: 's38-q3',
    question: 'Kirchhoff\'s Current Law says currents sum to zero at:',
    options: ['Edges', 'Nodes', 'The boundary', 'Cycles'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Current in = current out at every node (conservation).'
  },
  {
    id: 's38-q4',
    question: 'The number of independent loops in a connected graph with n nodes and m edges is:',
    options: ['n - 1', 'm - n + 1', 'm + n', 'n'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Loops = m - n + 1 (Euler\'s formula for graphs).'
  }
];

// Section 39: Markov Matrices
export const section39Quiz: QuizQuestion[] = [
  {
    id: 's39-q1',
    question: 'A Markov matrix has columns that:',
    options: ['Sum to 0', 'Sum to 1', 'Are orthogonal', 'Are unit vectors'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Columns are probability distributions: non-negative, sum to 1.'
  },
  {
    id: 's39-q2',
    question: 'Every Markov matrix has eigenvalue:',
    options: ['0', '-1', '1', '2'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'λ = 1 always (eigenvector is steady state distribution).'
  },
  {
    id: 's39-q3',
    question: 'The steady state satisfies:',
    options: ['Ax = 0', 'Ax = x', 'Ax = 2x', 'A²x = x'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Steady state x satisfies Ax = x (eigenvalue 1).'
  },
  {
    id: 's39-q4',
    question: 'For a positive Markov matrix, Aᵏ converges to:',
    options: ['Zero matrix', 'Identity', 'Rank-1 matrix (steady state × ones)', 'Diagonal matrix'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'All columns converge to the steady state eigenvector.'
  }
];

// Section 40: Linear Programming
export const section40Quiz: QuizQuestion[] = [
  {
    id: 's40-q1',
    question: 'Linear programming optimizes a linear objective subject to:',
    options: ['Quadratic constraints', 'Linear inequality constraints', 'No constraints', 'Equality constraints only'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'LP: minimize cᵀx subject to Ax ≤ b, x ≥ 0.'
  },
  {
    id: 's40-q2',
    question: 'The feasible region of an LP is:',
    options: ['A sphere', 'A polyhedron (polytope)', 'A line', 'A hyperboloid'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Linear inequalities create a convex polytope.'
  },
  {
    id: 's40-q3',
    question: 'The optimal solution of an LP (if bounded) occurs at:',
    options: ['The center', 'A vertex (corner)', 'An edge', 'Any point'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Optimum is at a vertex of the feasible polytope.'
  },
  {
    id: 's40-q4',
    question: 'The simplex method moves along:',
    options: ['Random directions', 'Edges of the polytope', 'The interior', 'Diagonals'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Simplex walks along edges from vertex to vertex.'
  }
];

// Section 41: Fourier Series
export const section41Quiz: QuizQuestion[] = [
  {
    id: 's41-q1',
    question: 'Fourier series represents functions as sums of:',
    options: ['Polynomials', 'Exponentials', 'Sines and cosines', 'Step functions'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'f(x) = a₀ + Σ(aₙcos(nx) + bₙsin(nx)).'
  },
  {
    id: 's41-q2',
    question: 'The functions sin(nx) and sin(mx) for n ≠ m are:',
    options: ['Parallel', 'Orthogonal', 'Equal', 'Opposite'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: '∫sin(nx)sin(mx)dx = 0 for n ≠ m (orthogonality).'
  },
  {
    id: 's41-q3',
    question: 'Fourier coefficients are found using:',
    options: ['Derivatives', 'Inner products (integrals)', 'Matrix inversion', 'Eigenvalues'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'aₙ = (2/π)∫f(x)cos(nx)dx, projection onto basis.'
  },
  {
    id: 's41-q4',
    question: 'Parseval\'s theorem relates energy in time domain to:',
    options: ['Energy in frequency domain', 'Phase', 'Amplitude only', 'Nothing'],
    correctIndex: 0,
    difficulty: 'hard',
    explanation: '∫|f|² = Σ|coefficients|² (energy conservation).'
  }
];

// Section 42: Computer Graphics
export const section42Quiz: QuizQuestion[] = [
  {
    id: 's42-q1',
    question: '2D rotation by θ is represented by matrix:',
    options: ['[[θ, 0], [0, θ]]', '[[cos θ, -sin θ], [sin θ, cos θ]]', '[[1, θ], [0, 1]]', '[[θ, 1], [1, θ]]'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Rotation matrix preserves lengths and rotates by θ.'
  },
  {
    id: 's42-q2',
    question: 'Homogeneous coordinates use dimension:',
    options: ['n', 'n - 1', 'n + 1', '2n'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: '(x, y) becomes (x, y, 1) to allow translation as matrix.'
  },
  {
    id: 's42-q3',
    question: 'Translation in 2D using 3×3 homogeneous matrix looks like:',
    options: ['[[1,0,tx],[0,1,ty],[0,0,1]]', '[[tx,0,0],[0,ty,0],[0,0,1]]', '[[1,tx,0],[ty,1,0],[0,0,1]]', '[[tx,ty,1],[0,0,0],[0,0,0]]'],
    correctIndex: 0,
    difficulty: 'hard',
    explanation: 'Translation matrix has offset in the last column.'
  },
  {
    id: 's42-q4',
    question: 'Composing transformations A then B gives:',
    options: ['A + B', 'AB', 'BA', 'A - B'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Apply A first, then B: result is BA (right to left).'
  }
];

// Section 43: Cryptography
export const section43Quiz: QuizQuestion[] = [
  {
    id: 's43-q1',
    question: 'The Hill cipher encrypts using:',
    options: ['Addition mod 26', 'Matrix multiplication mod 26', 'XOR', 'Substitution'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Ciphertext = A × plaintext (mod 26).'
  },
  {
    id: 's43-q2',
    question: 'For the Hill cipher, the key matrix must be:',
    options: ['Symmetric', 'Orthogonal', 'Invertible mod 26', 'Diagonal'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Need A⁻¹ (mod 26) to exist for decryption.'
  },
  {
    id: 's43-q3',
    question: 'RSA encryption relies on the difficulty of:',
    options: ['Matrix inversion', 'Factoring large numbers', 'Solving linear systems', 'Computing eigenvalues'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'RSA security: hard to factor n = pq for large primes.'
  },
  {
    id: 's43-q4',
    question: 'Public-key cryptography uses:',
    options: ['Same key for encryption and decryption', 'Different keys for encryption and decryption', 'No keys', 'Random keys each time'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Public key encrypts, private key decrypts (asymmetric).'
  }
];

// Section 44: Image Processing
export const section44Quiz: QuizQuestion[] = [
  {
    id: 's44-q1',
    question: 'A grayscale image can be represented as:',
    options: ['A vector', 'A matrix of pixel intensities', 'A single number', 'A complex number'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Image = m×n matrix where entries are pixel values.'
  },
  {
    id: 's44-q2',
    question: 'Image compression via SVD keeps:',
    options: ['All singular values', 'Only the largest k singular values', 'Only the smallest singular values', 'Random singular values'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Low-rank approximation: keep top k singular values/vectors.'
  },
  {
    id: 's44-q3',
    question: 'Blurring an image is equivalent to:',
    options: ['Matrix addition', 'Convolution with a smoothing kernel', 'Taking the inverse', 'Computing eigenvalues'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Blur = convolution with averaging or Gaussian kernel.'
  },
  {
    id: 's44-q4',
    question: 'Edge detection uses kernels that approximate:',
    options: ['Integration', 'Derivatives (gradients)', 'Fourier transform', 'Identity'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Edges = high gradient; Sobel/Laplacian detect derivatives.'
  }
];

// Chapter 10 Comprehensive Quiz
export const chapter10Quiz: QuizQuestion[] = [
  {
    id: 'ch10-q1',
    question: 'In a graph, the left null space of incidence matrix A represents:',
    options: ['Spanning trees', 'Cycle flows', 'Node degrees', 'Shortest paths'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'yᵀA = 0 gives flows around cycles (Kirchhoff\'s Voltage Law).'
  },
  {
    id: 'ch10-q2',
    question: 'All eigenvalues of a Markov matrix satisfy:',
    options: ['|λ| ≤ 1', '|λ| = 1', 'λ > 1', 'λ < 0'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Markov eigenvalues have |λ| ≤ 1; λ = 1 is always present.'
  },
  {
    id: 'ch10-q3',
    question: 'The dual of a linear program relates to:',
    options: ['A different LP with transposed constraints', 'A quadratic program', 'An integer program', 'A nonlinear program'],
    correctIndex: 0,
    difficulty: 'hard',
    explanation: 'Primal and dual LPs have related optimal values.'
  },
  {
    id: 'ch10-q4',
    question: 'Fourier series uses which type of basis?',
    options: ['Polynomial', 'Orthogonal (trigonometric)', 'Standard', 'Random'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Sines and cosines form an orthogonal basis for functions.'
  },
  {
    id: 'ch10-q5',
    question: 'Scaling by factor s in 2D has matrix:',
    options: ['[[s, 0], [0, s]]', '[[1, s], [s, 1]]', '[[s, s], [0, 0]]', '[[0, s], [s, 0]]'],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'Uniform scaling: sI = [[s, 0], [0, s]].'
  },
  {
    id: 'ch10-q6',
    question: 'In Hill cipher, gcd(det(A), 26) must equal:',
    options: ['0', '1', '2', '26'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'det(A) must be coprime to 26 for A⁻¹ (mod 26) to exist.'
  },
  {
    id: 'ch10-q7',
    question: 'SVD image compression stores O(k(m+n)) instead of:',
    options: ['O(m+n)', 'O(mn)', 'O(k)', 'O(1)'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Full image: O(mn). Rank-k SVD: O(k(m+n)), huge savings.'
  },
  {
    id: 'ch10-q8',
    question: 'The Google PageRank uses:',
    options: ['Symmetric matrices', 'Markov matrices', 'Orthogonal matrices', 'Diagonal matrices'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'PageRank is the steady state of a Markov chain.'
  },
  {
    id: 'ch10-q9',
    question: 'Shearing transformation has matrix:',
    options: ['[[1, k], [0, 1]]', '[[k, 0], [0, k]]', '[[0, 1], [1, 0]]', '[[k, k], [k, k]]'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Shear: [[1, k], [0, 1]] shifts x by ky, keeps y.'
  },
  {
    id: 'ch10-q10',
    question: 'The Gibbs phenomenon in Fourier series refers to:',
    options: ['Perfect convergence', 'Overshoot near discontinuities', 'Undershoot everywhere', 'Zero coefficients'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Fourier series overshoots by ~9% at jump discontinuities.'
  }
];
