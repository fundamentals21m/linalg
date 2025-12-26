import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section23() {
  return (
    <LessonLayout sectionId={23}>
      {/* Introduction */}
      <p>
        <strong>Eigenvalues</strong> and <strong>eigenvectors</strong> reveal the essential behavior of a matrix.
        They tell us which directions are simply stretched (not rotated) when we multiply by <Math>A</Math>.
      </p>

      <h2>The Key Equation</h2>

      <Definition title="Eigenvalues and Eigenvectors" className="my-6">
        <p>
          An <strong>eigenvector</strong> <Math>{`\\mathbf{x}`}</Math> of matrix <Math>A</Math> satisfies:
        </p>
        <MathBlock>
          {`A\\mathbf{x} = \\lambda\\mathbf{x}`}
        </MathBlock>
        <p className="mt-2">
          The number <Math>\lambda</Math> is the corresponding <strong>eigenvalue</strong>.
        </p>
        <p className="mt-2 text-primary-400">
          <Math>{`A\\mathbf{x}`}</Math> is parallel to <Math>{`\\mathbf{x}`}</Math>—the matrix just multiplies by <Math>\lambda</Math>.
        </p>
      </Definition>

      <Example title="A 2×2 Example" className="my-6">
        <MathBlock>
          {`A = \\begin{bmatrix} 4 & -5 \\\\ 2 & -3 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">Check that <Math>{`\\mathbf{x} = (1, 1)`}</Math> is an eigenvector:</p>
        <MathBlock>
          {`A\\mathbf{x} = \\begin{bmatrix} 4 & -5 \\\\ 2 & -3 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -1 \\\\ -1 \\end{bmatrix} = -1 \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Eigenvalue <Math>\lambda_1 = -1</Math>, eigenvector <Math>{`\\mathbf{x}_1 = (1, 1)`}</Math>.
        </p>
      </Example>

      <h2>Finding Eigenvalues</h2>

      <Theorem
        title="The Characteristic Equation"
        className="my-6"
        proof={
          <>
            <p>Starting from <Math>{`A\\mathbf{x} = \\lambda\\mathbf{x}`}</Math>, rewrite as:</p>
            <MathBlock>{`A\\mathbf{x} - \\lambda\\mathbf{x} = \\mathbf{0} \\quad \\Rightarrow \\quad (A - \\lambda I)\\mathbf{x} = \\mathbf{0}`}</MathBlock>
            <p className="mt-2">For a nonzero eigenvector <Math>{`\\mathbf{x}`}</Math> to exist, the matrix <Math>(A - \lambda I)</Math> must be singular (otherwise the only solution is <Math>{`\\mathbf{x} = \\mathbf{0}`}</Math>).</p>
            <p className="mt-2">A matrix is singular if and only if its determinant is zero. Therefore:</p>
            <MathBlock>{`\\det(A - \\lambda I) = 0`}</MathBlock>
            <p>This is a polynomial equation of degree <Math>n</Math> in <Math>\lambda</Math>, with exactly <Math>n</Math> roots (counting multiplicity, over the complex numbers).</p>
          </>
        }
      >
        <p>
          Rewrite <Math>{`A\\mathbf{x} = \\lambda\\mathbf{x}`}</Math> as <Math>{`(A - \\lambda I)\\mathbf{x} = \\mathbf{0}`}</Math>.
          For a nonzero eigenvector to exist:
        </p>
        <MathBlock>
          {`\\det(A - \\lambda I) = 0`}
        </MathBlock>
        <p className="mt-2">
          This is the <strong>characteristic equation</strong>. Its roots are the eigenvalues.
        </p>
      </Theorem>

      <Example title="Computing Eigenvalues" className="my-6">
        <MathBlock>
          {`A - \\lambda I = \\begin{bmatrix} 4-\\lambda & -5 \\\\ 2 & -3-\\lambda \\end{bmatrix}`}
        </MathBlock>
        <MathBlock>
          {`\\det(A - \\lambda I) = (4-\\lambda)(-3-\\lambda) + 10 = \\lambda^2 - \\lambda - 2 = (\\lambda-2)(\\lambda+1)`}
        </MathBlock>
        <p className="mt-2">
          Eigenvalues: <Math>\lambda_1 = 2</Math> and <Math>\lambda_2 = -1</Math>.
        </p>
      </Example>

      <h2>Finding Eigenvectors</h2>

      <p>
        For each eigenvalue <Math>\lambda</Math>, solve <Math>{`(A - \\lambda I)\\mathbf{x} = \\mathbf{0}`}</Math>
        to find the eigenvector.
      </p>

      <Example title="Computing Eigenvectors" className="my-6">
        <p>For <Math>\lambda = 2</Math>:</p>
        <MathBlock>
          {`(A - 2I)\\mathbf{x} = \\begin{bmatrix} 2 & -5 \\\\ 2 & -5 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Solution: <Math>2x - 5y = 0</Math>, so <Math>{`\\mathbf{x}_1 = (5, 2)`}</Math>.
        </p>
      </Example>

      <h2>Properties of Eigenvalues</h2>

      <Theorem
        title="Sum and Product"
        className="my-6"
        proof={
          <>
            <p>The characteristic polynomial is:</p>
            <MathBlock>{`\\det(A - \\lambda I) = (-1)^n(\\lambda - \\lambda_1)(\\lambda - \\lambda_2) \\cdots (\\lambda - \\lambda_n)`}</MathBlock>
            <p className="mt-2"><strong>Product:</strong> Set <Math>\lambda = 0</Math>:</p>
            <MathBlock>{`\\det(A) = (-1)^n(-\\lambda_1)(-\\lambda_2)\\cdots(-\\lambda_n) = \\lambda_1\\lambda_2\\cdots\\lambda_n`}</MathBlock>
            <p className="mt-2"><strong>Sum:</strong> The coefficient of <Math>{`\\lambda^{n-1}`}</Math> on the left is <Math>{`(-1)^{n-1}(a_{11} + \\cdots + a_{nn})`}</Math>. On the right, it's <Math>{`(-1)^{n-1}(\\lambda_1 + \\cdots + \\lambda_n)`}</Math>. Comparing gives the trace formula.</p>
          </>
        }
      >
        <p>For an <Math>n \times n</Math> matrix:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><Math>{`\\lambda_1 + \\lambda_2 + \\cdots + \\lambda_n = \\text{trace} = a_{11} + a_{22} + \\cdots + a_{nn}`}</Math></li>
          <li><Math>\lambda_1 \cdot \lambda_2 \cdots \lambda_n = \det A</Math></li>
        </ul>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Quick Checks</p>
        <p className="text-dark-300 text-sm">
          For <Math>{`A = \\begin{bmatrix} 4 & -5 \\\\ 2 & -3 \\end{bmatrix}`}</Math>:<br />
          Trace = <Math>4 + (-3) = 1 = 2 + (-1)</Math> ✓<br />
          Det = <Math>-12 + 10 = -2 = (2)(-1)</Math> ✓
        </p>
      </div>

      <h2>Special Cases</h2>

      <Theorem
        title="Eigenvalues of Special Matrices"
        className="my-6"
        proof={
          <>
            <p><strong>Triangular:</strong> <Math>\det(A - \lambda I)</Math> is also triangular, so its determinant is the product of diagonal entries: <Math>(a_{11} - \lambda)(a_{22} - \lambda) \cdots</Math>. This is zero when <Math>\lambda</Math> equals a diagonal entry.</p>
            <p className="mt-2"><strong>Singular:</strong> If <Math>\det A = 0</Math>, then <Math>\det(A - 0 \cdot I) = 0</Math>, so <Math>\lambda = 0</Math> is an eigenvalue.</p>
            <p className="mt-2"><strong>Inverse:</strong> If <Math>{`A\\mathbf{x} = \\lambda\\mathbf{x}`}</Math>, multiply by <Math>{`A^{-1}`}</Math>: <Math>{`\\mathbf{x} = \\lambda A^{-1}\\mathbf{x}`}</Math>, so <Math>{`A^{-1}\\mathbf{x} = (1/\\lambda)\\mathbf{x}`}</Math>.</p>
            <p className="mt-2"><strong>Powers:</strong> If <Math>{`A\\mathbf{x} = \\lambda\\mathbf{x}`}</Math>, then <Math>{`A^2\\mathbf{x} = A(\\lambda\\mathbf{x}) = \\lambda A\\mathbf{x} = \\lambda^2\\mathbf{x}`}</Math>. By induction, <Math>{`A^k\\mathbf{x} = \\lambda^k\\mathbf{x}`}</Math>.</p>
          </>
        }
      >
        <ul className="list-disc list-inside space-y-2">
          <li>If <Math>A</Math> is <strong>triangular</strong>, eigenvalues = diagonal entries</li>
          <li>If <Math>A</Math> is <strong>singular</strong>, then <Math>\lambda = 0</Math> is an eigenvalue</li>
          <li>If <Math>A</Math> is <strong>invertible</strong>, eigenvalues of <Math>{`A^{-1}`}</Math> are <Math>1/\lambda</Math></li>
          <li>Eigenvalues of <Math>A^k</Math> are <Math>\lambda^k</Math> (same eigenvectors)</li>
        </ul>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span><Math>{`A\\mathbf{x} = \\lambda\\mathbf{x}`}</Math>: the eigenvector <Math>{`\\mathbf{x}`}</Math> is stretched by the eigenvalue <Math>\lambda</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Find eigenvalues by solving <Math>\det(A - \lambda I) = 0</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Find eigenvectors by solving <Math>{`(A - \\lambda I)\\mathbf{x} = \\mathbf{0}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Sum of eigenvalues = trace. Product of eigenvalues = determinant.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Eigenvalues of <Math>A^k</Math> are <Math>\lambda^k</Math>; eigenvalues of <Math>{`A^{-1}`}</Math> are <Math>1/\lambda</Math>.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
