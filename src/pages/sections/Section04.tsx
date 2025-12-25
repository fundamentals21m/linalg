import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section04() {
  return (
    <LessonLayout sectionId={4}>
      {/* Introduction */}
      <p>
        This chapter solves <Math>n</Math> equations in <Math>n</Math> unknowns. We start with the simplest case:
        two equations in two unknowns. The key is to understand <strong>two different pictures</strong> of what
        those equations mean.
      </p>

      <h2>The Row Picture</h2>

      <p>
        Each equation represents a <strong>line</strong> (in 2D) or a <strong>plane</strong> (in 3D) or a
        <strong>hyperplane</strong> (in higher dimensions). The solution is where the lines/planes intersect.
      </p>

      <Example title="Two Equations in Two Unknowns" className="my-6">
        <p>Consider the system:</p>
        <MathBlock>
          {`\\begin{cases} x - 2y = 1 \\\\ 3x + 2y = 11 \\end{cases}`}
        </MathBlock>
        <p className="mt-2">
          <strong>Row picture:</strong> Each equation is a line. The solution <Math>(x, y) = (3, 1)</Math> is
          where the two lines intersect.
        </p>
      </Example>

      <h2>The Column Picture</h2>

      <p>
        The column picture looks at the same equations in a completely different way. The left side of the
        vector equation is a <em>linear combination</em> of the columns. The problem is to find the right
        coefficients <Math>x = 3</Math> and <Math>y = 1</Math>.
      </p>

      <Definition title="Column Picture" className="my-6">
        <p>
          The equation <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> asks: what combination of the columns of <Math>A</Math> produces <Math>{`\\mathbf{b}`}</Math>?
        </p>
        <MathBlock>
          {`x \\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} + y \\begin{bmatrix} -2 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 11 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          We need <Math>x = 3</Math> times column 1, plus <Math>y = 1</Math> times column 2, to get <Math>{`\\mathbf{b}`}</Math>.
        </p>
      </Definition>

      <Example title="Verifying the Column Picture" className="my-6">
        <MathBlock>
          {`3 \\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} + 1 \\begin{bmatrix} -2 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 9 \\end{bmatrix} + \\begin{bmatrix} -2 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 11 \\end{bmatrix} = \\mathbf{b}`}
        </MathBlock>
      </Example>

      <h2>The Matrix Form <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math></h2>

      <p>
        We combine the equations into a single matrix problem. The <strong>coefficient matrix</strong> <Math>A</Math> contains
        all the coefficients from the left side of the equations:
      </p>

      <Definition title="Matrix Equation" className="my-6">
        <MathBlock>
          {`A\\mathbf{x} = \\mathbf{b} \\quad \\text{is} \\quad \\begin{bmatrix} 1 & -2 \\\\ 3 & 2 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 11 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          The rows of <Math>A</Math> give the row picture (intersecting lines). The columns of <Math>A</Math> give
          the column picture (combining vectors).
        </p>
      </Definition>

      <h2>Three Equations in Three Unknowns</h2>

      <p>
        The three unknowns are <Math>x, y, z</Math>. We have three linear equations:
      </p>

      <MathBlock className="my-4">
        {`\\begin{cases} x + 2y + 3z = 6 \\\\ 2x + 5y + 2z = 4 \\\\ 6x - 3y + z = 2 \\end{cases}`}
      </MathBlock>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-dark-800/50 rounded-xl p-4 border border-primary-500/20">
          <p className="font-semibold text-primary-400 mb-2">Row Picture</p>
          <p className="text-dark-300 text-sm">
            Three planes meeting at a single point.
          </p>
        </div>
        <div className="bg-dark-800/50 rounded-xl p-4 border border-amber-500/20">
          <p className="font-semibold text-amber-400 mb-2">Column Picture</p>
          <p className="text-dark-300 text-sm">
            Combine three columns to produce <Math>{`\\mathbf{b} = (6, 4, 2)`}</Math>.
          </p>
        </div>
      </div>

      <h2>Looking Ahead: Key Ideas</h2>

      <p>
        This chapter will develop <strong>elimination</strong>—the systematic method to solve <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math>.
        Here are the four key steps:
      </p>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ol className="space-y-3 text-dark-200 list-decimal list-inside">
          <li>
            <strong>Elimination</strong> goes from <Math>A</Math> to a triangular matrix <Math>U</Math> by a sequence
            of matrix steps <Math>{`E_{ij}`}</Math>.
          </li>
          <li>
            The triangular system is solved by <strong>back substitution</strong>: working bottom to top.
          </li>
          <li>
            In matrix language, <Math>A</Math> is factored into <Math>LU = </Math> (lower triangular)(upper triangular).
          </li>
          <li>
            Elimination succeeds if <Math>A</Math> is invertible. (But it may need row exchanges.)
          </li>
        </ol>
      </div>

      <Theorem
        title="When Does the Solution Exist?"
        className="my-6"
        proof={
          <>
            <p><strong>Case 1 (A invertible):</strong> If <Math>{`A^{-1}`}</Math> exists, then <Math>{`\\mathbf{x} = A^{-1}\\mathbf{b}`}</Math> is the unique solution, as shown in the Existence and Uniqueness theorem.</p>
            <p className="mt-3"><strong>Case 2 (A not invertible):</strong> If <Math>A</Math> is singular, then <Math>{`\\det(A) = 0`}</Math>, meaning the columns of <Math>A</Math> are linearly dependent.</p>
            <p>If <Math>{`\\mathbf{b}`}</Math> is not in the column space of <Math>A</Math>, there is no solution (the system is inconsistent).</p>
            <p>If <Math>{`\\mathbf{b}`}</Math> is in the column space, there are infinitely many solutions because we can add any multiple of a nonzero solution to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>.</p>
          </>
        }
      >
        <p>
          For a square matrix <Math>A</Math> with <Math>n</Math> equations in <Math>n</Math> unknowns:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>If <Math>A</Math> is <strong>invertible</strong>, there is exactly <strong>one solution</strong> <Math>{`\\mathbf{x} = A^{-1}\\mathbf{b}`}</Math>.</li>
          <li>If <Math>A</Math> is <strong>not invertible</strong>, there are either <strong>no solutions</strong> or <strong>infinitely many</strong>.</li>
        </ul>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>The <strong>row picture</strong> shows <Math>n</Math> planes meeting at a single point (the solution).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>The <strong>column picture</strong> combines the columns of <Math>A</Math> to produce <Math>{`\\mathbf{b}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>The matrix equation <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> contains both pictures: rows for equations, columns for combinations.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>The column picture is easier to visualize in high dimensions—we combine <Math>n</Math> column vectors.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
