export interface TheoremEntry {
  id: string;
  title: string;
  statement: string;
  sectionId: number;
  sectionTitle?: string;
  category?: string;
  hasProof?: boolean;
  type?: 'theorem' | 'definition' | 'lemma' | 'corollary' | 'proposition';
  proof?: string;
}

export const theorems: TheoremEntry[] = [
  {
    id: 'thm-rank-nullity',
    title: 'Rank-Nullity Theorem',
    statement: 'The rank of a matrix is the maximum number of linearly independent rows.',
    sectionId: 19,
    sectionTitle: 'Dimension Theorem',
    category: 'Properties',
    type: 'theorem',
    hasProof: true,
    proof: `
      Let $A$ be an $m \\times n$ matrix with rank $r$.
      The dimension of the row space of $A$ is the dimension of the column space of $A$, which equals $n - r$.
      Since $r = \\dim(C(A))$, we have $\\dim(R(A)) = n - \\dim(C(A)) = n - r$.
      Therefore, the rank is at most $n$.
    `,
  },
  {
    id: 'thm-invertible',
    title: 'Matrix Invertibility Theorem',
    statement: 'A square matrix $A$ is invertible iff $\\det(A) \\neq 0$',
    sectionId: 20,
    sectionTitle: 'Determinants',
    category: 'Properties',
    type: 'theorem',
    hasProof: true,
    proof: `
      If $A$ is invertible, there exists $B$ such that $AB = BA = I$.
      Then $\\det(A)\\det(B) = \\det(I) = 1$, so neither determinant is zero.
      
      Conversely, if $\\det(A) \\neq 0$, then the homogeneous system $Ax = 0$ has only the trivial solution $x = 0$.
      This means the columns of $A$ are linearly independent, so $A$ is invertible.
    `,
  },
  {
    id: 'def-vector-space',
    title: 'Definition: Vector Space',
    statement: 'A set $V$ is a vector space if it is closed under addition and scalar multiplication.',
    sectionId: 1,
    sectionTitle: 'Vector Spaces',
    category: 'Fundamentals',
    type: 'definition',
    proof: `
      We need to show two axioms:
      
      1. Closure under addition: For all $u, v \\in V$, $u + v \\in V$.
      2. Closure under scalar multiplication: For all $c \\in \\mathbb{R}$ and $v \\in V$, $cv \\in V$.
      3. Commutativity of addition: $u + v = v + u$ for all $u, v \\in V$.
      4. Associativity of addition: $(u + v) + w = u + (v + w)$.
      5. Distributive properties: $c(u + v) = cu + cv$.
    `,
  },
];

export function getTheoremsByCategory(category: string): TheoremEntry[] {
  return theorems.filter((t) => t.category === category);
}

export function getTheoremsBySection(sectionId: number): TheoremEntry[] {
  return theorems.filter((t) => t.sectionId === sectionId);
}

export function getCategories(): string[] {
  return [...new Set(theorems.map((t) => t.category).filter((c): c is string => Boolean(c)))];
}

export function searchTheorems(query: string): TheoremEntry[] {
  const lowerQuery = query.toLowerCase();
  return theorems.filter(
    (t) =>
      t.title.toLowerCase().includes(lowerQuery) ||
      t.statement.toLowerCase().includes(lowerQuery)
  );
}
