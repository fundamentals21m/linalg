import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section05() {
  return (
    <LessonLayout sectionId={5}>
      {/* Introduction */}
      <p>
        <strong>Elimination</strong> is the most important algorithm in linear algebra. It transforms the
        original system <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> into an <strong>upper triangular</strong> system{` `}
        <Math>{`U\\mathbf{x} = \\mathbf{c}`}</Math> that is easy to solve.
      </p>

      <h2>The Goal: Upper Triangular Form</h2>

      <Definition title="Upper Triangular Matrix" className="my-6">
        <p>
          A matrix <Math>U</Math> is <strong>upper triangular</strong> if all entries below the main diagonal are zero.
          The entries on the diagonal are called <strong>pivots</strong>.
        </p>
        <MathBlock>
          {`U = \\begin{bmatrix} \\mathbf{2} & 4 & -2 \\\\ 0 & \\mathbf{1} & 1 \\\\ 0 & 0 & \\mathbf{4} \\end{bmatrix} \\quad \\text{pivots: } 2, 1, 4`}
        </MathBlock>
      </Definition>

      <h2>Elimination by Example</h2>

      <p>Consider this system of three equations:</p>

      <MathBlock className="my-4">
        {`\\begin{cases} 2x + 4y - 2z = 2 \\\\ 4x + 9y - 3z = 8 \\\\ -2x - 3y + 7z = 10 \\end{cases}`}
      </MathBlock>

      <Example title="Step 1: Eliminate x from equations 2 and 3" className="my-6">
        <p>
          The first <strong>pivot</strong> is the boldface <Math>{`\\mathbf{2}`}</Math> in position (1,1).
        </p>
        <p className="mt-2">
          <strong>Multiplier</strong> <Math>{`\\ell_{21} = 4/2 = 2`}</Math>: Subtract 2 times equation 1 from equation 2.
        </p>
        <p className="mt-2">
          <strong>Multiplier</strong> <Math>{`\\ell_{31} = -2/2 = -1`}</Math>: Subtract <Math>(-1)</Math> times equation 1 from equation 3.
        </p>
        <MathBlock>
          {`\\begin{cases} 2x + 4y - 2z = 2 \\\\ \\phantom{2x +} 1y + 1z = 4 \\\\ \\phantom{2x +} 1y + 5z = 12 \\end{cases}`}
        </MathBlock>
        <p className="mt-2 text-dark-400">
          The variable <Math>x</Math> has been eliminated from equations 2 and 3!
        </p>
      </Example>

      <Example title="Step 2: Eliminate y from equation 3" className="my-6">
        <p>
          The second <strong>pivot</strong> is <Math>{`\\mathbf{1}`}</Math> in position (2,2).
        </p>
        <p className="mt-2">
          <strong>Multiplier</strong> <Math>{`\\ell_{32} = 1/1 = 1`}</Math>: Subtract equation 2 from equation 3.
        </p>
        <MathBlock>
          {`\\begin{cases} 2x + 4y - 2z = 2 \\\\ \\phantom{2x +} 1y + 1z = 4 \\\\ \\phantom{2x + 1y +} 4z = 8 \\end{cases}`}
        </MathBlock>
        <p className="mt-2 text-dark-400">
          This is now upper triangular form <Math>{`U\\mathbf{x} = \\mathbf{c}`}</Math>!
        </p>
      </Example>

      <h2>Back Substitution</h2>

      <p>
        The triangular system <Math>{`U\\mathbf{x} = \\mathbf{c}`}</Math> is solved by <strong>back substitution</strong>,
        working from the last equation to the first.
      </p>

      <Example title="Solving by Back Substitution" className="my-6">
        <p>From the triangular system:</p>
        <MathBlock>
          {`\\begin{aligned}
            4z &= 8 \\quad \\Rightarrow \\quad z = 2 \\\\
            y + z &= 4 \\quad \\Rightarrow \\quad y = 4 - 2 = 2 \\\\
            2x + 4y - 2z &= 2 \\quad \\Rightarrow \\quad x = \\frac{2 - 8 + 4}{2} = -1
          \\end{aligned}`}
        </MathBlock>
        <p className="mt-2">
          <strong>Solution:</strong> <Math>(x, y, z) = (-1, 2, 2)</Math>
        </p>
      </Example>

      <h2>The Multipliers</h2>

      <Definition title="Multiplier" className="my-6">
        <p>
          The <strong>multiplier</strong> <Math>{`\\ell_{ij}`}</Math> is the number we multiply row <Math>j</Math> by,
          before subtracting from row <Math>i</Math>:
        </p>
        <MathBlock>
          {`\\ell_{ij} = \\frac{\\text{entry to eliminate in row } i}{\\text{pivot in row } j}`}
        </MathBlock>
        <p className="mt-2">
          <strong>Important:</strong> Pivots can never be zero! (We may need to exchange rows.)
        </p>
      </Definition>

      <h2>Elimination from <Math>A</Math> to <Math>U</Math></h2>

      <p>
        For an <Math>n \times n</Math> system, elimination proceeds column by column:
      </p>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ol className="space-y-3 text-dark-200 list-decimal list-inside">
          <li>
            <strong>Column 1:</strong> Use the first equation to create zeros below the first pivot.
          </li>
          <li>
            <strong>Column 2:</strong> Use the new equation 2 to create zeros below the second pivot.
          </li>
          <li>
            <strong>Columns 3 to n:</strong> Keep going to find all <Math>n</Math> pivots and the upper triangular <Math>U</Math>.
          </li>
        </ol>
      </div>

      <Example title="Elimination in Matrix Form" className="my-6">
        <MathBlock>
          {`A = \\begin{bmatrix} 1 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix} \\longrightarrow \\begin{bmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix} \\longrightarrow \\begin{bmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix} = U`}
        </MathBlock>
        <p className="mt-2">
          The pivots are <Math>1, 1, 1</Math> on the diagonal of <Math>U</Math>.
        </p>
      </Example>

      <h2>When Elimination Fails</h2>

      <Theorem
        title="Breakdown of Elimination"
        className="my-6"
        proof={
          <>
            <p>
              Elimination produces the factorization <Math>A = LU</Math> where <Math>L</Math> is lower triangular with 1s on the diagonal
              and <Math>U</Math> is upper triangular with pivots on the diagonal.
            </p>
            <p className="mt-2">
              If a permanent zero pivot occurs (with all zeros below it in that column), then <Math>U</Math> cannot have <Math>n</Math> nonzero pivots.
            </p>
            <p className="mt-2">
              Since <Math>{`\\det(A) = \\det(L) \\cdot \\det(U) = 1 \\cdot (\\text{product of pivots})`}</Math>, a zero pivot means <Math>{`\\det(A) = 0`}</Math>,
              so <Math>A</Math> is singular.
            </p>
            <p className="mt-2">
              For a singular matrix, either <Math>{`\\mathbf{b}`}</Math> is not in the column space (no solution), or <Math>{`\\mathbf{b}`}</Math> is in the
              column space and any nullspace vector can be added (infinitely many solutions).
            </p>
          </>
        }
      >
        <p>
          Elimination fails when:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>A zero appears in a pivot position with no nonzero entry below to exchange.</li>
          <li>This means the matrix <Math>A</Math> is <strong>not invertible</strong> (singular).</li>
        </ul>
        <p className="mt-2">
          In this case, <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> has either <strong>no solution</strong> or <strong>infinitely many solutions</strong>.
        </p>
      </Theorem>

      <Example title="Failure: No Solution" className="my-6">
        <MathBlock>
          {`\\begin{cases} x + y + z = 7 \\\\ 0y - 2z = -2 \\\\ 0y + 2z = 10 \\end{cases}`}
        </MathBlock>
        <p className="mt-2">
          There is <strong>no pivot in column 2</strong>. Further elimination gives <Math>0z = 8</Math>, which is impossible.
          The three planes don't meet at any point.
        </p>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>A linear system <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> becomes <strong>upper triangular</strong> <Math>{`U\\mathbf{x} = \\mathbf{c}`}</Math> after elimination.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>We subtract <Math>{`\\ell_{ij}`}</Math> times equation <Math>j</Math> from equation <Math>i</Math>, to make the <Math>(i, j)</Math> entry zero.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>The multiplier is <Math>{`\\ell_{ij} = \\frac{\\text{entry to eliminate}}{\\text{pivot}}`}</Math>. <strong>Pivots cannot be zero!</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>When zero is in the pivot position, <strong>exchange rows</strong> if there is a nonzero below it.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>The upper triangular <Math>{`U\\mathbf{x} = \\mathbf{c}`}</Math> is solved by <strong>back substitution</strong> (starting at the bottom).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">6.</span>
            <span>When breakdown is permanent, <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> has no solution or infinitely many.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
