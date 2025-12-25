import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section06() {
  return (
    <LessonLayout sectionId={6}>
      {/* Introduction */}
      <p>
        Now we express elimination using <strong>matrices</strong>. Each elimination step is multiplication
        by an <strong>elimination matrix</strong> <Math>E</Math>. The whole elimination process is <Math>EA = U</Math>.
      </p>

      <h2>Elimination Matrices</h2>

      <p>
        The key idea: row operations on <Math>A</Math> can be performed by multiplying <Math>A</Math> on the left
        by a special matrix <Math>E</Math>.
      </p>

      <Definition title="Elementary (Elimination) Matrix" className="my-6">
        <p>
          An <strong>elimination matrix</strong> <Math>{`E_{ij}`}</Math> subtracts a multiple of row <Math>j</Math> from row <Math>i</Math>.
          It is the identity matrix with one extra entry <Math>{`-\\ell_{ij}`}</Math> in position <Math>(i, j)</Math>.
        </p>
        <MathBlock>
          {`E_{21} = \\begin{bmatrix} 1 & 0 & 0 \\\\ -\\ell_{21} & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad \\text{subtracts } \\ell_{21} \\text{ times row 1 from row 2}`}
        </MathBlock>
      </Definition>

      <Example title="An Elimination Matrix in Action" className="my-6">
        <p>To subtract 3 times row 1 from row 2:</p>
        <MathBlock>
          {`E_{21} = \\begin{bmatrix} 1 & 0 \\\\ -3 & 1 \\end{bmatrix} \\quad \\text{then} \\quad E_{21}A = \\begin{bmatrix} 1 & 0 \\\\ -3 & 1 \\end{bmatrix}\\begin{bmatrix} 2 & 4 \\\\ 6 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & 4 \\\\ 0 & -9 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Row 1 is unchanged. Row 2 becomes (row 2) - 3(row 1) = <Math>(6-6, 3-12) = (0, -9)</Math>.
        </p>
      </Example>

      <h2>The Complete Elimination: <Math>EA = U</Math></h2>

      <p>
        For a <Math>3 \times 3</Math> matrix, three elimination steps give <Math>{`E_{32}E_{31}E_{21}A = U`}</Math>.
        The product of elimination matrices <Math>{`E = E_{32}E_{31}E_{21}`}</Math> transforms <Math>A</Math> to <Math>U</Math>.
      </p>

      <Example title="Three Elimination Steps" className="my-6">
        <MathBlock>
          {`E_{32}E_{31}E_{21}A = U`}
        </MathBlock>
        <p className="mt-2">
          Reading from right to left: First <Math>{`E_{21}`}</Math> acts on <Math>A</Math>, then <Math>{`E_{31}`}</Math>, then <Math>{`E_{32}`}</Math>.
        </p>
      </Example>

      <h2>Matrix Multiplication: Row Times Column</h2>

      <Definition title="Matrix Multiplication (Entry by Entry)" className="my-6">
        <p>
          The entry in row <Math>i</Math>, column <Math>j</Math> of <Math>AB</Math> is:
        </p>
        <MathBlock>
          {`(AB)_{ij} = (\\text{row } i \\text{ of } A) \\cdot (\\text{column } j \\text{ of } B) = \\sum_{k=1}^{n} a_{ik}b_{kj}`}
        </MathBlock>
      </Definition>

      <Example title="Row Times Column" className="my-6">
        <MathBlock>
          {`\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 1\\cdot5+2\\cdot7 & 1\\cdot6+2\\cdot8 \\\\ 3\\cdot5+4\\cdot7 & 3\\cdot6+4\\cdot8 \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <h2>The Augmented Matrix <Math>{`[A \\mid \\mathbf{b}]`}</Math></h2>

      <p>
        Elimination works on the augmented matrix <Math>{`[A \\mid \\mathbf{b}]`}</Math>, which includes the right-hand side.
        Every row operation on <Math>A</Math> must also be applied to <Math>{`\\mathbf{b}`}</Math>.
      </p>

      <Example title="Augmented Matrix" className="my-6">
        <MathBlock>
          {`[A \\mid \\mathbf{b}] = \\left[\\begin{array}{cc|c} 2 & 4 & 2 \\\\ 4 & 11 & 8 \\end{array}\\right] \\longrightarrow \\left[\\begin{array}{cc|c} 2 & 4 & 2 \\\\ 0 & 3 & 4 \\end{array}\\right] = [U \\mid \\mathbf{c}]`}
        </MathBlock>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span><Math>{`E_{ij}`}</Math> has the extra entry <Math>{`-\\ell_{ij}`}</Math> in row <Math>i</Math>, column <Math>j</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>The elimination matrices multiply <Math>A</Math> on the left to give <Math>EA = U</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Matrix multiplication: <Math>{`(AB)_{ij}`}</Math> = (row <Math>i</Math> of <Math>A</Math>) <Math>\cdot</Math> (column <Math>j</Math> of <Math>B</Math>).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>The augmented matrix <Math>{`[A \\mid \\mathbf{b}]`}</Math> keeps track of both sides during elimination.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
