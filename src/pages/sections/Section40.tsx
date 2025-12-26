import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section40() {
  return (
    <LessonLayout sectionId={40}>
      {/* Introduction */}
      <p>
        <strong>Markov matrices</strong> describe transitions between states. They model population dynamics,
        web browsing, queuing systems, and many random processes. The key question: what happens in the long run?
      </p>

      <h2>Markov Matrices</h2>

      <Definition title="Markov (Stochastic) Matrix" className="my-6">
        <p>
          A matrix <Math>P</Math> is a <strong>Markov matrix</strong> if:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>All entries are nonnegative: <Math>{`p_{ij} \\geq 0`}</Math></li>
          <li>Each column sums to 1: <Math>{`\\sum_i p_{ij} = 1`}</Math></li>
        </ul>
        <p className="mt-2">
          Entry <Math>{`p_{ij}`}</Math> = probability of moving from state <Math>j</Math> to state <Math>i</Math>.
        </p>
      </Definition>

      <Example title="Weather Model" className="my-6">
        <p>Tomorrow's weather depends on today's (sunny or rainy):</p>
        <MathBlock>
          {`P = \\begin{bmatrix} 0.9 & 0.5 \\\\ 0.1 & 0.5 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          If sunny today: 90% chance sunny tomorrow, 10% rainy.<br />
          If rainy today: 50% sunny tomorrow, 50% rainy.
        </p>
      </Example>

      <h2>Properties of Markov Matrices</h2>

      <Theorem
        title="Eigenvalue 1"
        className="my-6"
        proof={
          <>
            <p><strong>Eigenvalue 1 exists:</strong> Since columns sum to 1, <Math>{`\\mathbf{e}^T P = \\mathbf{e}^T`}</Math> where <Math>{`\\mathbf{e} = (1, 1, \\ldots, 1)`}</Math>.</p>
            <p className="mt-2">This means <Math>{`P^T \\mathbf{e} = \\mathbf{e}`}</Math>, so <Math>{`\\lambda = 1`}</Math> is an eigenvalue of <Math>{`P^T`}</Math>, hence also of <Math>P</Math>.</p>
            <p className="mt-2"><strong>All <Math>{`|\\lambda| \\leq 1`}</Math>:</strong> Suppose <Math>{`P\\mathbf{x} = \\lambda \\mathbf{x}`}</Math>. Let <Math>{`|x_k| = \\max_i |x_i|`}</Math>. Then:</p>
            <MathBlock>{`|\\lambda x_k| = |\\sum_j p_{kj} x_j| \\leq \\sum_j p_{kj} |x_j| \\leq |x_k| \\sum_j p_{kj} = |x_k|`}</MathBlock>
            <p className="mt-2">Thus <Math>|\\lambda| \\leq 1</Math>.</p>
          </>
        }
      >
        <p>Every Markov matrix has:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Eigenvalue <Math>\lambda = 1</Math></strong> (guaranteed)</li>
          <li>All other eigenvalues: <Math>|\lambda| \leq 1</Math></li>
        </ul>
        <p className="mt-2">
          The eigenvector for <Math>\lambda = 1</Math> gives the <strong>steady state</strong>.
        </p>
      </Theorem>

      <Example title="Finding the Steady State" className="my-6">
        <p>For the weather matrix, find <Math>{`\\mathbf{x}`}</Math> with <Math>{`P\\mathbf{x} = \\mathbf{x}`}</Math>:</p>
        <MathBlock>
          {`(P - I)\\mathbf{x} = \\begin{bmatrix} -0.1 & 0.5 \\\\ 0.1 & -0.5 \\end{bmatrix}\\mathbf{x} = \\mathbf{0}`}
        </MathBlock>
        <p className="mt-2">
          Solution: <Math>{`\\mathbf{x} = \\frac{1}{6}(5, 1) = (5/6, 1/6)`}</Math><br />
          Long-term: 5/6 sunny days, 1/6 rainy days.
        </p>
      </Example>

      <h2>Convergence to Steady State</h2>

      <Theorem
        title="Convergence"
        className="my-6"
        proof={
          <>
            <p><strong>Perron-Frobenius:</strong> For a positive matrix, <Math>\\lambda = 1</Math> is the unique eigenvalue of maximum modulus (all others have <Math>|\\lambda_i| &lt; 1</Math>).</p>
            <p className="mt-2"><strong>Diagonalization:</strong> If <Math>P = X \\Lambda X^{-1}</Math>, then <Math>P^k = X \\Lambda^k X^{-1}</Math>.</p>
            <p className="mt-2">As <Math>k \\to \\infty</Math>, <Math>\\lambda_i^k \\to 0</Math> for all <Math>|\\lambda_i| &lt; 1</Math>. Only <Math>\\lambda_1 = 1</Math> survives:</p>
            <MathBlock>{`P^k \\to \\mathbf{x}_1 \\mathbf{y}_1^T`}</MathBlock>
            <p className="mt-2">where <Math>{`\\mathbf{x}_1`}</Math> is the steady-state right eigenvector and <Math>{`\\mathbf{y}_1`}</Math> is the left eigenvector. Since columns of <Math>P</Math> sum to 1, <Math>{`\\mathbf{y}_1 = \\mathbf{e}`}</Math>.</p>
          </>
        }
      >
        <p>
          For a positive Markov matrix (all entries positive), as <Math>k \to \infty</Math>:
        </p>
        <MathBlock>
          {`P^k \\to \\mathbf{x}_1 \\mathbf{e}^T`}
        </MathBlock>
        <p className="mt-2">
          where <Math>{`\\mathbf{x}_1`}</Math> is the steady-state eigenvector and <Math>{`\\mathbf{e} = (1, 1, \\ldots, 1)`}</Math>.
          Every initial distribution converges to the steady state.
        </p>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Rate of Convergence</p>
        <p className="text-dark-300 text-sm">
          The second largest eigenvalue <Math>|\lambda_2|</Math> controls the speed of convergence.
          Smaller <Math>|\lambda_2|</Math> means faster convergence to steady state.
        </p>
      </div>

      <h2>Population Models</h2>

      <Definition title="Leslie Matrix (Age-Structured Population)" className="my-6">
        <p>
          A <strong>Leslie matrix</strong> models population by age groups:
        </p>
        <MathBlock>
          {`L = \\begin{bmatrix} f_1 & f_2 & f_3 & \\cdots \\\\ s_1 & 0 & 0 & \\cdots \\\\ 0 & s_2 & 0 & \\cdots \\\\ \\vdots & \\ddots & \\ddots & \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          <Math>f_i</Math> = fertility rates, <Math>s_i</Math> = survival rates.
          The dominant eigenvalue determines if population grows or shrinks.
        </p>
      </Definition>

      <h2>Economics: Input-Output Models</h2>

      <Definition title="Leontief Model" className="my-6">
        <p>
          In the <strong>Leontief input-output model</strong>:
        </p>
        <MathBlock>
          {`\\mathbf{x} = A\\mathbf{x} + \\mathbf{d} \\quad \\Rightarrow \\quad \\mathbf{x} = (I - A)^{-1}\\mathbf{d}`}
        </MathBlock>
        <p className="mt-2">
          <Math>{`\\mathbf{x}`}</Math> = production levels, <Math>{`\\mathbf{d}`}</Math> = final demand,
          <Math>A</Math> = consumption coefficients.
        </p>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Markov matrix: nonnegative entries, columns sum to 1.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Eigenvalue <Math>\lambda = 1</Math> is always present; eigenvector = steady state.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Positive Markov matrices: <Math>P^k</Math> converges to steady state.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Leslie matrices model age-structured populations.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Leontief model: <Math>{`\\mathbf{x} = (I - A)^{-1}\\mathbf{d}`}</Math> for production planning.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
