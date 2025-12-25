import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section03() {
  return (
    <LessonLayout sectionId={3}>
      {/* Introduction */}
      <p>
        This section starts with vectors and combines them using <strong>matrices</strong>.
        A matrix is a rectangular array of numbers. The matrix <Math>A</Math> "acts on" a vector <Math>{`\\mathbf{x}`}</Math> to
        produce the output <Math>{`A\\mathbf{x}`}</Math>. This is the key operation of linear algebra.
      </p>

      <h2>What is a Matrix?</h2>

      <Definition title="Matrix" className="my-6">
        <p>
          A <strong>matrix</strong> is a rectangular array of numbers with <Math>m</Math> rows and <Math>n</Math> columns.
          We say <Math>A</Math> is an "<Math>m</Math> by <Math>n</Math>" matrix, written as <Math>m \times n</Math>.
        </p>
        <MathBlock>
          {`A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{bmatrix} \\quad \\text{is a } 3 \\times 2 \\text{ matrix: } m = 3 \\text{ rows and } n = 2 \\text{ columns.}`}
        </MathBlock>
      </Definition>

      <h2>Matrix Times Vector</h2>

      <p>
        The most important operation is multiplying a matrix <Math>A</Math> by a vector <Math>{`\\mathbf{x}`}</Math>.
        There are <em>two ways</em> to think about <Math>{`A\\mathbf{x}`}</Math>:
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-dark-800/50 rounded-xl p-4 border border-primary-500/20">
          <p className="font-semibold text-primary-400 mb-2">Column Picture</p>
          <p className="text-dark-300 text-sm">
            <Math>{`A\\mathbf{x}`}</Math> is a <strong>linear combination of the columns</strong> of <Math>A</Math>.
          </p>
        </div>
        <div className="bg-dark-800/50 rounded-xl p-4 border border-amber-500/20">
          <p className="font-semibold text-amber-400 mb-2">Row Picture</p>
          <p className="text-dark-300 text-sm">
            Each component of <Math>{`A\\mathbf{x}`}</Math> is a <strong>dot product</strong> of a row with <Math>{`\\mathbf{x}`}</Math>.
          </p>
        </div>
      </div>

      <Definition title="Matrix-Vector Multiplication (Column View)" className="my-6">
        <p>
          If <Math>A</Math> has columns <Math>{`\\mathbf{u}, \\mathbf{v}, \\mathbf{w}`}</Math> and <Math>{`\\mathbf{x} = \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix}`}</Math>, then:
        </p>
        <MathBlock>
          {`A\\mathbf{x} = x_1\\mathbf{u} + x_2\\mathbf{v} + x_3\\mathbf{w}`}
        </MathBlock>
        <p className="mt-2">
          The output <Math>{`A\\mathbf{x}`}</Math> is a <strong>combination of the columns</strong> of <Math>A</Math>.
        </p>
      </Definition>

      <Example title="Matrix Times Vector (Combination of Columns)" className="my-6">
        <p>
          Consider the matrix and vector:
        </p>
        <MathBlock>
          {`A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{bmatrix} \\quad \\text{and} \\quad \\mathbf{x} = \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          The product <Math>{`A\\mathbf{x}`}</Math> is a combination of the two columns:
        </p>
        <MathBlock>
          {`A\\mathbf{x} = x_1 \\begin{bmatrix} 1 \\\\ 3 \\\\ 5 \\end{bmatrix} + x_2 \\begin{bmatrix} 2 \\\\ 4 \\\\ 6 \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <h2>Row Picture: Dot Products</h2>

      <p>
        Another way to compute <Math>{`A\\mathbf{x}`}</Math>: each component is a <strong>dot product</strong> of a row of <Math>A</Math> with <Math>{`\\mathbf{x}`}</Math>.
      </p>

      <Example title="Matrix Times Vector (Dot Products with Rows)" className="my-6">
        <MathBlock>
          {`\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{bmatrix} \\begin{bmatrix} 7 \\\\ 8 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot 7 + 2 \\cdot 8 \\\\ 3 \\cdot 7 + 4 \\cdot 8 \\\\ 5 \\cdot 7 + 6 \\cdot 8 \\end{bmatrix} = \\begin{bmatrix} 23 \\\\ 53 \\\\ 83 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Each entry is the dot product of one row with the vector <Math>(7, 8)</Math>.
        </p>
      </Example>

      <h2>Linear Equations <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math></h2>

      <p>
        Now comes the central problem of linear algebra: <strong>solving equations</strong>.
        Given a matrix <Math>A</Math> and a vector <Math>{`\\mathbf{b}`}</Math>, find <Math>{`\\mathbf{x}`}</Math> so that <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math>.
      </p>

      <Definition title="System of Linear Equations" className="my-6">
        <p>
          The matrix equation <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> represents a <strong>system of linear equations</strong>:
        </p>
        <MathBlock>
          {`\\begin{bmatrix} 2 & 5 \\\\ 3 & 7 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} b_1 \\\\ b_2 \\end{bmatrix} \\quad \\text{replaces} \\quad \\begin{cases} 2x_1 + 5x_2 = b_1 \\\\ 3x_1 + 7x_2 = b_2 \\end{cases}`}
        </MathBlock>
      </Definition>

      <p>
        This is the <em>inverse problem</em>—to find the input <Math>{`\\mathbf{x}`}</Math> that gives the desired output <Math>{`\\mathbf{b} = A\\mathbf{x}`}</Math>.
        The old question was: compute the linear combination <Math>{`x_1\\mathbf{u} + x_2\\mathbf{v} + x_3\\mathbf{w}`}</Math> to find <Math>{`\\mathbf{b}`}</Math>.
        The new question is: which combination of <Math>{`\\mathbf{u}, \\mathbf{v}, \\mathbf{w}`}</Math> produces a particular vector <Math>{`\\mathbf{b}`}</Math>?
      </p>

      <h2>The Inverse Matrix</h2>

      <p>
        The solution to <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> can be written as <Math>{`\\mathbf{x} = A^{-1}\\mathbf{b}`}</Math>, if <Math>A</Math> has an inverse.
        But some matrices don't allow <Math>{`A^{-1}`}</Math>!
      </p>

      <Definition title="Inverse Matrix" className="my-6">
        <p>
          A matrix <Math>A</Math> is <strong>invertible</strong> if there exists a matrix <Math>{`A^{-1}`}</Math> such that:
        </p>
        <MathBlock>
          {`A^{-1}A = I \\quad \\text{and} \\quad AA^{-1} = I`}
        </MathBlock>
        <p className="mt-2">
          When <Math>A</Math> is invertible, the solution to <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> is:
        </p>
        <MathBlock>
          {`\\mathbf{x} = A^{-1}\\mathbf{b}`}
        </MathBlock>
      </Definition>

      <Example title="A Difference Matrix and Its Inverse" className="my-6">
        <p>
          The "difference matrix" <Math>A</Math> and its inverse <Math>{`A^{-1}`}</Math> (the "sum matrix"):
        </p>
        <MathBlock>
          {`A = \\begin{bmatrix} 1 & 0 & 0 \\\\ -1 & 1 & 0 \\\\ 0 & -1 & 1 \\end{bmatrix} \\quad \\text{has inverse} \\quad A^{-1} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 1 & 1 & 0 \\\\ 1 & 1 & 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          The matrix <Math>A</Math> takes <em>differences</em>. The inverse <Math>{`A^{-1}`}</Math> takes <em>sums</em>.
        </p>
      </Example>

      <Theorem
        title="Existence and Uniqueness"
        className="my-6"
        proof={
          <>
            <p><strong>Existence:</strong> Given any <Math>{`\\mathbf{b}`}</Math>, set <Math>{`\\mathbf{x} = A^{-1}\\mathbf{b}`}</Math>. Then:</p>
            <MathBlock>{`A\\mathbf{x} = A(A^{-1}\\mathbf{b}) = (AA^{-1})\\mathbf{b} = I\\mathbf{b} = \\mathbf{b}`}</MathBlock>
            <p>So <Math>{`\\mathbf{x} = A^{-1}\\mathbf{b}`}</Math> is indeed a solution.</p>
            <p className="mt-3"><strong>Uniqueness:</strong> Suppose <Math>{`\\mathbf{x}_1`}</Math> and <Math>{`\\mathbf{x}_2`}</Math> are both solutions:</p>
            <MathBlock>{`A\\mathbf{x}_1 = \\mathbf{b} \\quad \\text{and} \\quad A\\mathbf{x}_2 = \\mathbf{b}`}</MathBlock>
            <p>Multiplying both sides by <Math>{`A^{-1}`}</Math>:</p>
            <MathBlock>{`\\mathbf{x}_1 = A^{-1}\\mathbf{b} = \\mathbf{x}_2`}</MathBlock>
            <p>Therefore, the solution is unique.</p>
          </>
        }
      >
        <p>
          For an invertible matrix <Math>A</Math>:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>For every <Math>{`\\mathbf{b}`}</Math> there is <strong>one solution</strong> to <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math>.</li>
          <li>The matrix <Math>{`A^{-1}`}</Math> produces <Math>{`\\mathbf{x} = A^{-1}\\mathbf{b}`}</Math>.</li>
        </ul>
      </Theorem>

      <h2>When There Is No Inverse</h2>

      <p>
        Not all matrices are invertible. When <Math>A</Math> is not invertible, the system <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> either has:
      </p>

      <ul className="list-disc list-inside my-4 space-y-2 text-dark-300">
        <li><strong>No solution</strong> (the equations are inconsistent)</li>
        <li><strong>Infinitely many solutions</strong> (the equations are redundant)</li>
      </ul>

      <Example title="A Non-Invertible Matrix" className="my-6">
        <p>
          The cyclic difference matrix <Math>C</Math> is not invertible:
        </p>
        <MathBlock>
          {`C\\mathbf{x} = \\begin{bmatrix} 1 & 0 & -1 \\\\ -1 & 1 & 0 \\\\ 0 & -1 & 1 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = \\begin{bmatrix} x_1 - x_3 \\\\ x_2 - x_1 \\\\ x_3 - x_2 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          When <Math>{`C\\mathbf{x} = \\mathbf{0}`}</Math>, every constant vector <Math>{`\\mathbf{x} = (c, c, c)`}</Math> is a solution!
          There are <strong>infinitely many solutions</strong> to <Math>{`C\\mathbf{x} = \\mathbf{0}`}</Math>.
        </p>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>A matrix <Math>A</Math> with <Math>m</Math> rows and <Math>n</Math> columns multiplies a vector <Math>{`\\mathbf{x}`}</Math> with <Math>n</Math> components to produce <Math>{`A\\mathbf{x}`}</Math> with <Math>m</Math> components.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span><Math>{`A\\mathbf{x}`}</Math> is a <strong>combination of the columns</strong> of <Math>A</Math>. The coefficients are the components of <Math>{`\\mathbf{x}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Each component of <Math>{`A\\mathbf{x}`}</Math> is the <strong>dot product</strong> of a row of <Math>A</Math> with the vector <Math>{`\\mathbf{x}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>The equation <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> asks: which combination of columns gives <Math>{`\\mathbf{b}`}</Math>?</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>If <Math>A</Math> is invertible, the solution is <Math>{`\\mathbf{x} = A^{-1}\\mathbf{b}`}</Math>. But not all matrices have inverses!</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
