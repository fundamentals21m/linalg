import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section36() {
  return (
    <LessonLayout sectionId={36}>
      {/* Introduction */}
      <p>
        <strong>Hermitian</strong> and <strong>unitary</strong> matrices are the complex analogues of
        symmetric and orthogonal matrices. They share the beautiful properties of real eigenvalues
        and orthonormal eigenvectors.
      </p>

      <h2>Conjugate Transpose</h2>

      <Definition title="Conjugate Transpose (Hermitian Adjoint)" className="my-6">
        <p>
          The <strong>conjugate transpose</strong> of matrix <Math>A</Math> is:
        </p>
        <MathBlock>
          {`A^H = \\bar{A}^T = (\\bar{A})^T = (A^T)^{\\bar{}}`}
        </MathBlock>
        <p className="mt-2">
          Also written as <Math>A^*</Math>. Take transpose AND conjugate each entry.
        </p>
      </Definition>

      <Example title="Computing A^H" className="my-6">
        <MathBlock>
          {`A = \\begin{bmatrix} 1 & 2+i \\\\ 3i & 4-2i \\end{bmatrix} \\quad \\Rightarrow \\quad A^H = \\begin{bmatrix} 1 & -3i \\\\ 2-i & 4+2i \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <h2>Hermitian Matrices</h2>

      <Definition title="Hermitian Matrix" className="my-6">
        <p>
          A matrix <Math>A</Math> is <strong>Hermitian</strong> if:
        </p>
        <MathBlock>
          {`A^H = A`}
        </MathBlock>
        <p className="mt-2">
          Diagonal entries must be real. Off-diagonal entries satisfy <Math>{`a_{ij} = \\bar{a}_{ji}`}</Math>.
        </p>
      </Definition>

      <Theorem
        title="Spectral Theorem for Hermitian Matrices"
        className="my-6"
        proof={
          <>
            <p><strong>Real eigenvalues:</strong> If <Math>{`A\\mathbf{x} = \\lambda\\mathbf{x}`}</Math>, take the conjugate transpose:</p>
            <MathBlock>{`(A\\mathbf{x})^H = (\\lambda\\mathbf{x})^H \\implies \\mathbf{x}^H A^H = \\bar{\\lambda}\\mathbf{x}^H`}</MathBlock>
            <p className="mt-2">Since <Math>{`A^H = A`}</Math>: <Math>{`\\mathbf{x}^H A = \\bar{\\lambda}\\mathbf{x}^H`}</Math>. Multiply on the right by <Math>{`\\mathbf{x}`}</Math>:</p>
            <MathBlock>{`\\mathbf{x}^H A\\mathbf{x} = \\bar{\\lambda}\\mathbf{x}^H\\mathbf{x} = \\lambda\\mathbf{x}^H\\mathbf{x}`}</MathBlock>
            <p className="mt-2">Since <Math>{`\\mathbf{x}^H\\mathbf{x} = \\|\\mathbf{x}\\|^2 \\neq 0`}</Math>, we have <Math>{`\\lambda = \\bar{\\lambda}`}</Math>, so <Math>{`\\lambda`}</Math> is real.</p>
            <p className="mt-2"><strong>Orthogonal eigenvectors:</strong> For distinct eigenvalues, similar to the symmetric case: <Math>{`\\lambda_1(\\mathbf{x}^H\\mathbf{y}) = \\lambda_2(\\mathbf{x}^H\\mathbf{y})`}</Math> implies <Math>{`\\mathbf{x}^H\\mathbf{y} = 0`}</Math>.</p>
          </>
        }
      >
        <p>If <Math>A = A^H</Math> (Hermitian), then:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>All eigenvalues are <strong>real</strong></li>
          <li>Eigenvectors can be chosen <strong>orthonormal</strong></li>
        </ol>
        <MathBlock>
          {`A = U\\Lambda U^H`}
        </MathBlock>
        <p className="mt-2">
          where <Math>U</Math> is unitary and <Math>\Lambda</Math> is real diagonal.
        </p>
      </Theorem>

      <Example title="Hermitian Example" className="my-6">
        <MathBlock>
          {`A = \\begin{bmatrix} 2 & 1-i \\\\ 1+i & 3 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Diagonal entries 2 and 3 are real. Off-diagonal: <Math>1-i</Math> and <Math>{`\\overline{1-i} = 1+i`}</Math> ✓
        </p>
        <p className="mt-2">
          Eigenvalues: both real (computed from characteristic polynomial).
        </p>
      </Example>

      <h2>Unitary Matrices</h2>

      <Definition title="Unitary Matrix" className="my-6">
        <p>
          A matrix <Math>U</Math> is <strong>unitary</strong> if:
        </p>
        <MathBlock>
          {`U^H U = I \\quad \\Leftrightarrow \\quad U^{-1} = U^H`}
        </MathBlock>
        <p className="mt-2">
          The columns form an orthonormal basis for <Math>{`\\mathbb{C}^n`}</Math>.
        </p>
      </Definition>

      <Theorem
        title="Properties of Unitary Matrices"
        className="my-6"
        proof={
          <>
            <p><strong>Preserves lengths:</strong></p>
            <MathBlock>{`\\|U\\mathbf{x}\\|^2 = (U\\mathbf{x})^H(U\\mathbf{x}) = \\mathbf{x}^H U^H U \\mathbf{x} = \\mathbf{x}^H I \\mathbf{x} = \\|\\mathbf{x}\\|^2`}</MathBlock>
            <p className="mt-2"><strong>Preserves inner products:</strong></p>
            <MathBlock>{`\\langle U\\mathbf{x}, U\\mathbf{y} \\rangle = (U\\mathbf{x})^H(U\\mathbf{y}) = \\mathbf{x}^H U^H U \\mathbf{y} = \\mathbf{x}^H \\mathbf{y} = \\langle \\mathbf{x}, \\mathbf{y} \\rangle`}</MathBlock>
            <p className="mt-2"><strong>Eigenvalues on unit circle:</strong> If <Math>{`U\\mathbf{x} = \\lambda\\mathbf{x}`}</Math>:</p>
            <MathBlock>{`\\|\\mathbf{x}\\| = \\|U\\mathbf{x}\\| = |\\lambda|\\|\\mathbf{x}\\| \\implies |\\lambda| = 1`}</MathBlock>
            <p className="mt-2"><strong>Determinant:</strong> <Math>|\\det U|^2 = \\det(U^H)\\det(U) = \\det(U^H U) = \\det I = 1</Math>.</p>
          </>
        }
      >
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Preserves lengths:</strong> <Math>{`\\|U\\mathbf{x}\\| = \\|\\mathbf{x}\\|`}</Math></li>
          <li><strong>Preserves inner products:</strong> <Math>{`\\langle U\\mathbf{x}, U\\mathbf{y} \\rangle = \\langle \\mathbf{x}, \\mathbf{y} \\rangle`}</Math></li>
          <li><strong>Eigenvalues:</strong> <Math>|\lambda| = 1</Math> (on unit circle)</li>
          <li><strong>Determinant:</strong> <Math>|\det U| = 1</Math></li>
        </ul>
      </Theorem>

      <Example title="Fourier Matrix" className="my-6">
        <p>
          The <Math>n \times n</Math> Fourier matrix <Math>F_n</Math> (with normalization) is unitary:
        </p>
        <MathBlock>
          {`(F_n)_{jk} = \\frac{1}{\\sqrt{n}} e^{2\\pi i jk/n} = \\frac{1}{\\sqrt{n}} \\omega^{jk}`}
        </MathBlock>
        <p className="mt-2">
          where <Math>{`\\omega = e^{2\\\\pi i/n}`}</Math> is a primitive <Math>n</Math>th root of unity.
        </p>
      </Example>

      <h2>Relationship to Real Matrices</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Complex vs Real</p>
        <table className="w-full text-sm text-dark-300 mt-2">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="text-left py-2">Real</th>
              <th className="text-left py-2">Complex</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-dark-800">
              <td className="py-2">Transpose <Math>A^T</Math></td>
              <td className="py-2">Conjugate transpose <Math>A^H</Math></td>
            </tr>
            <tr className="border-b border-dark-800">
              <td className="py-2">Symmetric <Math>A = A^T</Math></td>
              <td className="py-2">Hermitian <Math>A = A^H</Math></td>
            </tr>
            <tr className="border-b border-dark-800">
              <td className="py-2">Orthogonal <Math>Q^TQ = I</Math></td>
              <td className="py-2">Unitary <Math>U^HU = I</Math></td>
            </tr>
            <tr>
              <td className="py-2">Dot product <Math>x^Ty</Math></td>
              <td className="py-2">Inner product <Math>x^Hy</Math></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Skew-Hermitian Matrices</h2>

      <Definition title="Skew-Hermitian" className="my-6">
        <p>
          A matrix is <strong>skew-Hermitian</strong> if <Math>A^H = -A</Math>.
        </p>
        <p className="mt-2">
          Eigenvalues are <strong>purely imaginary</strong> (on imaginary axis).
        </p>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Conjugate transpose: <Math>{`A^H = \\bar{A}^T`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Hermitian (<Math>A^H = A</Math>) has real eigenvalues and orthonormal eigenvectors.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Unitary (<Math>U^HU = I</Math>) preserves lengths and has <Math>|\lambda| = 1</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Spectral theorem: <Math>A = U\Lambda U^H</Math> for Hermitian <Math>A</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>The Fourier matrix is unitary.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
