import { LessonLayout } from '@/components/layout/LessonLayout';
import { Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section26() {
  return (
    <LessonLayout sectionId={26}>
      {/* Introduction */}
      <p>
        <strong>Symmetric matrices</strong> are the most important matrices in applications. They have
        <strong> real eigenvalues</strong> and <strong>orthogonal eigenvectors</strong>—guaranteed!
      </p>

      <h2>The Spectral Theorem</h2>

      <Theorem
        title="Spectral Theorem for Symmetric Matrices"
        className="my-6"
        proof={
          <>
            <p><strong>Real eigenvalues:</strong> If <Math>{`S\\mathbf{x} = \\lambda\\mathbf{x}`}</Math>, take complex conjugate transpose:</p>
            <MathBlock>{`\\bar{\\mathbf{x}}^T S = \\bar{\\lambda} \\bar{\\mathbf{x}}^T`}</MathBlock>
            <p>Multiply by <Math>{`\\mathbf{x}`}</Math>: <Math>{`\\bar{\\mathbf{x}}^T S\\mathbf{x} = \\bar{\\lambda}\\|\\mathbf{x}\\|^2`}</Math>.</p>
            <p>Also <Math>{`\\bar{\\mathbf{x}}^T S\\mathbf{x} = \\bar{\\mathbf{x}}^T(\\lambda\\mathbf{x}) = \\lambda\\|\\mathbf{x}\\|^2`}</Math>.</p>
            <p className="mt-2">So <Math>{`\\lambda = \\bar{\\lambda}`}</Math>, meaning <Math>{`\\lambda`}</Math> is real.</p>
            <p className="mt-2"><strong>Orthonormal eigenvectors:</strong> For distinct eigenvalues, eigenvectors are orthogonal (next theorem). For repeated eigenvalues, we can choose an orthonormal basis within each eigenspace.</p>
          </>
        }
      >
        <p>If <Math>S = S^T</Math> (symmetric), then:</p>
        <ol className="list-decimal list-inside mt-2 space-y-2">
          <li>All eigenvalues are <strong>real</strong></li>
          <li>Eigenvectors can be chosen <strong>orthonormal</strong></li>
        </ol>
        <p className="mt-2">
          Every symmetric matrix can be diagonalized:
        </p>
        <MathBlock>
          {`S = Q\\Lambda Q^T = Q\\Lambda Q^{-1}`}
        </MathBlock>
        <p className="mt-2 text-primary-400">
          The eigenvector matrix <Math>Q</Math> is <strong>orthogonal</strong>: <Math>{`Q^T = Q^{-1}`}</Math>.
        </p>
      </Theorem>

      <Example title="Diagonalizing a Symmetric Matrix" className="my-6">
        <MathBlock>
          {`S = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Eigenvalues: <Math>\lambda_1 = 5</Math>, <Math>\lambda_2 = 0</Math> (trace = 5, det = 0)
        </p>
        <p className="mt-2">
          Orthonormal eigenvectors: <Math>{`\\mathbf{q}_1 = \\frac{1}{\\sqrt{5}}(1, 2)`}</Math>, <Math>{`\\mathbf{q}_2 = \\frac{1}{\\sqrt{5}}(-2, 1)`}</Math>
        </p>
        <MathBlock>
          {`S = Q\\Lambda Q^T = \\frac{1}{5}\\begin{bmatrix} 1 & -2 \\\\ 2 & 1 \\end{bmatrix}\\begin{bmatrix} 5 & 0 \\\\ 0 & 0 \\end{bmatrix}\\begin{bmatrix} 1 & 2 \\\\ -2 & 1 \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <h2>Why Real Eigenvalues?</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Proof Sketch</p>
        <p className="text-dark-300 text-sm">
          If <Math>{`S\\mathbf{x} = \\lambda\\mathbf{x}`}</Math>, take the complex conjugate transpose:<br />
          <Math>{`\\bar{\\mathbf{x}}^T S = \\bar{\\lambda} \\bar{\\mathbf{x}}^T`}</Math><br />
          Multiply on the right by <Math>{`\\mathbf{x}`}</Math>:<br />
          <Math>{`\\bar{\\mathbf{x}}^T S\\mathbf{x} = \\lambda \\bar{\\mathbf{x}}^T\\mathbf{x} = \\bar{\\lambda} \\bar{\\mathbf{x}}^T\\mathbf{x}`}</Math><br />
          Since <Math>{`\\bar{\\mathbf{x}}^T\\mathbf{x} = \\|\\mathbf{x}\\|^2 \\neq 0`}</Math>, we get <Math>{`\\lambda = \\bar{\\lambda}`}</Math>, so <Math>\lambda</Math> is real.
        </p>
      </div>

      <h2>Why Orthogonal Eigenvectors?</h2>

      <Theorem
        title="Eigenvectors of Different Eigenvalues are Orthogonal"
        className="my-6"
        proof={
          <>
            <p>Consider <Math>{`\\mathbf{x}^T(S\\mathbf{y})`}</Math> computed two ways:</p>
            <p className="mt-2"><strong>Way 1:</strong> <Math>{`\\mathbf{x}^T(S\\mathbf{y}) = \\mathbf{x}^T(\\lambda_2\\mathbf{y}) = \\lambda_2(\\mathbf{x}^T\\mathbf{y})`}</Math></p>
            <p className="mt-2"><strong>Way 2:</strong> <Math>{`\\mathbf{x}^T(S\\mathbf{y}) = (\\mathbf{x}^TS)\\mathbf{y} = (S\\mathbf{x})^T\\mathbf{y} = (\\lambda_1\\mathbf{x})^T\\mathbf{y} = \\lambda_1(\\mathbf{x}^T\\mathbf{y})`}</Math></p>
            <p className="mt-2">We used <Math>S^T = S</Math> in Way 2. Equating:</p>
            <MathBlock>{`\\lambda_2(\\mathbf{x}^T\\mathbf{y}) = \\lambda_1(\\mathbf{x}^T\\mathbf{y})`}</MathBlock>
            <p>Since <Math>\lambda_1 \neq \lambda_2</Math>, we must have <Math>{`\\mathbf{x}^T\\mathbf{y} = 0`}</Math>.</p>
          </>
        }
      >
        <p>
          If <Math>{`S\\mathbf{x} = \\lambda_1\\mathbf{x}`}</Math> and <Math>{`S\\mathbf{y} = \\lambda_2\\mathbf{y}`}</Math>
          with <Math>\lambda_1 \neq \lambda_2</Math>, then <Math>{`\\mathbf{x}^T\\mathbf{y} = 0`}</Math>.
        </p>
      </Theorem>

      <h2>The Principal Axis Theorem</h2>

      <Theorem
        title="Principal Axes"
        className="my-6"
        proof={
          <>
            <p>Substitute <Math>S = Q\Lambda Q^T</Math> and let <Math>{`\\mathbf{y} = Q^T\\mathbf{x}`}</Math> (so <Math>{`\\mathbf{x} = Q\\mathbf{y}`}</Math>):</p>
            <MathBlock>{`\\mathbf{x}^TS\\mathbf{x} = \\mathbf{x}^T(Q\\Lambda Q^T)\\mathbf{x} = (Q^T\\mathbf{x})^T\\Lambda(Q^T\\mathbf{x}) = \\mathbf{y}^T\\Lambda\\mathbf{y}`}</MathBlock>
            <p className="mt-2">Since <Math>\Lambda</Math> is diagonal:</p>
            <MathBlock>{`\\mathbf{y}^T\\Lambda\\mathbf{y} = \\begin{bmatrix} y_1 & \\cdots & y_n \\end{bmatrix}\\begin{bmatrix} \\lambda_1 & & \\\\ & \\ddots & \\\\ & & \\lambda_n \\end{bmatrix}\\begin{bmatrix} y_1 \\\\ \\vdots \\\\ y_n \\end{bmatrix} = \\lambda_1 y_1^2 + \\cdots + \\lambda_n y_n^2`}</MathBlock>
          </>
        }
      >
        <p>
          The quadratic form <Math>{`\\mathbf{x}^T S\\mathbf{x}`}</Math> becomes a sum of squares in the eigenvector basis:
        </p>
        <MathBlock>
          {`\\mathbf{x}^TS\\mathbf{x} = \\lambda_1 y_1^2 + \\lambda_2 y_2^2 + \\cdots + \\lambda_n y_n^2`}
        </MathBlock>
        <p className="mt-2">
          where <Math>{`\\mathbf{y} = Q^T\\mathbf{x}`}</Math> are coordinates in the eigenvector basis.
        </p>
      </Theorem>

      <Example title="Ellipse Example" className="my-6">
        <p>The equation <Math>5x^2 + 8xy + 5y^2 = 1</Math> represents an ellipse.</p>
        <MathBlock>
          {`S = \\begin{bmatrix} 5 & 4 \\\\ 4 & 5 \\end{bmatrix} \\quad \\text{has } \\lambda_1 = 9, \\lambda_2 = 1`}
        </MathBlock>
        <p className="mt-2">
          In principal axes: <Math>9u^2 + v^2 = 1</Math>. The eigenvectors give the axes of the ellipse.
        </p>
      </Example>

      <h2>Eigenvalue Sign and Pivots</h2>

      <Theorem
        title="Signs of Eigenvalues"
        className="my-6"
        proof={
          <>
            <p>This is <strong>Sylvester's Law of Inertia</strong>. The key idea:</p>
            <p className="mt-2">Elimination <Math>S \to LDL^T</Math> preserves the "signature" (numbers of +, −, 0). The diagonal of <Math>D</Math> contains the pivots.</p>
            <p className="mt-2">Similarly, diagonalization <Math>S = Q\Lambda Q^T</Math> gives the eigenvalues on the diagonal.</p>
            <p className="mt-2">Both <Math>D</Math> and <Math>\Lambda</Math> are related by congruence transformations that preserve signature. Therefore the counts of positive, negative, and zero entries must match.</p>
          </>
        }
      >
        <p>For a symmetric matrix <Math>S</Math>:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Number of positive eigenvalues = number of positive pivots</li>
          <li>Number of negative eigenvalues = number of negative pivots</li>
          <li>Number of zero eigenvalues = number of zero pivots</li>
        </ul>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Symmetric matrices have <strong>real eigenvalues</strong> and <strong>orthonormal eigenvectors</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span><Math>S = Q\Lambda Q^T</Math> where <Math>Q</Math> is orthogonal and <Math>\Lambda</Math> is diagonal.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Eigenvectors of different eigenvalues are automatically orthogonal.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Principal axis theorem: <Math>{`\\mathbf{x}^TS\\mathbf{x} = \\sum \\lambda_i y_i^2`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Signs of eigenvalues match signs of pivots.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
