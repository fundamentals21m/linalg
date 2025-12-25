import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section09() {
  return (
    <LessonLayout sectionId={9}>
      {/* Introduction */}
      <p>
        The <strong>LU factorization</strong> expresses elimination as matrix multiplication: <Math>A = LU</Math>.
        Here <Math>L</Math> is lower triangular (from the multipliers) and <Math>U</Math> is upper triangular (from elimination).
      </p>

      <h2>From Elimination to Factorization</h2>

      <p>
        Elimination transforms <Math>A</Math> to <Math>U</Math>: we have <Math>EA = U</Math>. Solving for <Math>A</Math> gives <Math>{`A = E^{-1}U = LU`}</Math>.
      </p>

      <Definition title="LU Factorization" className="my-6">
        <p>
          If elimination on <Math>A</Math> requires no row exchanges, then <Math>A</Math> factors into:
        </p>
        <MathBlock>
          {`A = LU`}
        </MathBlock>
        <p className="mt-2">
          <Math>L</Math> is <strong>lower triangular</strong> with 1's on the diagonal.<br />
          <Math>U</Math> is <strong>upper triangular</strong> with the pivots on its diagonal.
        </p>
      </Definition>

      <h2>Where Does <Math>L</Math> Come From?</h2>

      <p>
        The entries of <Math>L</Math> are the <strong>multipliers</strong> <Math>{`\\ell_{ij}`}</Math> from elimination.
        Below the diagonal of <Math>L</Math>, entry <Math>(i, j)</Math> is <Math>{`\\ell_{ij}`}</Math>.
      </p>

      <Example title="LU Factorization Example" className="my-6">
        <MathBlock>
          {`A = \\begin{bmatrix} 2 & 1 \\\\ 6 & 7 \\end{bmatrix} \\quad \\text{Multiplier: } \\ell_{21} = \\frac{6}{2} = 3`}
        </MathBlock>
        <MathBlock>
          {`L = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix} \\quad U = \\begin{bmatrix} 2 & 1 \\\\ 0 & 4 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Check: <Math>{`LU = \\begin{bmatrix} 2 & 1 \\\\ 6 & 7 \\end{bmatrix} = A`}</Math> ✓
        </p>
      </Example>

      <h2>Solving <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> with <Math>LU</Math></h2>

      <p>
        Once we have <Math>A = LU</Math>, solving <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> becomes two triangular systems:
      </p>

      <Definition title="Two-Step Solution" className="my-6">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Forward substitution:</strong> Solve <Math>{`L\\mathbf{c} = \\mathbf{b}`}</Math> for <Math>{`\\mathbf{c}`}</Math>.</li>
          <li><strong>Back substitution:</strong> Solve <Math>{`U\\mathbf{x} = \\mathbf{c}`}</Math> for <Math>{`\\mathbf{x}`}</Math>.</li>
        </ol>
      </Definition>

      <h2>Why Factor?</h2>

      <p>
        For a single <Math>{`\\mathbf{b}`}</Math>, elimination and <Math>LU</Math> do the same work. But if you need to solve
        <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> for <em>many different</em> <Math>{`\\mathbf{b}`}</Math>'s, the <Math>LU</Math> factorization is computed once and reused!
      </p>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-amber-500/20">
        <p className="font-semibold text-amber-400 mb-2">MATLAB Command</p>
        <p className="text-dark-300 font-mono text-sm">
          [L, U] = lu(A)
        </p>
        <p className="text-dark-400 text-sm mt-2">
          The command <code>x = A\b</code> uses LU factorization internally.
        </p>
      </div>

      <h2>Cost of Elimination</h2>

      <Theorem
        title="Operation Count"
        className="my-6"
        proof={
          <>
            <p>At step <Math>k</Math> of elimination, we work on an <Math>(n-k+1) \times (n-k+1)</Math> submatrix.</p>
            <p className="mt-2">The work at step <Math>k</Math> is approximately <Math>(n-k)^2</Math> operations (one multiplication and subtraction for each entry below and to the right of pivot <Math>k</Math>).</p>
            <p className="mt-2">Total work:</p>
            <MathBlock>{`\\sum_{k=1}^{n-1}(n-k)^2 = (n-1)^2 + (n-2)^2 + \\cdots + 1^2 = \\frac{(n-1)n(2n-1)}{6} \\approx \\frac{n^3}{3}`}</MathBlock>
            <p>For back/forward substitution: each of the <Math>n</Math> equations involves about <Math>n</Math> operations, giving <Math>n^2</Math> total.</p>
          </>
        }
      >
        <p>
          For an <Math>n \times n</Math> matrix, elimination requires approximately:
        </p>
        <MathBlock>
          {`\\frac{n^3}{3} \\text{ multiplications/subtractions (to find } L \\text{ and } U\\text{)}`}
        </MathBlock>
        <p className="mt-2">
          Each solve <Math>{`L\\mathbf{c} = \\mathbf{b}`}</Math> and <Math>{`U\\mathbf{x} = \\mathbf{c}`}</Math> requires only <Math>n^2</Math> operations.
        </p>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span><Math>A = LU</Math>: <Math>L</Math> is lower triangular (1's on diagonal, multipliers below), <Math>U</Math> is upper triangular (pivots on diagonal).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Solve <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> in two steps: <Math>{`L\\mathbf{c} = \\mathbf{b}`}</Math> then <Math>{`U\\mathbf{x} = \\mathbf{c}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Factoring costs <Math>n^3/3</Math> operations; each solve costs <Math>n^2</Math> operations.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>For many right-hand sides, factor once and solve many times.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
