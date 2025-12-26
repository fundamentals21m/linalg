import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section45() {
  return (
    <LessonLayout sectionId={45}>
      {/* Introduction */}
      <p>
        <strong>Numerical linear algebra</strong> deals with computing solutions efficiently and
        accurately. In practice, we never work with infinite precision—understanding roundoff errors
        and stability is essential.
      </p>

      <h2>Floating Point Arithmetic</h2>

      <Definition title="Machine Epsilon" className="my-6">
        <p>
          <strong>Machine epsilon</strong> <Math>{`\\epsilon_{\\text{mach}}`}</Math> is the smallest number such that:
        </p>
        <MathBlock>
          {`1 + \\epsilon_{\\text{mach}} > 1`}
        </MathBlock>
        <p className="mt-2">
          For double precision: <Math>{`\\epsilon_{\\text{mach}} \\approx 10^{-16}`}</Math> (about 16 digits of accuracy).
        </p>
      </Definition>

      <Theorem
        title="Fundamental Axiom"
        className="my-6"
        proof={
          <>
            <p><strong>Rounding model:</strong> Floating-point numbers are represented as <Math>{`\\pm m \\times 2^e`}</Math> where the mantissa <Math>m</Math> has finite precision.</p>
            <p className="mt-2">When we compute <Math>{`a \\circ b`}</Math>, the exact result must be rounded to the nearest representable number.</p>
            <p className="mt-2"><strong>Rounding error:</strong> The relative error from rounding is at most <Math>{`\\epsilon_{\\text{mach}}/2`}</Math> (round to nearest) or <Math>{`\\epsilon_{\\text{mach}}`}</Math> (truncation).</p>
            <p className="mt-2">For IEEE double precision: 52 mantissa bits means <Math>{`\\epsilon_{\\text{mach}} = 2^{-52} \\approx 2.2 \\times 10^{-16}`}</Math>.</p>
          </>
        }
      >
        <p>
          Every floating-point operation introduces relative error at most <Math>{`\\epsilon_{\\text{mach}}`}</Math>:
        </p>
        <MathBlock>
          {`\\text{fl}(a \\circ b) = (a \\circ b)(1 + \\delta), \\quad |\\delta| \\leq \\epsilon_{\\text{mach}}`}
        </MathBlock>
      </Theorem>

      <h2>Condition Number</h2>

      <Definition title="Condition Number of a Matrix" className="my-6">
        <p>
          The <strong>condition number</strong> measures sensitivity to errors:
        </p>
        <MathBlock>
          {`\\kappa(A) = \\|A\\| \\|A^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}`}
        </MathBlock>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><Math>\kappa \approx 1</Math>: well-conditioned</li>
          <li><Math>\kappa \gg 1</Math>: ill-conditioned</li>
          <li><Math>\kappa = \infty</Math>: singular</li>
        </ul>
      </Definition>

      <Example title="Hilbert Matrix" className="my-6">
        <p>
          The <Math>n \times n</Math> Hilbert matrix <Math>{`H_{ij} = 1/(i+j-1)`}</Math> is notoriously ill-conditioned:
        </p>
        <MathBlock>
          {`H_5 = \\begin{bmatrix} 1 & 1/2 & 1/3 & 1/4 & 1/5 \\\\ 1/2 & 1/3 & 1/4 & 1/5 & 1/6 \\\\ \\vdots & & & & \\vdots \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          <Math>\kappa(H_5) \approx 4.8 \times 10^5</Math>. For <Math>{`H_{10}`}</Math>, <Math>{`\\kappa \\approx 10^{13}`}</Math>!
        </p>
      </Example>

      <Theorem
        title="Error Bound"
        className="my-6"
        proof={
          <>
            <p><strong>Setup:</strong> Let <Math>{`A(\\mathbf{x} + \\delta\\mathbf{x}) = \\mathbf{b} + \\delta\\mathbf{b}`}</Math>. Then <Math>{`A\\delta\\mathbf{x} = \\delta\\mathbf{b}`}</Math>, so <Math>{`\\delta\\mathbf{x} = A^{-1}\\delta\\mathbf{b}`}</Math>.</p>
            <p className="mt-2"><strong>Bound on error:</strong> Taking norms:</p>
            <MathBlock>{`\\|\\delta\\mathbf{x}\\| = \\|A^{-1}\\delta\\mathbf{b}\\| \\leq \\|A^{-1}\\| \\|\\delta\\mathbf{b}\\|`}</MathBlock>
            <p className="mt-2"><strong>Relative error:</strong> From <Math>{`\\mathbf{b} = A\\mathbf{x}`}</Math>: <Math>{`\\|\\mathbf{b}\\| \\leq \\|A\\|\\|\\mathbf{x}\\|`}</Math>, so <Math>{`1/\\|\\mathbf{x}\\| \\leq \\|A\\|/\\|\\mathbf{b}\\|`}</Math>.</p>
            <MathBlock>{`\\frac{\\|\\delta\\mathbf{x}\\|}{\\|\\mathbf{x}\\|} \\leq \\|A^{-1}\\| \\|\\delta\\mathbf{b}\\| \\cdot \\frac{\\|A\\|}{\\|\\mathbf{b}\\|} = \\kappa(A) \\frac{\\|\\delta\\mathbf{b}\\|}{\\|\\mathbf{b}\\|}`}</MathBlock>
          </>
        }
      >
        <p>
          When solving <Math>Ax = b</Math> with small perturbation <Math>\delta b</Math>:
        </p>
        <MathBlock>
          {`\\frac{\\|\\delta x\\|}{\\|x\\|} \\leq \\kappa(A) \\frac{\\|\\delta b\\|}{\\|b\\|}`}
        </MathBlock>
        <p className="mt-2">
          If <Math>{`\\kappa = 10^{10}`}</Math>, a tiny error in <Math>b</Math> can cause a huge error in <Math>x</Math>.
        </p>
      </Theorem>

      <h2>Stability</h2>

      <Definition title="Backward Stable Algorithm" className="my-6">
        <p>
          An algorithm is <strong>backward stable</strong> if its computed answer is the exact answer
          for a slightly perturbed problem:
        </p>
        <MathBlock>
          {`\\tilde{x} = (A + \\delta A)^{-1}b \\quad \\text{with } \\|\\delta A\\| \\text{ small}`}
        </MathBlock>
        <p className="mt-2">
          Gaussian elimination with partial pivoting is backward stable.
        </p>
      </Definition>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-amber-500/20">
        <p className="font-semibold text-amber-400 mb-2">Loss of Significance</p>
        <p className="text-dark-300 text-sm">
          Subtracting nearly equal numbers causes <strong>catastrophic cancellation</strong>:<br />
          <Math>1.23456789 - 1.23456788 = 0.00000001</Math><br />
          The result has only 1 significant digit even though inputs had 8!
        </p>
      </div>

      <h2>Pivoting Strategies</h2>

      <Theorem
        title="Partial Pivoting"
        className="my-6"
        proof={
          <>
            <p><strong>Problem without pivoting:</strong> If the pivot <Math>{`a_{kk}`}</Math> is small, we divide by a tiny number, amplifying errors.</p>
            <p className="mt-2"><strong>Strategy:</strong> At step <Math>k</Math>, find <Math>{`\\max_{i \\geq k} |a_{ik}|`}</Math> and swap rows to put this maximum in position <Math>(k,k)</Math>.</p>
            <p className="mt-2"><strong>Bounded multipliers:</strong> The multipliers are <Math>{`l_{ik} = a_{ik}/a_{kk}`}</Math>. After pivoting, <Math>{`|a_{ik}| \\leq |a_{kk}|`}</Math> for all <Math>{`i > k`}</Math>, so <Math>{`|l_{ik}| \\leq 1`}</Math>.</p>
            <p className="mt-2"><strong>Stability:</strong> Bounded multipliers prevent exponential error growth. The factorization <Math>PA = LU</Math> is backward stable: the computed <Math>{`\\tilde{L}\\tilde{U} = PA + E`}</Math> where <Math>{`\\|E\\|`}</Math> is small.</p>
          </>
        }
      >
        <p>
          <strong>Partial pivoting</strong>: at each step, swap rows to put the largest entry in the pivot position.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Prevents division by small numbers</li>
          <li>Keeps multipliers <Math>{`|l_{ij}| \\leq 1`}</Math></li>
          <li>Makes <Math>PA = LU</Math> backward stable</li>
        </ul>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Machine epsilon <Math>{`\\approx 10^{-16}`}</Math> limits precision.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Condition number <Math>{`\\kappa(A) = \\sigma_{\\\\max}/\\sigma_{\\\\min}`}</Math> measures sensitivity.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Relative error in solution ≤ <Math>\kappa(A)</Math> × relative error in data.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Backward stability: computed answer is exact for nearby problem.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Partial pivoting is essential for numerical stability.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
