import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section14() {
  return (
    <LessonLayout sectionId={14}>
      {/* Introduction */}
      <p>
        Three fundamental concepts define the structure of a vector space: <strong>linear independence</strong>,
        <strong> spanning</strong>, and <strong>basis</strong>. The number of vectors in a basis is the <strong>dimension</strong>.
      </p>

      <h2>Linear Independence</h2>

      <Definition title="Linear Independence" className="my-6">
        <p>
          Vectors <Math>{`\\mathbf{v}_1, \\ldots, \\mathbf{v}_n`}</Math> are <strong>linearly independent</strong> if:
        </p>
        <MathBlock>
          {`c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + \\cdots + c_n\\mathbf{v}_n = \\mathbf{0} \\quad \\text{only when all } c_i = 0`}
        </MathBlock>
        <p className="mt-2">
          In other words, no vector is a combination of the others.
        </p>
      </Definition>

      <Theorem
        title="Independence and Nullspace"
        className="my-6"
        proof={
          <>
            <p>Let the columns of <Math>A</Math> be <Math>{`\\mathbf{a}_1, \\ldots, \\mathbf{a}_n`}</Math>. The equation <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math> is:</p>
            <MathBlock>{`x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + \\cdots + x_n\\mathbf{a}_n = \\mathbf{0}`}</MathBlock>
            <p className="mt-2"><strong>(⟹)</strong> If the columns are independent, then the only way this linear combination can equal zero is with all <Math>x_i = 0</Math>. So <Math>{`N(A) = \\{\\mathbf{0}\\}`}</Math>.</p>
            <p className="mt-2"><strong>(⟸)</strong> If <Math>{`N(A) = \\{\\mathbf{0}\\}`}</Math>, then the only solution is <Math>{`\\mathbf{x} = \\mathbf{0}`}</Math>, meaning the only linear combination giving zero has all coefficients zero. This is the definition of independence.</p>
          </>
        }
      >
        <p>
          The columns of <Math>A</Math> are linearly independent if and only if <Math>{`N(A) = \\mathbf{Z}`}</Math>
          (only <Math>{`\\mathbf{x} = \\mathbf{0}`}</Math> solves <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>).
        </p>
      </Theorem>

      <Example title="Testing Independence" className="my-6">
        <p>Are these vectors independent?</p>
        <MathBlock>
          {`\\mathbf{v}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}, \\quad \\mathbf{v}_2 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}, \\quad \\mathbf{v}_3 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          <strong>No!</strong> Because <Math>{`\\mathbf{v}_1 + \\mathbf{v}_2 - \\mathbf{v}_3 = \\mathbf{0}`}</Math>.
          Three vectors in <Math>{`\\mathbf{R}^2`}</Math> must be dependent.
        </p>
      </Example>

      <h2>Spanning a Space</h2>

      <Definition title="Span" className="my-6">
        <p>
          Vectors <Math>{`\\mathbf{v}_1, \\ldots, \\mathbf{v}_n`}</Math> <strong>span</strong> a space <Math>S</Math> if every
          vector in <Math>S</Math> is a linear combination of them:
        </p>
        <MathBlock>
          {`S = \\text{span}(\\mathbf{v}_1, \\ldots, \\mathbf{v}_n) = \\{ c_1\\mathbf{v}_1 + \\cdots + c_n\\mathbf{v}_n \\}`}
        </MathBlock>
      </Definition>

      <h2>Basis of a Space</h2>

      <Definition title="Basis" className="my-6">
        <p>
          A <strong>basis</strong> for a vector space <Math>V</Math> is a set of vectors that:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Are <strong>linearly independent</strong></li>
          <li><strong>Span</strong> the space <Math>V</Math></li>
        </ol>
        <p className="mt-2 text-primary-400">
          Every vector in <Math>V</Math> is a <strong>unique</strong> combination of basis vectors.
        </p>
      </Definition>

      <Example title="Standard Basis for R^n" className="my-6">
        <p>The standard basis for <Math>{`\\mathbf{R}^3`}</Math>:</p>
        <MathBlock>
          {`\\mathbf{e}_1 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}, \\quad \\mathbf{e}_2 = \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\quad \\mathbf{e}_3 = \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Together they form the identity matrix <Math>I</Math>. Any <Math>{`\\mathbf{v} = (v_1, v_2, v_3)`}</Math> is
          <Math>{`v_1\\mathbf{e}_1 + v_2\\mathbf{e}_2 + v_3\\mathbf{e}_3`}</Math>.
        </p>
      </Example>

      <h2>Dimension</h2>

      <Theorem
        title="Dimension"
        className="my-6"
        proof={
          <>
            <p>Suppose <Math>{`\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_m\\}`}</Math> and <Math>{`\\{\\mathbf{w}_1, \\ldots, \\mathbf{w}_n\\}`}</Math> are both bases for <Math>V</Math>.</p>
            <p className="mt-2">Since the <Math>{`\\mathbf{v}`}</Math>'s span <Math>V</Math>, we can write each <Math>{`\\mathbf{w}_j`}</Math> as a combination. Since the <Math>{`\\mathbf{w}`}</Math>'s are independent and written in terms of <Math>m</Math> vectors, we must have <Math>n \leq m</Math>.</p>
            <p className="mt-2">By the same argument with roles reversed: since the <Math>{`\\mathbf{w}`}</Math>'s span <Math>V</Math> and the <Math>{`\\mathbf{v}`}</Math>'s are independent, we have <Math>m \leq n</Math>.</p>
            <p className="mt-2">Together: <Math>m = n</Math>. All bases have the same size.</p>
          </>
        }
      >
        <p>
          All bases for a vector space <Math>V</Math> have the <strong>same number of vectors</strong>.
          This number is the <strong>dimension</strong> of <Math>V</Math>, written <Math>\dim(V)</Math>.
        </p>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-amber-500/20">
        <p className="font-semibold text-amber-400 mb-2">Important Examples</p>
        <ul className="space-y-1 text-dark-300">
          <li><Math>{`\\dim(\\mathbf{R}^n) = n`}</Math></li>
          <li>The zero space <Math>{`\\mathbf{Z}`}</Math> has dimension <Math>0</Math></li>
          <li>A line through the origin in <Math>{`\\mathbf{R}^3`}</Math> has dimension <Math>1</Math></li>
          <li>A plane through the origin in <Math>{`\\mathbf{R}^3`}</Math> has dimension <Math>2</Math></li>
        </ul>
      </div>

      <h2>Basis for the Column Space</h2>

      <Theorem
        title="Pivot Columns Are a Basis"
        className="my-6"
        proof={
          <>
            <p><strong>Independence:</strong> The pivot columns of <Math>A</Math> correspond to the pivot columns of <Math>R</Math>. In <Math>R</Math>, these columns contain the identity matrix <Math>I_r</Math> (after extracting pivot rows), so they're independent. Row operations preserve linear relationships, so the pivot columns of <Math>A</Math> are also independent.</p>
            <p className="mt-2"><strong>Spanning:</strong> Each free column of <Math>R</Math> is a combination of pivot columns (visible directly from <Math>R</Math>). Since the same relationships hold in <Math>A</Math>, every column of <Math>A</Math> is a combination of pivot columns. Thus the pivot columns span <Math>C(A)</Math>.</p>
            <p className="mt-2">With <Math>r</Math> pivot columns forming a basis, <Math>{`\\dim C(A) = r`}</Math>.</p>
          </>
        }
      >
        <p>
          The <strong>pivot columns of <Math>A</Math></strong> are a basis for the column space <Math>C(A)</Math>.
        </p>
        <p className="mt-2">
          The <strong>dimension of <Math>C(A)</Math></strong> equals the number of pivots = the <strong>rank</strong> <Math>r</Math>.
        </p>
      </Theorem>

      <Example title="Finding a Basis for C(A)" className="my-6">
        <MathBlock>
          {`A = \\begin{bmatrix} 1 & 3 & 3 & 2 \\\\ 2 & 6 & 9 & 7 \\\\ -1 & -3 & 3 & 4 \\end{bmatrix} \\rightarrow U = \\begin{bmatrix} 1 & 3 & 3 & 2 \\\\ 0 & 0 & 3 & 3 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Pivots in columns 1 and 3. A basis for <Math>C(A)</Math> is columns 1 and 3 of <Math>A</Math>:
        </p>
        <MathBlock>
          {`\\left\\{ \\begin{bmatrix} 1 \\\\ 2 \\\\ -1 \\end{bmatrix}, \\begin{bmatrix} 3 \\\\ 9 \\\\ 3 \\end{bmatrix} \\right\\}`}
        </MathBlock>
        <p className="mt-2 text-amber-400">
          Use the original columns of <Math>A</Math>, not of <Math>U</Math>!
        </p>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Columns of <Math>A</Math> are independent if <Math>{`\\mathbf{x} = \\mathbf{0}`}</Math> is the only solution to <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Vectors <Math>{`\\mathbf{v}_1, \\ldots, \\mathbf{v}_r`}</Math> span a space if their combinations fill that space.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>A <strong>basis</strong> consists of linearly independent vectors that span the space.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>All bases have the same number of vectors = the <strong>dimension</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>The pivot columns are a basis for <Math>C(A)</Math>. The dimension is <Math>r</Math>.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
