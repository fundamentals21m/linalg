import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section18() {
  return (
    <LessonLayout sectionId={18}>
      {/* Introduction */}
      <p>
        When <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> has no exact solution, <strong>least squares</strong> finds the
        <Math>{`\\hat{x}`}</Math> that minimizes the error <Math>{`\\|A\\mathbf{x} - \\mathbf{b}\\|^2`}</Math>.
      </p>

      <h2>The Least Squares Problem</h2>

      <Definition title="Least Squares Solution" className="my-6">
        <p>
          The <strong>least squares solution</strong> <Math>{`\\hat{x}`}</Math> minimizes the sum of squared errors:
        </p>
        <MathBlock>
          {`E = \\|A\\mathbf{x} - \\mathbf{b}\\|^2 = \\sum_{i=1}^{m} (\\text{error}_i)^2`}
        </MathBlock>
        <p className="mt-2">
          <Math>{`\\hat{x}`}</Math> is found from the <strong>normal equations</strong>: <Math>{`A^TA\\hat{x} = A^T\\mathbf{b}`}</Math>
        </p>
      </Definition>

      <h2>Fitting a Straight Line</h2>

      <Example title="Best-Fit Line Through Data Points" className="my-6">
        <p>Fit a line <Math>y = C + Dt</Math> through points <Math>(0,6)</Math>, <Math>(1,0)</Math>, <Math>(2,0)</Math>:</p>
        <MathBlock>
          {`\\begin{aligned}
C + D(0) &= 6 \\\\
C + D(1) &= 0 \\\\
C + D(2) &= 0
\\end{aligned}`}
        </MathBlock>
        <p className="mt-2">In matrix form <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math>:</p>
        <MathBlock>
          {`\\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix}\\begin{bmatrix} C \\\\ D \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ 0 \\\\ 0 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Three equations, two unknowns—no exact solution exists. We need least squares!
        </p>
      </Example>

      <h2>Setting Up the Normal Equations</h2>

      <Example title="Solving the Normal Equations" className="my-6">
        <MathBlock>
          {`A^TA = \\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix}\\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix} = \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}`}
        </MathBlock>
        <MathBlock>
          {`A^T\\mathbf{b} = \\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix}\\begin{bmatrix} 6 \\\\ 0 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ 0 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">Normal equations:</p>
        <MathBlock>
          {`\\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}\\begin{bmatrix} C \\\\ D \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ 0 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">Solution: <Math>{`\\hat{x} = (C, D) = (5, -3)`}</Math></p>
        <p className="mt-2 text-primary-400">
          Best-fit line: <Math>y = 5 - 3t</Math>
        </p>
      </Example>

      <h2>Why Does This Work?</h2>

      <Theorem
        title="Minimizing the Error"
        className="my-6"
        proof={
          <>
            <p>Write <Math>{`\\mathbf{b} = \\mathbf{p} + \\mathbf{e}`}</Math> where <Math>{`\\mathbf{p}`}</Math> is in <Math>C(A)</Math> and <Math>{`\\mathbf{e}`}</Math> is perpendicular to <Math>C(A)</Math>.</p>
            <p className="mt-2">For any <Math>{`\\mathbf{x}`}</Math>, we have <Math>{`A\\mathbf{x} \\in C(A)`}</Math>. The squared error is:</p>
            <MathBlock>{`\\|A\\mathbf{x} - \\mathbf{b}\\|^2 = \\|A\\mathbf{x} - \\mathbf{p} - \\mathbf{e}\\|^2 = \\|A\\mathbf{x} - \\mathbf{p}\\|^2 + \\|\\mathbf{e}\\|^2`}</MathBlock>
            <p>The cross term vanishes because <Math>{`(A\\mathbf{x} - \\mathbf{p})`}</Math> is in <Math>C(A)</Math> and <Math>{`\\mathbf{e}`}</Math> is perpendicular to <Math>C(A)</Math>.</p>
            <p className="mt-2">Since <Math>{`\\|\\mathbf{e}\\|^2`}</Math> is fixed, the minimum occurs when <Math>{`A\\mathbf{x} = \\mathbf{p}`}</Math>. At this point, <Math>{`A\\mathbf{x} - \\mathbf{b} = -\\mathbf{e}`}</Math> is perpendicular to <Math>C(A)</Math>.</p>
          </>
        }
      >
        <p>
          The error <Math>{`E = \\|A\\mathbf{x} - \\mathbf{b}\\|^2`}</Math> is minimized when
          <Math>{`A\\mathbf{x} - \\mathbf{b}`}</Math> is perpendicular to the column space of <Math>A</Math>.
        </p>
        <p className="mt-2">
          This perpendicularity condition is exactly: <Math>{`A^T(A\\mathbf{x} - \\mathbf{b}) = \\mathbf{0}`}</Math>
        </p>
        <p className="mt-2">
          Rearranging: <Math>{`A^TA\\mathbf{x} = A^T\\mathbf{b}`}</Math>
        </p>
      </Theorem>

      <h2>Computing the Error</h2>

      <Example title="The Minimum Error" className="my-6">
        <p>With <Math>{`\\hat{x} = (5, -3)`}</Math>:</p>
        <MathBlock>
          {`\\mathbf{p} = A\\hat{x} = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix}\\begin{bmatrix} 5 \\\\ -3 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 2 \\\\ -1 \\end{bmatrix}`}
        </MathBlock>
        <MathBlock>
          {`\\mathbf{e} = \\mathbf{b} - \\mathbf{p} = \\begin{bmatrix} 6 \\\\ 0 \\\\ 0 \\end{bmatrix} - \\begin{bmatrix} 5 \\\\ 2 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ -2 \\\\ 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Minimum error: <Math>{`E = \\|\\mathbf{e}\\|^2 = 1 + 4 + 1 = 6`}</Math>
        </p>
      </Example>

      <h2>When Is <Math>A^TA</Math> Invertible?</h2>

      <Theorem
        title="Invertibility of A^T A"
        className="my-6"
        proof={
          <>
            <p>We show <Math>A^TA</Math> is invertible by proving its nullspace is trivial.</p>
            <p className="mt-2">Suppose <Math>{`A^TA\\mathbf{x} = \\mathbf{0}`}</Math>. Multiply both sides by <Math>{`\\mathbf{x}^T`}</Math>:</p>
            <MathBlock>{`\\mathbf{x}^TA^TA\\mathbf{x} = 0 \\quad \\Rightarrow \\quad (A\\mathbf{x})^T(A\\mathbf{x}) = 0 \\quad \\Rightarrow \\quad \\|A\\mathbf{x}\\|^2 = 0`}</MathBlock>
            <p>So <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>. If <Math>A</Math> has independent columns, then <Math>{`\\mathbf{x} = \\mathbf{0}`}</Math>.</p>
            <p className="mt-2">Therefore <Math>{`N(A^TA) = \\{\\mathbf{0}\\}`}</Math>, so <Math>A^TA</Math> is invertible.</p>
            <p className="mt-2">Note: This also shows <Math>N(A^TA) = N(A)</Math> for any matrix <Math>A</Math>.</p>
          </>
        }
      >
        <p>
          <Math>A^TA</Math> is invertible when <Math>A</Math> has <strong>independent columns</strong>.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>If <Math>A</Math> has rank <Math>n</Math> (full column rank), then <Math>A^TA</Math> is <Math>n \times n</Math> and invertible.</li>
          <li>The nullspace of <Math>A</Math> is <Math>{`\\mathbf{Z}`}</Math> (only zero).</li>
          <li>The least squares solution <Math>{`\\hat{x}`}</Math> is unique.</li>
        </ul>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Least squares solves <Math>{`A^TA\\hat{x} = A^T\\mathbf{b}`}</Math> when <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> has no solution.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>The solution <Math>{`\\hat{x}`}</Math> minimizes <Math>{`E = \\|A\\mathbf{x} - \\mathbf{b}\\|^2`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span><Math>{`\\mathbf{p} = A\\hat{x}`}</Math> is the projection of <Math>{`\\mathbf{b}`}</Math> onto the column space of <Math>A</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>The error <Math>{`\\mathbf{e} = \\mathbf{b} - \\mathbf{p}`}</Math> is perpendicular to the column space.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span><Math>A^TA</Math> is invertible when <Math>A</Math> has independent columns.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
