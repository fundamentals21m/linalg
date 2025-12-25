import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section08() {
  return (
    <LessonLayout sectionId={8}>
      {/* Introduction */}
      <p>
        The <strong>inverse</strong> of a matrix <Math>A</Math> is another matrix <Math>{`A^{-1}`}</Math> that
        "undoes" the action of <Math>A</Math>. Finding <Math>{`A^{-1}`}</Math> is equivalent to solving <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math>.
      </p>

      <h2>What Is an Inverse?</h2>

      <Definition title="Inverse Matrix" className="my-6">
        <p>
          The matrix <Math>A</Math> is <strong>invertible</strong> if there exists a matrix <Math>{`A^{-1}`}</Math> such that:
        </p>
        <MathBlock>
          {`A^{-1}A = I \\quad \\text{and} \\quad AA^{-1} = I`}
        </MathBlock>
        <p className="mt-2">
          Not every matrix has an inverse! A matrix without an inverse is called <strong>singular</strong>.
        </p>
      </Definition>

      <Example title="Inverse of a 2×2 Matrix" className="my-6">
        <p>For a 2×2 matrix:</p>
        <MathBlock>
          {`A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\quad \\text{has inverse} \\quad A^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          The number <Math>ad - bc</Math> is the <strong>determinant</strong>. If <Math>ad - bc = 0</Math>, there is no inverse!
        </p>
      </Example>

      <h2>Why Inverses Matter</h2>

      <Theorem
        title="Solving Ax = b with the Inverse"
        className="my-6"
        proof={
          <>
            <p>Starting with <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math>, multiply both sides on the left by <Math>{`A^{-1}`}</Math>:</p>
            <MathBlock>{`A^{-1}(A\\mathbf{x}) = A^{-1}\\mathbf{b}`}</MathBlock>
            <p>Using associativity and the definition <Math>{`A^{-1}A = I`}</Math>:</p>
            <MathBlock>{`(A^{-1}A)\\mathbf{x} = A^{-1}\\mathbf{b} \\quad \\Rightarrow \\quad I\\mathbf{x} = A^{-1}\\mathbf{b} \\quad \\Rightarrow \\quad \\mathbf{x} = A^{-1}\\mathbf{b}`}</MathBlock>
          </>
        }
      >
        <p>
          If <Math>A</Math> is invertible, then <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> has exactly one solution:
        </p>
        <MathBlock>
          {`\\mathbf{x} = A^{-1}\\mathbf{b}`}
        </MathBlock>
        <p className="mt-2">
          Multiply both sides of <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> by <Math>{`A^{-1}`}</Math> to get <Math>{`\\mathbf{x}`}</Math>.
        </p>
      </Theorem>

      <h2>Computing the Inverse by Gauss-Jordan</h2>

      <p>
        The <strong>Gauss-Jordan method</strong> finds <Math>{`A^{-1}`}</Math> by reducing <Math>[A \mid I]</Math> to <Math>{`[I \\mid A^{-1}]`}</Math>.
      </p>

      <Example title="Gauss-Jordan Elimination" className="my-6">
        <MathBlock>
          {`\\left[\\begin{array}{cc|cc} 1 & 3 & 1 & 0 \\\\ 2 & 7 & 0 & 1 \\end{array}\\right] \\longrightarrow \\left[\\begin{array}{cc|cc} 1 & 3 & 1 & 0 \\\\ 0 & 1 & -2 & 1 \\end{array}\\right] \\longrightarrow \\left[\\begin{array}{cc|cc} 1 & 0 & 7 & -3 \\\\ 0 & 1 & -2 & 1 \\end{array}\\right]`}
        </MathBlock>
        <p className="mt-2">
          <Math>{`A^{-1} = \\begin{bmatrix} 7 & -3 \\\\ -2 & 1 \\end{bmatrix}`}</Math>
        </p>
      </Example>

      <h2>Properties of Inverses</h2>

      <Theorem
        title="Key Properties"
        className="my-6"
        proof={
          <>
            <p><strong>Property 1:</strong> Since <Math>{`A^{-1}A = I`}</Math>, the matrix <Math>A</Math> is the inverse of <Math>{`A^{-1}`}</Math>.</p>
            <p className="mt-2"><strong>Property 2:</strong> We verify <Math>{`(B^{-1}A^{-1})(AB) = I`}</Math>:</p>
            <MathBlock>{`(B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B = B^{-1}IB = B^{-1}B = I`}</MathBlock>
            <p><strong>Property 3:</strong> Taking transposes of <Math>{`A^{-1}A = I`}</Math>:</p>
            <MathBlock>{`(A^{-1}A)^T = I^T \\quad \\Rightarrow \\quad A^T(A^{-1})^T = I`}</MathBlock>
            <p>This shows <Math>{`(A^{-1})^T`}</Math> is the inverse of <Math>{`A^T`}</Math>.</p>
          </>
        }
      >
        <ul className="list-disc list-inside space-y-2">
          <li><Math>{`(A^{-1})^{-1} = A`}</Math></li>
          <li><Math>{`(AB)^{-1} = B^{-1}A^{-1}`}</Math> — note the <strong>reversed order</strong>!</li>
          <li><Math>{`(A^T)^{-1} = (A^{-1})^T`}</Math></li>
        </ul>
      </Theorem>

      <Example title="Inverse of a Product" className="my-6">
        <p>
          To invert <Math>AB</Math>, you must undo <Math>B</Math> first, then <Math>A</Math>:
        </p>
        <MathBlock>
          {`(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = AA^{-1} = I`}
        </MathBlock>
      </Example>

      <h2>When Is a Matrix Invertible?</h2>

      <Theorem
        title="Invertibility Conditions"
        className="my-6"
        proof={
          <>
            <p>These conditions are all equivalent. We show the key connections:</p>
            <p className="mt-2"><strong>n pivots ⟺ det ≠ 0:</strong> The determinant equals the product of the pivots times ±1 (from row exchanges).</p>
            <p className="mt-2"><strong>det ≠ 0 ⟺ Ax = 0 has only x = 0:</strong> If <Math>{`\\det(A) \\neq 0`}</Math>, then <Math>A</Math> is invertible, so <Math>{`A^{-1}`}</Math> exists and <Math>{`\\mathbf{x} = A^{-1}\\mathbf{0} = \\mathbf{0}`}</Math>.</p>
            <p className="mt-2"><strong>Only trivial solution ⟺ independent columns:</strong> Linear independence means the only combination that gives zero is the trivial one.</p>
          </>
        }
      >
        <p>An <Math>n \times n</Math> matrix <Math>A</Math> is invertible if and only if:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Elimination produces <Math>n</Math> pivots (no zeros on the diagonal of <Math>U</Math>).</li>
          <li>The determinant is nonzero: <Math>\det(A) \neq 0</Math>.</li>
          <li><Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math> has only the trivial solution <Math>{`\\mathbf{x} = \\mathbf{0}`}</Math>.</li>
          <li>The columns of <Math>A</Math> are linearly independent.</li>
        </ul>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span><Math>{`A^{-1}`}</Math> exists when <Math>A</Math> has <Math>n</Math> pivots. Then <Math>{`A^{-1}A = I`}</Math> and <Math>{`AA^{-1} = I`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>The solution to <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> is <Math>{`\\mathbf{x} = A^{-1}\\mathbf{b}`}</Math> (but don't compute it this way!).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span><strong>Gauss-Jordan:</strong> Reduce <Math>[A \mid I]</Math> to <Math>{`[I \\mid A^{-1}]`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span><Math>{`(AB)^{-1} = B^{-1}A^{-1}`}</Math> — the order reverses!</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
