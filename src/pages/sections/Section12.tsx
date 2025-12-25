import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section12() {
  return (
    <LessonLayout sectionId={12}>
      {/* Introduction */}
      <p>
        The <strong>nullspace</strong> of a matrix <Math>A</Math> contains all solutions to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>.
        It is a subspace that tells us about the "hidden" structure of <Math>A</Math>.
      </p>

      <h2>Definition of the Nullspace</h2>

      <Definition title="Nullspace" className="my-6">
        <p>
          The <strong>nullspace</strong> of <Math>A</Math>, written <Math>N(A)</Math>, is the set of all solutions
          to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>:
        </p>
        <MathBlock>
          {`N(A) = \\{ \\mathbf{x} : A\\mathbf{x} = \\mathbf{0} \\}`}
        </MathBlock>
        <p className="mt-2">
          The nullspace is always a subspace of <Math>{`\\mathbf{R}^n`}</Math> (where <Math>A</Math> is <Math>m \times n</Math>).
        </p>
      </Definition>

      <Example title="Computing a Nullspace" className="my-6">
        <p>Find the nullspace of this matrix:</p>
        <MathBlock>
          {`A\\mathbf{x} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 8 \\end{bmatrix}\\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Elimination gives <Math>x_1 = 0</Math> and <Math>x_2 = 0</Math>. The nullspace is <Math>{`N(A) = \\mathbf{Z}`}</Math> (just the zero vector).
        </p>
        <p className="mt-2 text-primary-400">
          <Math>A</Math> is invertible, so the only solution to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math> is <Math>{`\\mathbf{x} = \\mathbf{0}`}</Math>.
        </p>
      </Example>

      <h2>Rectangular Matrices and Free Variables</h2>

      <p>
        When <Math>A</Math> has more columns than rows (more unknowns than equations), the nullspace is bigger
        than just <Math>{`\\mathbf{0}`}</Math>. Some variables are <strong>free</strong>.
      </p>

      <Example title="Nullspace with Free Variables" className="my-6">
        <MathBlock>
          {`C = \\begin{bmatrix} 1 & 2 & 2 & 4 \\\\ 3 & 8 & 6 & 16 \\end{bmatrix} \\rightarrow U = \\begin{bmatrix} 1 & 2 & 2 & 4 \\\\ 0 & 2 & 0 & 4 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Pivots are in columns 1 and 2. Columns 3 and 4 are <strong>free columns</strong>.
        </p>
        <p className="mt-2">
          Set <Math>x_3 = 1, x_4 = 0</Math>: special solution <Math>{`\\mathbf{s}_1 = (-2, 0, 1, 0)`}</Math>
        </p>
        <p className="mt-2">
          Set <Math>x_3 = 0, x_4 = 1</Math>: special solution <Math>{`\\mathbf{s}_2 = (0, -2, 0, 1)`}</Math>
        </p>
      </Example>

      <h2>The Reduced Row Echelon Form</h2>

      <Definition title="Reduced Row Echelon Form (RREF)" className="my-6">
        <p>
          The <strong>reduced row echelon form</strong> <Math>{`R = \\text{rref}(A)`}</Math> has:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Zeros <strong>above</strong> and below each pivot</li>
          <li><strong>1</strong> in each pivot position</li>
        </ol>
        <MathBlock>
          {`R = \\begin{bmatrix} 1 & 0 & 2 & 0 \\\\ 0 & 1 & 0 & 2 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          The pivot columns of <Math>R</Math> contain the identity matrix <Math>I</Math>.
        </p>
      </Definition>

      <Theorem
        title="Special Solutions from R"
        className="my-6"
        proof={
          <>
            <p>In the reduced row echelon form <Math>R</Math>, each pivot column contains exactly one 1 (the pivot) with zeros elsewhere. The remaining <Math>n - r</Math> columns are free columns.</p>
            <p className="mt-2">To solve <Math>{`R\\mathbf{x} = \\mathbf{0}`}</Math>, we can assign any value to a free variable. Setting one free variable to 1 and all others to 0 forces specific values for the pivot variables (determined by the free column).</p>
            <p className="mt-2">This gives <Math>n - r</Math> linearly independent special solutions—one for each free variable. Any solution to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math> is a linear combination of these special solutions, so <Math>{`\\dim N(A) = n - r`}</Math>.</p>
          </>
        }
      >
        <p>
          If <Math>R</Math> has <Math>r</Math> pivots in an <Math>m \times n</Math> matrix, there are <Math>n - r</Math> free
          variables and <Math>n - r</Math> special solutions in the nullspace.
        </p>
        <MathBlock>
          {`\\dim N(A) = n - r`}
        </MathBlock>
      </Theorem>

      <h2>The Nullspace Matrix</h2>

      <Definition title="Nullspace Matrix N" className="my-6">
        <p>
          The columns of the <strong>nullspace matrix</strong> <Math>N</Math> are the special solutions.
          Every solution to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math> is a combination of these columns:
        </p>
        <MathBlock>
          {`\\mathbf{x} = c_1\\mathbf{s}_1 + c_2\\mathbf{s}_2 + \\cdots + c_{n-r}\\mathbf{s}_{n-r}`}
        </MathBlock>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>The nullspace <Math>N(A)</Math> is all solutions to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>. It is a subspace of <Math>{`\\mathbf{R}^n`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Elimination produces the echelon form <Math>U</Math> and (going further) <Math>{`R = \\text{rref}(A)`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span><strong>Free columns</strong> have no pivots. Free variables can be assigned any value.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Each free variable produces one <strong>special solution</strong> to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>If there are <Math>r</Math> pivots, the nullspace has dimension <Math>n - r</Math>.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
