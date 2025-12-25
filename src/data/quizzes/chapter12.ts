// Chapter 12: Linear Algebra in Probability and Statistics (Sections 48-50)
import type { QuizQuestion } from './types';

// Section 48: Mean, Variance, and Probability
export const section48Quiz: QuizQuestion[] = [
  {
    id: 's48-q1',
    question: 'The mean of a random variable X is also called:',
    options: ['Variance', 'Expected value E[X]', 'Standard deviation', 'Mode'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Mean = expected value = μ = E[X].'
  },
  {
    id: 's48-q2',
    question: 'Variance Var(X) measures:',
    options: ['The center', 'The spread (average squared deviation)', 'The maximum', 'The minimum'],
    correctIndex: 1,
    difficulty: 'easy',
    explanation: 'Var(X) = E[(X - μ)²] = E[X²] - (E[X])².'
  },
  {
    id: 's48-q3',
    question: 'For independent X and Y, Var(X + Y) = :',
    options: ['Var(X) + Var(Y)', 'Var(X) - Var(Y)', 'Var(X) × Var(Y)', 'Var(X)/Var(Y)'],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Variances add for independent random variables.'
  },
  {
    id: 's48-q4',
    question: 'The covariance Cov(X,Y) is positive when:',
    options: ['X and Y move in opposite directions', 'X and Y move together', 'X and Y are independent', 'X = Y'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Positive covariance: X high when Y high (and vice versa).'
  }
];

// Section 49: Covariance Matrices and Joint Distributions
export const section49Quiz: QuizQuestion[] = [
  {
    id: 's49-q1',
    question: 'The covariance matrix Σ is always:',
    options: ['Diagonal', 'Symmetric positive semidefinite', 'Orthogonal', 'Upper triangular'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Σ = E[(X - μ)(X - μ)ᵀ] is symmetric and PSD.'
  },
  {
    id: 's49-q2',
    question: 'The diagonal entries of the covariance matrix are:',
    options: ['Covariances', 'Means', 'Variances', 'Correlations'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'Σᵢᵢ = Var(Xᵢ), diagonal = individual variances.'
  },
  {
    id: 's49-q3',
    question: 'Correlation coefficient ρ is between:',
    options: ['0 and 1', '-∞ and +∞', '-1 and +1', '0 and +∞'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'ρ = Cov(X,Y)/(σₓσᵧ), always -1 ≤ ρ ≤ 1.'
  },
  {
    id: 's49-q4',
    question: 'For a linear transformation Y = AX, the covariance of Y is:',
    options: ['AΣ', 'ΣA', 'AΣAᵀ', 'AᵀΣA'],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'Cov(AX) = A Cov(X) Aᵀ = AΣAᵀ.'
  }
];

// Section 50: Multivariate Normal and Applications
export const section50Quiz: QuizQuestion[] = [
  {
    id: 's50-q1',
    question: 'The multivariate normal is characterized by:',
    options: ['Mean only', 'Variance only', 'Mean vector μ and covariance matrix Σ', 'Just the dimension'],
    correctIndex: 2,
    difficulty: 'easy',
    explanation: 'N(μ, Σ): mean μ and covariance Σ fully describe it.'
  },
  {
    id: 's50-q2',
    question: 'In linear regression, the normal equations are:',
    options: ['Ax = b', 'XᵀXβ = Xᵀy', 'β = y/X', 'Xβ = y exactly'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Least squares: XᵀXβ̂ = Xᵀy minimizes ||y - Xβ||².'
  },
  {
    id: 's50-q3',
    question: 'Principal components are eigenvectors of:',
    options: ['The data matrix', 'The covariance matrix', 'The mean vector', 'The identity'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'PCA: eigenvectors of Σ give principal directions.'
  },
  {
    id: 's50-q4',
    question: 'The first principal component captures:',
    options: ['Minimum variance', 'Maximum variance direction', 'Zero variance', 'Mean'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'PC1 = direction of largest variance (top eigenvector).'
  },
  {
    id: 's50-q5',
    question: 'Machine learning feature extraction often uses:',
    options: ['Only raw features', 'PCA or SVD for dimensionality reduction', 'Random projection', 'No preprocessing'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'SVD/PCA reduce dimensions while preserving variance.'
  }
];

// Chapter 12 Comprehensive Quiz
export const chapter12Quiz: QuizQuestion[] = [
  {
    id: 'ch12-q1',
    question: 'The sample covariance matrix from data matrix X (centered) is:',
    options: ['XXᵀ', 'XᵀX/(n-1)', 'X + Xᵀ', 'X⁻¹'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'S = XᵀX/(n-1) for centered data (n samples).'
  },
  {
    id: 'ch12-q2',
    question: 'If Σ is singular, the distribution is:',
    options: ['Non-existent', 'Degenerate (lower-dimensional)', 'Uniform', 'Discrete'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Singular Σ means data lies in a lower-dimensional subspace.'
  },
  {
    id: 'ch12-q3',
    question: 'The variance explained by top k principal components equals:',
    options: ['k', 'Sum of top k eigenvalues / sum of all eigenvalues', 'Product of eigenvalues', 'k/n'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: '(λ₁ + ... + λₖ)/(λ₁ + ... + λₙ) = fraction of variance.'
  },
  {
    id: 'ch12-q4',
    question: 'In ridge regression, we minimize ||y - Xβ||² + :',
    options: ['||β||', 'λ||β||²', '||X||', '0'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Ridge: add λ||β||² penalty for regularization.'
  },
  {
    id: 'ch12-q5',
    question: 'For uncorrelated variables, the covariance matrix is:',
    options: ['Identity', 'Zero', 'Diagonal', 'Full rank'],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Uncorrelated: Cov(Xᵢ, Xⱼ) = 0 for i ≠ j, so Σ is diagonal.'
  },
  {
    id: 'ch12-q6',
    question: 'The Mahalanobis distance uses:',
    options: ['Identity matrix', 'Covariance matrix inverse Σ⁻¹', 'Mean vector', 'Standard deviation'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'd² = (x-μ)ᵀΣ⁻¹(x-μ) accounts for correlation.'
  },
  {
    id: 'ch12-q7',
    question: 'Linear discriminant analysis (LDA) finds directions that:',
    options: ['Maximize within-class variance', 'Maximize between-class / within-class variance', 'Minimize all variance', 'Random directions'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'LDA: maximize separation between classes.'
  },
  {
    id: 'ch12-q8',
    question: 'The best linear predictor of Y given X is:',
    options: ['E[Y]', 'E[Y] + Cov(Y,X)Var(X)⁻¹(X - E[X])', 'Cov(X,Y)', 'Var(Y)'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Linear regression formula using covariance.'
  },
  {
    id: 'ch12-q9',
    question: 'Whitening transforms data to have covariance:',
    options: ['Zero matrix', 'Identity matrix', 'Diagonal matrix', 'Original Σ'],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Whitening: W = Σ^(-1/2) gives WXWᵀ = I.'
  },
  {
    id: 'ch12-q10',
    question: 'Factor analysis assumes data X = :',
    options: ['μ + noise', 'Lf + noise (low-rank + noise)', 'Random', 'Exactly low-rank'],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'X = μ + Lf + ε: latent factors f, loadings L, noise ε.'
  }
];
