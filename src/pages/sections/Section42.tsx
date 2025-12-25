import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section42() {
  return (
    <LessonLayout sectionId={42}>
      {/* Introduction */}
      <p>
        <strong>Fourier series</strong> extend linear algebra to function spaces. Functions become
        "infinite-dimensional vectors," and Fourier coefficients are coordinates in an orthonormal basis.
      </p>

      <h2>Function Spaces</h2>

      <Definition title="Inner Product of Functions" className="my-6">
        <p>
          For functions on <Math>[0, 2\pi]</Math>, define the inner product:
        </p>
        <MathBlock>
          {`\\langle f, g \\rangle = \\int_0^{2\\pi} f(x)g(x)\\,dx`}
        </MathBlock>
        <p className="mt-2">
          This makes functions into "vectors" with length <Math>{`\\|f\\| = \\sqrt{\\\\langle f, f \\\\rangle}`}</Math>.
        </p>
      </Definition>

      <h2>Orthonormal Basis</h2>

      <Theorem
        title="Fourier Basis"
        className="my-6"
        proof={
          <>
            <p><strong>Orthogonality of cosines:</strong> For <Math>{`m \\neq n`}</Math>:</p>
            <MathBlock>{`\\int_0^{2\\pi} \\cos(mx)\\cos(nx)\\,dx = \\frac{1}{2}\\int_0^{2\\pi} [\\cos((m-n)x) + \\cos((m+n)x)]\\,dx = 0`}</MathBlock>
            <p className="mt-2">Each integral vanishes because we integrate complete periods of cosines.</p>
            <p className="mt-2"><strong>Orthogonality of sines:</strong> Similarly, <Math>{`\\int_0^{2\\pi} \\sin(mx)\\sin(nx)\\,dx = 0`}</Math> for <Math>{`m \\neq n`}</Math>.</p>
            <p className="mt-2"><strong>Cosine-sine orthogonality:</strong> <Math>{`\\int_0^{2\\pi} \\cos(mx)\\sin(nx)\\,dx = 0`}</Math> for all <Math>m, n</Math> (odd function over symmetric interval).</p>
            <p className="mt-2"><strong>Normalization:</strong> <Math>{`\\int_0^{2\\pi} \\cos^2(nx)\\,dx = \\pi`}</Math> for <Math>{`n \\geq 1`}</Math>, hence the <Math>{`1/\\sqrt{\\pi}`}</Math> factors.</p>
          </>
        }
      >
        <p>
          The functions form an orthonormal basis:
        </p>
        <MathBlock>
          {`\\frac{1}{\\sqrt{2\\pi}}, \\quad \\frac{\\cos x}{\\sqrt{\\pi}}, \\quad \\frac{\\sin x}{\\sqrt{\\pi}}, \\quad \\frac{\\cos 2x}{\\sqrt{\\pi}}, \\quad \\frac{\\sin 2x}{\\sqrt{\\pi}}, \\ldots`}
        </MathBlock>
        <p className="mt-2">
          These are orthogonal: <Math>{`\\int_0^{2\\\\pi} \\cos(mx)\\cos(nx)\\,dx = 0`}</Math> for <Math>m \neq n</Math>.
        </p>
      </Theorem>

      <h2>Fourier Series</h2>

      <Definition title="Fourier Series Expansion" className="my-6">
        <p>
          Any (reasonable) function can be expanded:
        </p>
        <MathBlock>
          {`f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} (a_n \\cos nx + b_n \\sin nx)`}
        </MathBlock>
        <p className="mt-2">where the <strong>Fourier coefficients</strong> are:</p>
        <MathBlock>
          {`a_n = \\frac{1}{\\pi}\\int_0^{2\\pi} f(x)\\cos(nx)\\,dx, \\quad b_n = \\frac{1}{\\pi}\\int_0^{2\\pi} f(x)\\sin(nx)\\,dx`}
        </MathBlock>
      </Definition>

      <Example title="Square Wave" className="my-6">
        <p>
          The square wave <Math>f(x) = 1</Math> for <Math>0 &lt; x &lt; \pi</Math>, <Math>f(x) = -1</Math> for <Math>\pi &lt; x &lt; 2\pi</Math>:
        </p>
        <MathBlock>
          {`f(x) = \\frac{4}{\\pi}\\left(\\sin x + \\frac{\\sin 3x}{3} + \\frac{\\sin 5x}{5} + \\cdots\\right)`}
        </MathBlock>
        <p className="mt-2">
          Only odd harmonics appear (the function is odd).
        </p>
      </Example>

      <h2>Parseval's Theorem</h2>

      <Theorem
        title="Parseval's Identity"
        className="my-6"
        proof={
          <>
            <p><strong>Expand the integral:</strong> Substitute the Fourier series for <Math>f(x)</Math>:</p>
            <MathBlock>{`\\int_0^{2\\pi} |f(x)|^2\\,dx = \\int_0^{2\\pi} \\left(\\frac{a_0}{2} + \\sum_{n=1}^{\\infty} (a_n \\cos nx + b_n \\sin nx)\\right)^2 dx`}</MathBlock>
            <p className="mt-2"><strong>Orthogonality:</strong> Cross terms vanish by orthogonality. Only squared terms survive:</p>
            <MathBlock>{`= \\frac{a_0^2}{4} \\cdot 2\\pi + \\sum_{n=1}^{\\infty} (a_n^2 \\cdot \\pi + b_n^2 \\cdot \\pi)`}</MathBlock>
            <p className="mt-2">Dividing by <Math>\\pi</Math> gives Parseval's identity. This is exactly <Math>\\|f\\|^2 = \\sum |\\langle f, e_n \\rangle|^2</Math> for an orthonormal basis.</p>
          </>
        }
      >
        <p>
          Energy is preserved in the Fourier representation:
        </p>
        <MathBlock>
          {`\\frac{1}{\\pi}\\int_0^{2\\pi} |f(x)|^2\\,dx = \\frac{a_0^2}{2} + \\sum_{n=1}^{\\infty} (a_n^2 + b_n^2)`}
        </MathBlock>
        <p className="mt-2">
          This is the <strong>Pythagorean theorem</strong> for functions!
        </p>
      </Theorem>

      <h2>Best Approximation</h2>

      <Theorem
        title="Best L² Approximation"
        className="my-6"
        proof={
          <>
            <p><strong>Projection interpretation:</strong> <Math>S_N</Math> is the orthogonal projection of <Math>f</Math> onto the subspace spanned by <Math>{`\\{1, \\cos x, \\sin x, \\ldots, \\cos Nx, \\sin Nx\\}`}</Math>.</p>
            <p className="mt-2">For any function <Math>g</Math> in this subspace, write <Math>{`g = S_N + (g - S_N)`}</Math>:</p>
            <MathBlock>{`\\|f - g\\|^2 = \\|f - S_N + S_N - g\\|^2 = \\|f - S_N\\|^2 + \\|S_N - g\\|^2`}</MathBlock>
            <p className="mt-2">The cross term vanishes because <Math>{`f - S_N`}</Math> is orthogonal to the subspace (projection property).</p>
            <p className="mt-2">Since <Math>{`\\|S_N - g\\|^2 \\geq 0`}</Math>, we have <Math>{`\\|f - g\\| \\geq \\|f - S_N\\|`}</Math> with equality iff <Math>{`g = S_N`}</Math>.</p>
          </>
        }
      >
        <p>
          The partial sum <Math>{`S_N(x) = \\frac{a_0}{2} + \\sum_{n=1}^{N} (a_n \\cos nx + b_n \\sin nx)`}</Math>
          is the <strong>best approximation</strong> to <Math>f</Math> using <Math>N</Math> harmonics:
        </p>
        <MathBlock>
          {`\\|f - S_N\\| \\leq \\|f - g\\| \\quad \\text{for any } g \\text{ with } N \\text{ terms}`}
        </MathBlock>
        <p className="mt-2">
          This is exactly like least squares projection!
        </p>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Fourier = Orthogonal Projection</p>
        <p className="text-dark-300 text-sm">
          Fourier coefficients are projections onto basis functions:<br />
          <Math>{`a_n = \\frac{\\langle f, \\cos nx \\rangle}{\\langle \\cos nx, \\cos nx \\rangle}`}</Math><br /><br />
          Same formula as projecting onto any orthogonal basis!
        </p>
      </div>

      <h2>Complex Form</h2>

      <Definition title="Complex Fourier Series" className="my-6">
        <p>
          Using <Math>{`e^{inx} = \\cos nx + i\\sin nx`}</Math>:
        </p>
        <MathBlock>
          {`f(x) = \\sum_{n=-\\infty}^{\\infty} c_n e^{inx}, \\quad c_n = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(x)e^{-inx}\\,dx`}
        </MathBlock>
        <p className="mt-2">
          This connects directly to the DFT and FFT.
        </p>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Functions are vectors; inner product = <Math>\int fg\,dx</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span><Math>\cos nx</Math> and <Math>\sin nx</Math> form an orthonormal basis.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Fourier coefficients = projections onto basis functions.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Parseval: <Math>\|f\|^2 = \sum(a_n^2 + b_n^2)</Math> (Pythagorean theorem).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Partial sums give best approximation (least squares).</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
