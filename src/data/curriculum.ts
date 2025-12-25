// =============================================================================
// CURRICULUM STRUCTURE
// =============================================================================
// Based on Gilbert Strang's "Introduction to Linear Algebra" (5th Edition)
// =============================================================================

/**
 * Individual section within a part
 */
export interface Section {
  id: number;
  title: string;
  slug: string;
  description: string;
}

/**
 * Part containing multiple sections
 */
export interface Part {
  id: number;
  title: string;
  slug: string;
  sections: Section[];
}

/**
 * Complete curriculum structure
 */
export const curriculum: Part[] = [
  // ==========================================================================
  // CHAPTER 1: Introduction to Vectors
  // ==========================================================================
  {
    id: 1,
    title: 'Introduction to Vectors',
    slug: 'introduction-to-vectors',
    sections: [
      {
        id: 1,
        title: '1.1 Vectors and Linear Combinations',
        slug: 'vectors-and-linear-combinations',
        description: 'The basic operations of adding vectors and multiplying by scalars.',
      },
      {
        id: 2,
        title: '1.2 Lengths and Dot Products',
        slug: 'lengths-and-dot-products',
        description: 'Computing lengths and angles using the dot product.',
      },
      {
        id: 3,
        title: '1.3 Matrices',
        slug: 'matrices',
        description: 'Introduction to matrices and matrix-vector multiplication.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 2: Solving Linear Equations
  // ==========================================================================
  {
    id: 2,
    title: 'Solving Linear Equations',
    slug: 'solving-linear-equations',
    sections: [
      {
        id: 4,
        title: '2.1 Vectors and Linear Equations',
        slug: 'vectors-and-linear-equations',
        description: 'The row and column pictures of linear systems.',
      },
      {
        id: 5,
        title: '2.2 The Idea of Elimination',
        slug: 'idea-of-elimination',
        description: 'Gaussian elimination to solve systems of equations.',
      },
      {
        id: 6,
        title: '2.3 Elimination Using Matrices',
        slug: 'elimination-using-matrices',
        description: 'Matrix notation for elimination steps.',
      },
      {
        id: 7,
        title: '2.4 Rules for Matrix Operations',
        slug: 'rules-for-matrix-operations',
        description: 'Matrix multiplication and its properties.',
      },
      {
        id: 8,
        title: '2.5 Inverse Matrices',
        slug: 'inverse-matrices',
        description: 'Finding and using the inverse of a matrix.',
      },
      {
        id: 9,
        title: '2.6 Elimination = Factorization: A = LU',
        slug: 'lu-factorization',
        description: 'LU decomposition and its applications.',
      },
      {
        id: 10,
        title: '2.7 Transposes and Permutations',
        slug: 'transposes-and-permutations',
        description: 'Transpose matrices and row exchanges.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 3: Vector Spaces and Subspaces
  // ==========================================================================
  {
    id: 3,
    title: 'Vector Spaces and Subspaces',
    slug: 'vector-spaces-and-subspaces',
    sections: [
      {
        id: 11,
        title: '3.1 Spaces of Vectors',
        slug: 'spaces-of-vectors',
        description: 'Definition and examples of vector spaces.',
      },
      {
        id: 12,
        title: '3.2 The Nullspace of A',
        slug: 'nullspace',
        description: 'Solving Ax = 0 and Rx = 0.',
      },
      {
        id: 13,
        title: '3.3 The Complete Solution to Ax = b',
        slug: 'complete-solution',
        description: 'Particular and homogeneous solutions.',
      },
      {
        id: 14,
        title: '3.4 Independence, Basis and Dimension',
        slug: 'independence-basis-dimension',
        description: 'Linear independence and spanning sets.',
      },
      {
        id: 15,
        title: '3.5 Dimensions of the Four Subspaces',
        slug: 'four-subspaces',
        description: 'Column space, row space, nullspace, and left nullspace.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 4: Orthogonality
  // ==========================================================================
  {
    id: 4,
    title: 'Orthogonality',
    slug: 'orthogonality',
    sections: [
      {
        id: 16,
        title: '4.1 Orthogonality of the Four Subspaces',
        slug: 'orthogonality-subspaces',
        description: 'Perpendicular subspaces and orthogonal complements.',
      },
      {
        id: 17,
        title: '4.2 Projections',
        slug: 'projections',
        description: 'Projecting onto lines and planes.',
      },
      {
        id: 18,
        title: '4.3 Least Squares Approximations',
        slug: 'least-squares',
        description: 'Best-fit solutions when Ax = b has no solution.',
      },
      {
        id: 19,
        title: '4.4 Orthonormal Bases and Gram-Schmidt',
        slug: 'gram-schmidt',
        description: 'Creating orthonormal bases and QR factorization.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 5: Determinants
  // ==========================================================================
  {
    id: 5,
    title: 'Determinants',
    slug: 'determinants',
    sections: [
      {
        id: 20,
        title: '5.1 The Properties of Determinants',
        slug: 'properties-of-determinants',
        description: 'The three defining properties and their consequences.',
      },
      {
        id: 21,
        title: '5.2 Permutations and Cofactors',
        slug: 'permutations-and-cofactors',
        description: 'Computing determinants by cofactor expansion.',
      },
      {
        id: 22,
        title: '5.3 Cramer\'s Rule, Inverses, and Volumes',
        slug: 'cramers-rule',
        description: 'Applications of determinants to solving systems.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 6: Eigenvalues and Eigenvectors
  // ==========================================================================
  {
    id: 6,
    title: 'Eigenvalues and Eigenvectors',
    slug: 'eigenvalues-and-eigenvectors',
    sections: [
      {
        id: 23,
        title: '6.1 Introduction to Eigenvalues',
        slug: 'introduction-to-eigenvalues',
        description: 'Finding eigenvalues and eigenvectors.',
      },
      {
        id: 24,
        title: '6.2 Diagonalizing a Matrix',
        slug: 'diagonalizing-a-matrix',
        description: 'When and how matrices can be diagonalized.',
      },
      {
        id: 25,
        title: '6.3 Systems of Differential Equations',
        slug: 'systems-of-differential-equations',
        description: 'Using eigenvalues to solve differential equations.',
      },
      {
        id: 26,
        title: '6.4 Symmetric Matrices',
        slug: 'symmetric-matrices',
        description: 'Special properties of symmetric matrices.',
      },
      {
        id: 27,
        title: '6.5 Positive Definite Matrices',
        slug: 'positive-definite-matrices',
        description: 'Tests for positive definiteness.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 7: The Singular Value Decomposition (SVD)
  // ==========================================================================
  {
    id: 7,
    title: 'The Singular Value Decomposition (SVD)',
    slug: 'singular-value-decomposition',
    sections: [
      {
        id: 28,
        title: '7.1 Image Processing by Linear Algebra',
        slug: 'image-processing',
        description: 'Applications of linear algebra to images.',
      },
      {
        id: 29,
        title: '7.2 Bases and Matrices in the SVD',
        slug: 'bases-and-matrices-svd',
        description: 'Understanding the SVD factorization.',
      },
      {
        id: 30,
        title: '7.3 Principal Component Analysis (PCA)',
        slug: 'pca',
        description: 'Dimensionality reduction with PCA.',
      },
      {
        id: 31,
        title: '7.4 The Geometry of the SVD',
        slug: 'geometry-of-svd',
        description: 'Geometric interpretation of singular values.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 8: Linear Transformations
  // ==========================================================================
  {
    id: 8,
    title: 'Linear Transformations',
    slug: 'linear-transformations',
    sections: [
      {
        id: 32,
        title: '8.1 The Idea of a Linear Transformation',
        slug: 'idea-of-linear-transformation',
        description: 'What makes a transformation linear.',
      },
      {
        id: 33,
        title: '8.2 The Matrix of a Linear Transformation',
        slug: 'matrix-of-transformation',
        description: 'Representing transformations as matrices.',
      },
      {
        id: 34,
        title: '8.3 The Search for a Good Basis',
        slug: 'search-for-good-basis',
        description: 'Change of basis and similar matrices.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 9: Complex Vectors and Matrices
  // ==========================================================================
  {
    id: 9,
    title: 'Complex Vectors and Matrices',
    slug: 'complex-vectors-and-matrices',
    sections: [
      {
        id: 35,
        title: '9.1 Complex Numbers',
        slug: 'complex-numbers',
        description: 'Review of complex arithmetic.',
      },
      {
        id: 36,
        title: '9.2 Hermitian and Unitary Matrices',
        slug: 'hermitian-and-unitary',
        description: 'Complex analogues of symmetric and orthogonal matrices.',
      },
      {
        id: 37,
        title: '9.3 The Fast Fourier Transform',
        slug: 'fast-fourier-transform',
        description: 'The FFT algorithm and its applications.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 10: Applications
  // ==========================================================================
  {
    id: 10,
    title: 'Applications',
    slug: 'applications',
    sections: [
      {
        id: 38,
        title: '10.1 Graphs and Networks',
        slug: 'graphs-and-networks',
        description: 'Linear algebra in graph theory.',
      },
      {
        id: 39,
        title: '10.2 Matrices in Engineering',
        slug: 'matrices-in-engineering',
        description: 'Structural analysis and finite elements.',
      },
      {
        id: 40,
        title: '10.3 Markov Matrices, Population, and Economics',
        slug: 'markov-matrices',
        description: 'Probability and steady states.',
      },
      {
        id: 41,
        title: '10.4 Linear Programming',
        slug: 'linear-programming',
        description: 'Optimization with linear constraints.',
      },
      {
        id: 42,
        title: '10.5 Fourier Series: Linear Algebra for Functions',
        slug: 'fourier-series',
        description: 'Function spaces and orthogonality.',
      },
      {
        id: 43,
        title: '10.6 Computer Graphics',
        slug: 'computer-graphics',
        description: 'Transformations in 2D and 3D graphics.',
      },
      {
        id: 44,
        title: '10.7 Linear Algebra for Cryptography',
        slug: 'linear-algebra-cryptography',
        description: 'Encryption and coding theory.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 11: Numerical Linear Algebra
  // ==========================================================================
  {
    id: 11,
    title: 'Numerical Linear Algebra',
    slug: 'numerical-linear-algebra',
    sections: [
      {
        id: 45,
        title: '11.1 Gaussian Elimination in Practice',
        slug: 'gaussian-elimination-practice',
        description: 'Numerical stability and pivoting.',
      },
      {
        id: 46,
        title: '11.2 Norms and Condition Numbers',
        slug: 'norms-and-condition-numbers',
        description: 'Measuring error and sensitivity.',
      },
      {
        id: 47,
        title: '11.3 Iterative Methods and Preconditioners',
        slug: 'iterative-methods',
        description: 'Solving large sparse systems.',
      },
    ],
  },
  // ==========================================================================
  // CHAPTER 12: Linear Algebra in Probability & Statistics
  // ==========================================================================
  {
    id: 12,
    title: 'Linear Algebra in Probability & Statistics',
    slug: 'linear-algebra-probability-statistics',
    sections: [
      {
        id: 48,
        title: '12.1 Mean, Variance, and Probability',
        slug: 'mean-variance-probability',
        description: 'Statistical foundations.',
      },
      {
        id: 49,
        title: '12.2 Covariance Matrices and Joint Probabilities',
        slug: 'covariance-matrices',
        description: 'Multivariate statistics.',
      },
      {
        id: 50,
        title: '12.3 Multivariate Gaussian and Weighted Least Squares',
        slug: 'multivariate-gaussian',
        description: 'Normal distributions and weighted regression.',
      },
    ],
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get section by ID
 */
export function getSectionById(id: number): Section | undefined {
  for (const part of curriculum) {
    const section = part.sections.find((s) => s.id === id);
    if (section) return section;
  }
  return undefined;
}

/**
 * Get part containing a section
 */
export function getPartBySectionId(sectionId: number): Part | undefined {
  return curriculum.find((part) =>
    part.sections.some((section) => section.id === sectionId)
  );
}

/**
 * Get adjacent sections (previous and next)
 */
export function getAdjacentSections(sectionId: number): {
  prev: Section | null;
  next: Section | null;
} {
  const allSections = curriculum.flatMap((part) => part.sections);
  const index = allSections.findIndex((s) => s.id === sectionId);

  return {
    prev: index > 0 ? allSections[index - 1] : null,
    next: index < allSections.length - 1 ? allSections[index + 1] : null,
  };
}

/**
 * Get total number of sections
 */
export function getTotalSections(): number {
  return curriculum.reduce((total, part) => total + part.sections.length, 0);
}

/**
 * Get all sections as a flat array
 */
export function getAllSections(): Section[] {
  return curriculum.flatMap((part) => part.sections);
}

/**
 * Get section index (position in course)
 */
export function getSectionIndex(sectionId: number): number {
  const allSections = getAllSections();
  return allSections.findIndex((s) => s.id === sectionId);
}
