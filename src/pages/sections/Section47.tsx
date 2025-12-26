import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section47() {
  return (
    <LessonLayout sectionId={47}>
      {/* Introduction */}
      <p>
        Computing <strong>eigenvalues numerically</strong> is one of the great achievements of numerical
        linear algebra. The algorithms are subtle and beautiful, far more sophisticated than solving
        <Math>\det(A - \lambda I) = 0</Math>.
      </p>

      <h2>The Power Method</h2>

      <Definition title="Power Iteration" className="my-6">
        <p>
          To find the <strong>dominant eigenvalue</strong> (largest <Math>|\lambda|</Math>):
        </p>
        <MathBlock>
          {`\\mathbf{x}_{k+1} = \\frac{A\\mathbf{x}_k}{\\|A\\mathbf{x}_k\\|}`}
        </MathBlock>
        <p className="mt-2">
          Converges to the eigenvector for <Math>\lambda_1</Math> at rate <Math>|\lambda_2/\lambda_1|</Math>.
        </p>
      </Definition>

      <Example title="Power Method in Action" className="my-6">
        <p>
          For <Math>A</Math> with <Math>\lambda_1 = 3, \lambda_2 = 1</Math>:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Convergence rate: <Math>|1/3| = 0.33</Math></li>
          <li>After 10 iterations: error reduced by <Math>{`0.33^{10} \\approx 10^{-5}`}</Math></li>
        </ul>
      </Example>

      <Theorem
        title="Inverse Iteration"
        className="my-6"
        proof={
          <>
            <p><strong>Key insight:</strong> If <Math>{`A\\mathbf{v} = \\lambda \\mathbf{v}`}</Math>, then <Math>{`(A - \\mu I)\\mathbf{v} = (\\lambda - \\mu)\\mathbf{v}`}</Math>.</p>
            <p className="mt-2">Thus <Math>{`(A - \\mu I)^{-1}\\mathbf{v} = \\frac{1}{\\lambda - \\mu}\\mathbf{v}`}</Math>.</p>
            <p className="mt-2"><strong>Amplification:</strong> The eigenvalue of <Math>{`(A - \\mu I)^{-1}`}</Math> is <Math>{`1/(\\lambda - \\mu)`}</Math>. The eigenvalue closest to <Math>{`\\mu`}</Math> has the smallest <Math>{`|\\lambda - \\mu|`}</Math>, hence the largest <Math>{`|1/(\\lambda - \\mu)|`}</Math>.</p>
            <p className="mt-2"><strong>Convergence:</strong> Power iteration on <Math>{`(A - \\mu I)^{-1}`}</Math> converges to the eigenvector for the dominant eigenvalue of <Math>{`(A - \\mu I)^{-1}`}</Math>, which is the eigenvector for the eigenvalue of <Math>A</Math> nearest to <Math>{`\\mu`}</Math>.</p>
          </>
        }
      >
        <p>
          To find the eigenvalue nearest to <Math>\mu</Math>:
        </p>
        <MathBlock>
          {`(A - \\mu I)\\mathbf{x}_{k+1} = \\mathbf{x}_k`}
        </MathBlock>
        <p className="mt-2">
          This is power iteration on <Math>{`(A - \\mu I)^{-1}`}</Math>, which amplifies the eigenvalue
          nearest to <Math>\mu</Math>.
        </p>
      </Theorem>

      <h2>The QR Algorithm</h2>

      <Definition title="QR Iteration" className="my-6">
        <p>
          The <strong>QR algorithm</strong> finds all eigenvalues:
        </p>
        <MathBlock>
          {`A_k = Q_kR_k \\quad \\text{(QR factorization)}`}
        </MathBlock>
        <MathBlock>
          {`A_{k+1} = R_kQ_k \\quad \\text{(reverse multiply)}`}
        </MathBlock>
        <p className="mt-2">
          <Math>A_k \to</Math> upper triangular with eigenvalues on diagonal.
        </p>
      </Definition>

      <Theorem
        title="Convergence of QR"
        className="my-6"
        proof={
          <>
            <p><strong>Similarity:</strong> <Math>{`A_{k+1} = R_k Q_k = Q_k^{-1} Q_k R_k Q_k = Q_k^{-1} A_k Q_k`}</Math>.</p>
            <p className="mt-2">Thus <Math>{`A_{k+1}`}</Math> is similar to <Math>{`A_k`}</Math>, so all <Math>{`A_k`}</Math> share the same eigenvalues.</p>
            <p className="mt-2"><strong>Connection to power iteration:</strong> <Math>{`A^k = (Q_1 R_1)(Q_2 R_2)\\cdots = (Q_1 Q_2 \\cdots Q_k)(R_k \\cdots R_1)`}</Math>.</p>
            <p className="mt-2">The <Math>{`Q`}</Math>-factors span the same subspaces as power iteration. This causes the subdiagonal entries to decay like <Math>{`|\\lambda_{i+1}/\\lambda_i|^k`}</Math>.</p>
            <p className="mt-2"><strong>Result:</strong> <Math>A_k</Math> converges to upper triangular (or block upper triangular if eigenvalues have equal modulus) with eigenvalues on the diagonal.</p>
          </>
        }
      >
        <ul className="list-disc list-inside space-y-2">
          <li>All <Math>A_k</Math> are similar (same eigenvalues)</li>
          <li>For distinct <Math>|\lambda_i|</Math>, converges to upper triangular</li>
          <li>Rate depends on <Math>{`|\\lambda_{i+1}/\\lambda_i|`}</Math></li>
        </ul>
      </Theorem>

      <h2>Practical QR Algorithm</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Key Improvements</p>
        <ol className="list-decimal list-inside text-dark-300 text-sm space-y-2">
          <li><strong>Shifts:</strong> Use <Math>A_k - \mu_k I</Math> to accelerate convergence</li>
          <li><strong>Hessenberg form:</strong> Reduce to upper Hessenberg first (<Math>O(n^3)</Math> once)</li>
          <li><strong>Implicit shifts:</strong> Don't form <Math>Q</Math> and <Math>R</Math> explicitly</li>
          <li><strong>Deflation:</strong> Split off eigenvalues as they converge</li>
        </ol>
        <p className="text-dark-300 text-sm mt-2">
          Result: <Math>O(n^3)</Math> operations for all eigenvalues.
        </p>
      </div>

      <h2>SVD Computation</h2>

      <Theorem
        title="Computing the SVD"
        className="my-6"
        proof={
          <>
            <p><strong>Step 1 - Bidiagonalization:</strong> Use Householder reflections alternating on left and right to reduce <Math>A</Math> to bidiagonal form <Math>B = U_1^T A V_1</Math>. Cost: <Math>O(mn^2)</Math>.</p>
            <p className="mt-2"><strong>Step 2 - SVD of bidiagonal:</strong> Apply implicit QR with shifts to <Math>B^TB</Math> (without forming it explicitly). This zeroes out the superdiagonal entries.</p>
            <p className="mt-2"><strong>Step 3 - Accumulate:</strong> Track the transformations: <Math>U = U_1 U_2</Math>, <Math>V = V_1 V_2</Math> where <Math>U_2, V_2</Math> come from the QR iterations.</p>
            <p className="mt-2"><strong>Result:</strong> <Math>A = U\\Sigma V^T</Math> where <Math>\\Sigma</Math> is diagonal with singular values (square roots of eigenvalues of <Math>A^TA</Math>).</p>
          </>
        }
      >
        <p>
          To compute <Math>A = U\Sigma V^T</Math>:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Reduce to bidiagonal form (Householder reflections)</li>
          <li>Apply QR iteration to the bidiagonal matrix</li>
          <li>Accumulate transformations into <Math>U</Math> and <Math>V</Math></li>
        </ol>
        <p className="mt-2">
          Total cost: <Math>O(mn^2)</Math> for <Math>m \times n</Math> matrix.
        </p>
      </Theorem>

      <h2>Divide and Conquer</h2>

      <Definition title="Divide and Conquer for Eigenvalues" className="my-6">
        <p>
          For symmetric tridiagonal matrices, <strong>divide and conquer</strong> is often fastest:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Split matrix into two halves</li>
          <li>Recursively find eigenvalues of halves</li>
          <li>Combine using rank-1 updates</li>
        </ol>
        <p className="mt-2">
          Parallelizes well; <Math>O(n^2)</Math> for eigenvalues only.
        </p>
      </Definition>

      <h2>Eigenvalue Solvers in Practice</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">LAPACK/BLAS</p>
        <p className="text-dark-300 text-sm">
          Standard libraries (LAPACK, MKL, OpenBLAS) implement these algorithms with
          decades of optimization:
        </p>
        <ul className="list-disc list-inside text-dark-300 text-sm mt-2 space-y-1">
          <li><code>DGEEV</code>: General eigenvalues</li>
          <li><code>DSYEV</code>: Symmetric eigenvalues</li>
          <li><code>DGESVD</code>: Singular value decomposition</li>
        </ul>
      </div>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Power method: iterate <Math>x \to Ax/\|Ax\|</Math> for dominant eigenvector.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Inverse iteration finds eigenvalue nearest to shift <Math>\mu</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>QR algorithm: <Math>A = QR</Math>, then <Math>A \to RQ</Math>, repeat.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Practical QR uses shifts, Hessenberg form, and deflation.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>All eigenvalues in <Math>O(n^3)</Math>; use standard libraries!</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
