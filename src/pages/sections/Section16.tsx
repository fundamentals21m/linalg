import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section16() {
  return (
    <LessonLayout sectionId={16}>
      {/* Introduction */}
      <p>
        The four fundamental subspaces come in <strong>orthogonal pairs</strong>. Understanding these
        perpendicular relationships reveals the deepest structure of any matrix.
      </p>

      <h2>Orthogonal Vectors</h2>

      <Definition title="Orthogonal Vectors" className="my-6">
        <p>
          Two vectors <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math> are <strong>orthogonal</strong> (perpendicular) if their dot product is zero:
        </p>
        <MathBlock>
          {`\\mathbf{v}^T\\mathbf{w} = 0`}
        </MathBlock>
        <p className="mt-2">
          When <Math>{`\\mathbf{v}^T\\mathbf{w} = 0`}</Math>, the Pythagorean theorem holds:
        </p>
        <MathBlock>
          {`\\|\\mathbf{v}\\|^2 + \\|\\mathbf{w}\\|^2 = \\|\\mathbf{v} + \\mathbf{w}\\|^2`}
        </MathBlock>
      </Definition>

      <h2>Orthogonal Subspaces</h2>

      <Definition title="Orthogonal Subspaces" className="my-6">
        <p>
          Subspaces <Math>V</Math> and <Math>W</Math> are <strong>orthogonal</strong> if every vector in <Math>V</Math>
          is perpendicular to every vector in <Math>W</Math>:
        </p>
        <MathBlock>
          {`\\mathbf{v}^T\\mathbf{w} = 0 \\quad \\text{for all } \\mathbf{v} \\in V \\text{ and } \\mathbf{w} \\in W`}
        </MathBlock>
      </Definition>

      <h2>The Fundamental Theorem</h2>

      <Theorem
        title="Orthogonality of the Four Subspaces"
        className="my-6"
        proof={
          <>
            <p><strong>Row space ⟂ Nullspace:</strong> Let <Math>{`\\mathbf{x} \\in N(A)`}</Math>, so <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>. This means:</p>
            <MathBlock>{`\\begin{bmatrix} \\text{row}_1 \\\\ \\text{row}_2 \\\\ \\vdots \\end{bmatrix} \\mathbf{x} = \\begin{bmatrix} 0 \\\\ 0 \\\\ \\vdots \\end{bmatrix}`}</MathBlock>
            <p>Each row is orthogonal to <Math>{`\\mathbf{x}`}</Math>. Since every vector in the row space is a combination of rows, and <Math>{`\\mathbf{x}`}</Math> is orthogonal to each row, <Math>{`\\mathbf{x}`}</Math> is orthogonal to the entire row space.</p>
            <p className="mt-2"><strong>Column space ⟂ Left nullspace:</strong> Apply the same argument to <Math>A^T</Math>. If <Math>{`A^T\\mathbf{y} = \\mathbf{0}`}</Math>, then <Math>{`\\mathbf{y}`}</Math> is orthogonal to every column of <Math>A</Math>, hence to <Math>C(A)</Math>.</p>
          </>
        }
      >
        <p>For any matrix <Math>A</Math>:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>The <strong>row space</strong> <Math>C(A^T)</Math> is orthogonal to the <strong>nullspace</strong> <Math>N(A)</Math></li>
          <li>The <strong>column space</strong> <Math>C(A)</Math> is orthogonal to the <strong>left nullspace</strong> <Math>N(A^T)</Math></li>
        </ul>
        <MathBlock>
          {`C(A^T) \\perp N(A) \\quad \\text{in } \\mathbf{R}^n`}
        </MathBlock>
        <MathBlock>
          {`C(A) \\perp N(A^T) \\quad \\text{in } \\mathbf{R}^m`}
        </MathBlock>
      </Theorem>

      <Example title="Why the Row Space is Orthogonal to the Nullspace" className="my-6">
        <p>If <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>, then each row of <Math>A</Math> is perpendicular to <Math>{`\\mathbf{x}`}</Math>:</p>
        <MathBlock>
          {`A\\mathbf{x} = \\begin{bmatrix} \\text{row 1} \\\\ \\text{row 2} \\\\ \\vdots \\end{bmatrix}\\mathbf{x} = \\begin{bmatrix} 0 \\\\ 0 \\\\ \\vdots \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Each row dotted with <Math>{`\\mathbf{x}`}</Math> gives zero. So <Math>{`\\mathbf{x}`}</Math> is perpendicular to every row,
          and therefore to every combination of rows (the entire row space).
        </p>
      </Example>

      <h2>Orthogonal Complements</h2>

      <Definition title="Orthogonal Complement" className="my-6">
        <p>
          The <strong>orthogonal complement</strong> of a subspace <Math>V</Math>, written <Math>V^\perp</Math>,
          contains all vectors perpendicular to <Math>V</Math>:
        </p>
        <MathBlock>
          {`V^\\perp = \\{ \\mathbf{w} : \\mathbf{v}^T\\mathbf{w} = 0 \\text{ for all } \\mathbf{v} \\in V \\}`}
        </MathBlock>
      </Definition>

      <Theorem
        title="Dimensions Add Up"
        className="my-6"
        proof={
          <>
            <p>Row space and nullspace are orthogonal in <Math>{`\\mathbf{R}^n`}</Math>. Their dimensions are <Math>r</Math> and <Math>n - r</Math>, which add to <Math>n</Math>.</p>
            <p className="mt-2">Since they are orthogonal and their dimensions sum to <Math>n</Math>, they are orthogonal complements: every vector in <Math>{`\\mathbf{R}^n`}</Math> can be written uniquely as a sum of a row space vector and a nullspace vector.</p>
            <p className="mt-2">Similarly, column space (dimension <Math>r</Math>) and left nullspace (dimension <Math>m - r</Math>) are orthogonal complements in <Math>{`\\mathbf{R}^m`}</Math>.</p>
          </>
        }
      >
        <p>
          The orthogonal complement fills the rest of the space:
        </p>
        <MathBlock>
          {`\\dim(V) + \\dim(V^\\perp) = n`}
        </MathBlock>
        <p className="mt-2">
          For the four subspaces: <Math>r + (n-r) = n</Math> and <Math>r + (m-r) = m</Math>.
        </p>
      </Theorem>

      <h2>The Big Picture</h2>

      <div className="bg-gradient-to-r from-primary-500/10 via-dark-800/50 to-amber-500/10 rounded-xl p-6 my-6 border border-primary-500/20">
        <p className="text-center text-lg font-semibold mb-4">The Four Subspaces: Orthogonal Pairs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-primary-400 font-semibold mb-2">In <Math>{`\\mathbf{R}^n`}</Math>:</p>
            <p className="text-sm">Row space <Math>C(A^T)</Math></p>
            <p className="text-xs text-dark-400">dimension <Math>r</Math></p>
            <p className="text-lg my-2">⟂</p>
            <p className="text-sm">Nullspace <Math>N(A)</Math></p>
            <p className="text-xs text-dark-400">dimension <Math>n - r</Math></p>
          </div>
          <div className="text-center">
            <p className="text-amber-400 font-semibold mb-2">In <Math>{`\\mathbf{R}^m`}</Math>:</p>
            <p className="text-sm">Column space <Math>C(A)</Math></p>
            <p className="text-xs text-dark-400">dimension <Math>r</Math></p>
            <p className="text-lg my-2">⟂</p>
            <p className="text-sm">Left nullspace <Math>N(A^T)</Math></p>
            <p className="text-xs text-dark-400">dimension <Math>m - r</Math></p>
          </div>
        </div>
      </div>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Orthogonal vectors have <Math>{`\\mathbf{v}^T\\mathbf{w} = 0`}</Math>. Then <Math>{`\\|\\mathbf{v}\\|^2 + \\|\\mathbf{w}\\|^2 = \\|\\mathbf{v} + \\mathbf{w}\\|^2`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Orthogonal subspaces: every <Math>{`\\mathbf{v}`}</Math> in <Math>V</Math> is perpendicular to every <Math>{`\\mathbf{w}`}</Math> in <Math>W</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>The row space is orthogonal to the nullspace. Column space is orthogonal to the left nullspace.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Row space and nullspace are <strong>orthogonal complements</strong>: dimensions add to <Math>n</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>If <Math>{`A^TA\\mathbf{x} = \\mathbf{0}`}</Math> then <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math>. (The nullspaces of <Math>A^TA</Math> and <Math>A</Math> are the same!)</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
