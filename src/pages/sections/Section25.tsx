import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section25() {
  return (
    <LessonLayout sectionId={25}>
      {/* Introduction */}
      <p>
        Eigenvalues reveal the behavior of <strong>differential equations</strong>. The solution to
        <Math>{`\\mathbf{u}' = A\\mathbf{u}`}</Math> involves <Math>{`e^{\\lambda t}`}</Math>, and <Math>\lambda</Math>
        determines stability.
      </p>

      <h2>Systems of Differential Equations</h2>

      <Definition title="First-Order System" className="my-6">
        <p>
          A system of first-order linear differential equations:
        </p>
        <MathBlock>
          {`\\frac{d\\mathbf{u}}{dt} = A\\mathbf{u}`}
        </MathBlock>
        <p className="mt-2">
          If <Math>A</Math> were a number, the solution would be <Math>{`u = e^{at}u_0`}</Math>.
          For matrices, we use eigenvalues!
        </p>
      </Definition>

      <h2>The Solution Using Eigenvalues</h2>

      <Theorem
        title="Solution to u' = Au"
        className="my-6"
        proof={
          <>
            <p>We verify <Math>{`\\mathbf{u}(t) = e^{\\lambda t}\\mathbf{x}`}</Math> satisfies <Math>{`\\mathbf{u}' = A\\mathbf{u}`}</Math>:</p>
            <p className="mt-2"><strong>Left side:</strong> <Math>{`\\frac{d}{dt}(e^{\\lambda t}\\mathbf{x}) = \\lambda e^{\\lambda t}\\mathbf{x}`}</Math></p>
            <p className="mt-2"><strong>Right side:</strong> <Math>{`A(e^{\\lambda t}\\mathbf{x}) = e^{\\lambda t}(A\\mathbf{x}) = e^{\\lambda t}(\\lambda\\mathbf{x}) = \\lambda e^{\\lambda t}\\mathbf{x}`}</Math></p>
            <p className="mt-2">The sides are equal, confirming <Math>{`e^{\\lambda t}\\mathbf{x}`}</Math> is a solution. With <Math>n</Math> independent eigenvectors, the general solution is a linear combination.</p>
          </>
        }
      >
        <p>
          If <Math>{`\\mathbf{x}`}</Math> is an eigenvector with eigenvalue <Math>\lambda</Math>,
          then <Math>{`\\mathbf{u}(t) = e^{\\lambda t}\\mathbf{x}`}</Math> is a solution.
        </p>
        <MathBlock>
          {`\\frac{d}{dt}(e^{\\lambda t}\\mathbf{x}) = \\lambda e^{\\lambda t}\\mathbf{x} = A(e^{\\lambda t}\\mathbf{x}) \\quad \\checkmark`}
        </MathBlock>
        <p className="mt-2">
          The general solution is a combination of these eigensolutions.
        </p>
      </Theorem>

      <Example title="A 2×2 System" className="my-6">
        <MathBlock>
          {`\\frac{d\\mathbf{u}}{dt} = \\begin{bmatrix} 4 & -5 \\\\ 2 & -3 \\end{bmatrix}\\mathbf{u}`}
        </MathBlock>
        <p className="mt-2">
          Eigenvalues: <Math>\lambda_1 = 2</Math>, <Math>\lambda_2 = -1</Math><br />
          Eigenvectors: <Math>{`\\mathbf{x}_1 = (5, 2)`}</Math>, <Math>{`\\mathbf{x}_2 = (1, 1)`}</Math>
        </p>
        <MathBlock>
          {`\\mathbf{u}(t) = c_1 e^{2t}\\begin{bmatrix} 5 \\\\ 2 \\end{bmatrix} + c_2 e^{-t}\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <h2>Stability</h2>

      <Theorem
        title="Stability Conditions"
        className="my-6"
        proof={
          <>
            <p>The general solution is <Math>{`\\mathbf{u}(t) = c_1 e^{\\lambda_1 t}\\mathbf{x}_1 + \\cdots + c_n e^{\\lambda_n t}\\mathbf{x}_n`}</Math>.</p>
            <p className="mt-2">For complex eigenvalue <Math>\lambda = a + bi</Math>:</p>
            <MathBlock>{`|e^{\\lambda t}| = |e^{(a+bi)t}| = e^{at}`}</MathBlock>
            <p className="mt-2">• If <Math>{`a = \\text{Re}(\\lambda) < 0`}</Math>, then <Math>{`e^{at} \\to 0`}</Math> as <Math>{`t \\to \\infty`}</Math>.</p>
            <p className="mt-2">• If any <Math>{`\\text{Re}(\\lambda) > 0`}</Math>, that term grows exponentially, giving <Math>{`\\mathbf{u} \\to \\infty`}</Math>.</p>
            <p className="mt-2">• If all <Math>{`\\text{Re}(\\lambda) \\leq 0`}</Math>, solutions stay bounded (oscillate or decay).</p>
          </>
        }
      >
        <p>For the system <Math>{`\\mathbf{u}' = A\\mathbf{u}`}</Math>:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Stable</strong> (<Math>{`\\mathbf{u} \\to \\mathbf{0}`}</Math>): all <Math>{`\\text{Re}(\\lambda) &lt; 0`}</Math></li>
          <li><strong>Unstable</strong> (<Math>{`\\mathbf{u} \\to \\infty`}</Math>): any <Math>{`\\text{Re}(\\lambda) &gt; 0`}</Math></li>
          <li><strong>Neutrally stable</strong>: all <Math>{`\\text{Re}(\\lambda) \\leq 0`}</Math> with no repeated <Math>\lambda</Math> on the boundary</li>
        </ul>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Why Eigenvalues Determine Stability</p>
        <p className="text-dark-300 text-sm">
          <Math>{`e^{\\lambda t}`}</Math> grows if <Math>{`\\text{Re}(\\lambda) &gt; 0`}</Math><br />
          <Math>{`e^{\\lambda t}`}</Math> decays if <Math>{`\\text{Re}(\\lambda) &lt; 0`}</Math><br />
          <Math>{`e^{\\lambda t}`}</Math> oscillates if <Math>\lambda</Math> is purely imaginary
        </p>
      </div>

      <h2>The Matrix Exponential</h2>

      <Definition title="Matrix Exponential" className="my-6">
        <p>
          The <strong>matrix exponential</strong> is defined by the series:
        </p>
        <MathBlock>
          {`e^{At} = I + At + \\frac{(At)^2}{2!} + \\frac{(At)^3}{3!} + \\cdots`}
        </MathBlock>
        <p className="mt-2">
          The solution to <Math>{`\\mathbf{u}' = A\\mathbf{u}`}</Math> with <Math>{`\\mathbf{u}(0) = \\mathbf{u}_0`}</Math> is:
        </p>
        <MathBlock>
          {`\\mathbf{u}(t) = e^{At}\\mathbf{u}_0`}
        </MathBlock>
      </Definition>

      <Theorem
        title="Computing e^{At}"
        className="my-6"
        proof={
          <>
            <p>The matrix exponential is defined by <Math>{`e^{At} = I + At + \\frac{(At)^2}{2!} + \\cdots`}</Math></p>
            <p className="mt-2">If <Math>{`A = X\\Lambda X^{-1}`}</Math>, then <Math>{`A^k = X\\Lambda^k X^{-1}`}</Math>, so:</p>
            <MathBlock>{`e^{At} = X\\left(I + \\Lambda t + \\frac{(\\Lambda t)^2}{2!} + \\cdots\\right)X^{-1} = Xe^{\\Lambda t}X^{-1}`}</MathBlock>
            <p className="mt-2">Since <Math>{`\\Lambda`}</Math> is diagonal, <Math>{`e^{\\Lambda t}`}</Math> is also diagonal with entries <Math>{`e^{\\lambda_i t}`}</Math>.</p>
          </>
        }
      >
        <p>If <Math>{`A = X\\Lambda X^{-1}`}</Math>:</p>
        <MathBlock>
          {`e^{At} = Xe^{\\Lambda t}X^{-1} = X\\begin{bmatrix} e^{\\lambda_1 t} & & 0 \\\\ & \\ddots & \\\\ 0 & & e^{\\lambda_n t} \\end{bmatrix}X^{-1}`}
        </MathBlock>
      </Theorem>

      <h2>Second-Order Equations</h2>

      <Example title="Converting to First Order" className="my-6">
        <p>The equation <Math>y'' + by' + cy = 0</Math> becomes a system:</p>
        <MathBlock>
          {`\\begin{bmatrix} y' \\\\ y'' \\end{bmatrix} = \\begin{bmatrix} 0 & 1 \\\\ -c & -b \\end{bmatrix}\\begin{bmatrix} y \\\\ y' \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          The eigenvalues of this matrix give the characteristic roots of the ODE.
        </p>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span><Math>{`\\mathbf{u}' = A\\mathbf{u}`}</Math> has solutions <Math>{`\\mathbf{u} = e^{\\lambda t}\\mathbf{x}`}</Math> for each eigenpair.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>General solution: <Math>{`\\mathbf{u} = c_1 e^{\\lambda_1 t}\\mathbf{x}_1 + \\cdots + c_n e^{\\lambda_n t}\\mathbf{x}_n`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span><strong>Stability</strong>: <Math>{`\\mathbf{u} \\to 0`}</Math> when all eigenvalues have negative real part.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Matrix exponential: <Math>{`e^{At} = Xe^{\\\\Lambda t}X^{-1}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Second-order equations convert to first-order systems.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
