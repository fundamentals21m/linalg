import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section07() {
  return (
    <LessonLayout sectionId={7}>
      {/* Introduction */}
      <p>
        Matrix multiplication is the heart of linear algebra. This section covers the rules that
        make it work: associative law (yes), commutative law (no!), and distributive law (yes).
      </p>

      <h2>The Laws of Matrix Multiplication</h2>

      <Theorem
        title="Rules for Matrix Operations"
        className="my-6"
        proof={
          <>
            <p><strong>Associativity:</strong> We verify entry-by-entry. The <Math>(i,j)</Math> entry of <Math>(AB)C</Math> is:</p>
            <MathBlock>{`\\sum_k (AB)_{ik} c_{kj} = \\sum_k \\left(\\sum_l a_{il}b_{lk}\\right) c_{kj} = \\sum_l \\sum_k a_{il}b_{lk}c_{kj}`}</MathBlock>
            <p>The <Math>(i,j)</Math> entry of <Math>A(BC)</Math> is:</p>
            <MathBlock>{`\\sum_l a_{il}(BC)_{lj} = \\sum_l a_{il}\\left(\\sum_k b_{lk}c_{kj}\\right) = \\sum_l \\sum_k a_{il}b_{lk}c_{kj}`}</MathBlock>
            <p>These are equal, so <Math>(AB)C = A(BC)</Math>.</p>
            <p className="mt-2"><strong>Distributivity:</strong> <Math>{`(A(B+C))_{ij} = \\sum_k a_{ik}(b_{kj}+c_{kj}) = \\sum_k a_{ik}b_{kj} + \\sum_k a_{ik}c_{kj} = (AB)_{ij} + (AC)_{ij}`}</Math></p>
            <p className="mt-2"><strong>Non-commutativity:</strong> Counterexample shown below proves <Math>AB \neq BA</Math> in general.</p>
          </>
        }
      >
        <p>For matrices of compatible sizes:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Associative:</strong> <Math>A(BC) = (AB)C</Math></li>
          <li><strong>Distributive:</strong> <Math>A(B + C) = AB + AC</Math> and <Math>(A + B)C = AC + BC</Math></li>
          <li><strong className="text-amber-400">NOT Commutative:</strong> In general, <Math>AB \neq BA</Math></li>
        </ul>
      </Theorem>

      <Example title="Matrix Multiplication Is Not Commutative" className="my-6">
        <MathBlock>
          {`AB = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}\\begin{bmatrix} 0 & 0 \\\\ 1 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}`}
        </MathBlock>
        <MathBlock>
          {`BA = \\begin{bmatrix} 0 & 0 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          <Math>AB \neq BA</Math> — the order matters!
        </p>
      </Example>

      <h2>Four Ways to Multiply <Math>AB</Math></h2>

      <div className="space-y-4 my-6">
        <div className="bg-dark-800/50 rounded-xl p-4 border border-primary-500/20">
          <p className="font-semibold text-primary-400 mb-2">1. Row times Column (Standard)</p>
          <p className="text-dark-300 text-sm">
            <Math>{`(AB)_{ij}`}</Math> = (row <Math>i</Math> of <Math>A</Math>) <Math>\cdot</Math> (column <Math>j</Math> of <Math>B</Math>)
          </p>
        </div>

        <div className="bg-dark-800/50 rounded-xl p-4 border border-amber-500/20">
          <p className="font-semibold text-amber-400 mb-2">2. Columns of <Math>AB</Math></p>
          <p className="text-dark-300 text-sm">
            Each column of <Math>AB</Math> is <Math>A</Math> times a column of <Math>B</Math>.
          </p>
        </div>

        <div className="bg-dark-800/50 rounded-xl p-4 border border-emerald-500/20">
          <p className="font-semibold text-emerald-400 mb-2">3. Rows of <Math>AB</Math></p>
          <p className="text-dark-300 text-sm">
            Each row of <Math>AB</Math> is a row of <Math>A</Math> times <Math>B</Math>.
          </p>
        </div>

        <div className="bg-dark-800/50 rounded-xl p-4 border border-cyan-500/20">
          <p className="font-semibold text-cyan-400 mb-2">4. Column times Row</p>
          <p className="text-dark-300 text-sm">
            <Math>AB</Math> = sum of (column <Math>k</Math> of <Math>A</Math>) times (row <Math>k</Math> of <Math>B</Math>).
          </p>
        </div>
      </div>

      <h2>Block Multiplication</h2>

      <Definition title="Block Matrices" className="my-6">
        <p>
          When matrices are partitioned into <strong>blocks</strong>, multiplication follows the same rules—
          provided the block sizes match correctly.
        </p>
        <MathBlock>
          {`\\begin{bmatrix} A_1 & A_2 \\\\ A_3 & A_4 \\end{bmatrix}\\begin{bmatrix} B_1 \\\\ B_2 \\end{bmatrix} = \\begin{bmatrix} A_1B_1 + A_2B_2 \\\\ A_3B_1 + A_4B_2 \\end{bmatrix}`}
        </MathBlock>
      </Definition>

      <h2>Powers of a Matrix</h2>

      <Definition title="Matrix Powers" className="my-6">
        <p>
          For a square matrix <Math>A</Math>, powers are defined naturally:
        </p>
        <MathBlock>
          {`A^2 = AA, \\quad A^3 = AAA, \\quad A^p = \\underbrace{A \\cdot A \\cdots A}_{p \\text{ times}}`}
        </MathBlock>
        <p className="mt-2">
          Also <Math>A^0 = I</Math> (the identity matrix) and <Math>{`A^{-1}`}</Math> is the inverse (if it exists).
        </p>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Matrix multiplication is <strong>associative</strong>: <Math>(AB)C = A(BC)</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Matrix multiplication is <strong>NOT commutative</strong>: <Math>AB \neq BA</Math> in general.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span><Math>AB</Math> can be computed four ways: row×col, by columns, by rows, or col×row.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Block multiplication works when the blocks have compatible sizes.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
