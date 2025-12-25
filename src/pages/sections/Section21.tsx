import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section21() {
  return (
    <LessonLayout sectionId={21}>
      {/* Introduction */}
      <p>
        There are two formulas for determinants: the <strong>big formula</strong> with <Math>n!</Math> terms,
        and the <strong>cofactor formula</strong> that expands along any row or column.
      </p>

      <h2>The Big Formula</h2>

      <Definition title="Determinant by Permutations" className="my-6">
        <p>
          The determinant of an <Math>n \times n</Math> matrix is a sum of <Math>n!</Math> products:
        </p>
        <MathBlock>
          {`\\det A = \\sum_{\\text{permutations } P} (\\pm 1) \\cdot a_{1\\alpha} a_{2\\beta} a_{3\\gamma} \\cdots a_{n\\omega}`}
        </MathBlock>
        <p className="mt-2">
          Each term uses one entry from each row and each column. The sign depends on whether
          the permutation <Math>(\alpha, \beta, \gamma, \ldots, \omega)</Math> is even or odd.
        </p>
      </Definition>

      <Example title="3×3 Determinant: 6 Terms" className="my-6">
        <MathBlock>
          {`\\det \\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh`}
        </MathBlock>
        <p className="mt-2">
          Three terms go "down to the right" (positive), three go "down to the left" (negative).
        </p>
      </Example>

      <h2>Cofactors</h2>

      <Definition title="Cofactor" className="my-6">
        <p>
          The <strong>cofactor</strong> <Math>{`C_{ij}`}</Math> of entry <Math>{`a_{ij}`}</Math> is:
        </p>
        <MathBlock>
          {`C_{ij} = (-1)^{i+j} \\det M_{ij}`}
        </MathBlock>
        <p className="mt-2">
          where <Math>{`M_{ij}`}</Math> is the <Math>(n-1) \times (n-1)</Math> matrix with row <Math>i</Math> and column <Math>j</Math> deleted.
        </p>
      </Definition>

      <Example title="Computing a Cofactor" className="my-6">
        <p>For entry <Math>{`a_{12}`}</Math> in the first row, second column:</p>
        <MathBlock>
          {`C_{12} = (-1)^{1+2} \\det \\begin{bmatrix} d & f \\\\ g & i \\end{bmatrix} = -(di - fg)`}
        </MathBlock>
      </Example>

      <h2>Cofactor Expansion</h2>

      <Theorem
        title="Cofactor Formula"
        className="my-6"
        proof={
          <>
            <p>Use property 3 (linearity in each row). Row <Math>i</Math> can be written as:</p>
            <MathBlock>{`\\text{row}_i = a_{i1}\\mathbf{e}_1 + a_{i2}\\mathbf{e}_2 + \\cdots + a_{in}\\mathbf{e}_n`}</MathBlock>
            <p className="mt-2">By linearity: <Math>\det A</Math> = sum of <Math>n</Math> determinants, each with row <Math>i</Math> replaced by <Math>{`a_{ij}\\mathbf{e}_j`}</Math>.</p>
            <p className="mt-2">The determinant with <Math>{`\\mathbf{e}_j`}</Math> in row <Math>i</Math> equals <Math>{`(-1)^{i+j} \\det M_{ij} = C_{ij}`}</Math> (after moving that 1 to position <Math>(i,j)</Math> via row/column exchanges).</p>
            <p className="mt-2">Each term contributes <Math>{`a_{ij} C_{ij}`}</Math>, giving the cofactor formula.</p>
          </>
        }
      >
        <p>
          The determinant can be computed by expanding along any row or column:
        </p>
        <MathBlock>
          {`\\det A = a_{i1}C_{i1} + a_{i2}C_{i2} + \\cdots + a_{in}C_{in} \\quad \\text{(row } i\\text{)}`}
        </MathBlock>
        <MathBlock>
          {`\\det A = a_{1j}C_{1j} + a_{2j}C_{2j} + \\cdots + a_{nj}C_{nj} \\quad \\text{(column } j\\text{)}`}
        </MathBlock>
      </Theorem>

      <Example title="Expansion Along Row 1" className="my-6">
        <MathBlock>
          {`\\det \\begin{bmatrix} 2 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix} = 2 \\det \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix} - 1 \\det \\begin{bmatrix} 1 & 1 \\\\ 0 & 2 \\end{bmatrix} + 0`}
        </MathBlock>
        <MathBlock>
          {`= 2(4-1) - 1(2-0) = 6 - 2 = 4`}
        </MathBlock>
      </Example>

      <h2>Choosing the Best Row or Column</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-amber-500/20">
        <p className="font-semibold text-amber-400 mb-2">Strategy</p>
        <p className="text-dark-300">
          Expand along a row or column with the most <strong>zeros</strong>! Each zero means
          one less determinant to compute.
        </p>
      </div>

      <Example title="Expansion with Zeros" className="my-6">
        <MathBlock>
          {`\\det \\begin{bmatrix} 1 & 0 & 0 & 0 \\\\ 2 & 3 & 0 & 0 \\\\ 4 & 5 & 6 & 0 \\\\ 7 & 8 & 9 & 10 \\end{bmatrix} = 1 \\cdot 3 \\cdot 6 \\cdot 10 = 180`}
        </MathBlock>
        <p className="mt-2">
          For triangular matrices, cofactor expansion confirms: <Math>\det A</Math> = product of diagonal entries.
        </p>
      </Example>

      <h2>The Checkerboard of Signs</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-3">Sign Pattern <Math>{`(-1)^{i+j}`}</Math></p>
        <MathBlock>
          {`\\begin{bmatrix} + & - & + & - \\\\ - & + & - & + \\\\ + & - & + & - \\\\ - & + & - & + \\end{bmatrix}`}
        </MathBlock>
        <p className="text-dark-400 text-sm mt-2">
          The cofactor <Math>{`C_{ij}`}</Math> has the sign at position <Math>(i, j)</Math>.
        </p>
      </div>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>The "big formula" has <Math>n!</Math> terms, one for each permutation.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Each term has one entry from each row and column, with sign <Math>\pm 1</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Cofactor <Math>{`C_{ij} = (-1)^{i+j} \\det M_{ij}`}</Math> (delete row <Math>i</Math>, column <Math>j</Math>).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Cofactor expansion: <Math>{`\\det A = a_{i1}C_{i1} + \\cdots + a_{in}C_{in}`}</Math> (any row <Math>i</Math>).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Expand along a row or column with many zeros for efficiency.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
