import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section34() {
  return (
    <LessonLayout sectionId={34}>
      {/* Introduction */}
      <p>
        Different bases give different matrices for the same linear transformation. The
        <strong> change of basis</strong> reveals how these matrices are related—they are <em>similar</em>.
      </p>

      <h2>Change of Basis</h2>

      <Definition title="Change of Basis Matrix" className="my-6">
        <p>
          If <Math>V</Math> has two bases <Math>{`\\mathcal{B} = \\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_n\\}`}</Math> and
          <Math>{`\\mathcal{C} = \\{\\mathbf{w}_1, \\ldots, \\mathbf{w}_n\\}`}</Math>, the <strong>change of basis matrix</strong>
          <Math>P</Math> converts coordinates:
        </p>
        <MathBlock>
          {`[\\mathbf{x}]_\\mathcal{C} = P^{-1}[\\mathbf{x}]_\\mathcal{B}`}
        </MathBlock>
        <p className="mt-2">
          Column <Math>j</Math> of <Math>P</Math> contains the coordinates of <Math>{`\\mathbf{v}_j`}</Math> in basis <Math>{`\\mathcal{C}`}</Math>.
        </p>
      </Definition>

      <Example title="Changing to a New Basis" className="my-6">
        <p>
          Old basis: <Math>{`\\mathbf{v}_1 = (1, 0)`}</Math>, <Math>{`\\mathbf{v}_2 = (0, 1)`}</Math> (standard)<br />
          New basis: <Math>{`\\mathbf{w}_1 = (1, 1)`}</Math>, <Math>{`\\mathbf{w}_2 = (1, -1)`}</Math>
        </p>
        <MathBlock>
          {`P = \\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}, \\quad P^{-1} = \\frac{1}{2}\\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          The vector <Math>(3, 1)</Math> in standard basis has coordinates <Math>(2, 1)</Math> in the new basis.
        </p>
      </Example>

      <h2>Similar Matrices</h2>

      <Definition title="Similar Matrices" className="my-6">
        <p>
          Matrices <Math>A</Math> and <Math>B</Math> are <strong>similar</strong> if:
        </p>
        <MathBlock>
          {`B = M^{-1}AM`}
        </MathBlock>
        <p className="mt-2">
          for some invertible matrix <Math>M</Math>. They represent the <strong>same transformation</strong>
          in different bases.
        </p>
      </Definition>

      <Theorem
        title="Matrix of T in Different Bases"
        className="my-6"
        proof={
          <>
            <p>Let <Math>{`[\\mathbf{x}]_{\\mathcal{B}}`}</Math> denote coordinates in basis <Math>{`\\mathcal{B}`}</Math>.</p>
            <p className="mt-2">In basis <Math>{`\\mathcal{B}`}</Math>: <Math>{`[T(\\mathbf{x})]_{\\mathcal{B}} = A[\\mathbf{x}]_{\\mathcal{B}}`}</Math>.</p>
            <p className="mt-2">The change of basis matrix <Math>P</Math> satisfies: <Math>{`[\\mathbf{x}]_{\\mathcal{B}} = P[\\mathbf{x}]_{\\mathcal{C}}`}</Math>.</p>
            <p className="mt-2">In basis <Math>{`\\mathcal{C}`}</Math>:</p>
            <MathBlock>{`[T(\\mathbf{x})]_{\\mathcal{C}} = P^{-1}[T(\\mathbf{x})]_{\\mathcal{B}} = P^{-1}A[\\mathbf{x}]_{\\mathcal{B}} = P^{-1}A(P[\\mathbf{x}]_{\\mathcal{C}}) = (P^{-1}AP)[\\mathbf{x}]_{\\mathcal{C}}`}</MathBlock>
            <p className="mt-2">Therefore the matrix in basis <Math>{`\\mathcal{C}`}</Math> is <Math>{`B = P^{-1}AP`}</Math>.</p>
          </>
        }
      >
        <p>
          If <Math>A</Math> is the matrix of <Math>T</Math> in basis <Math>{`\\mathcal{B}`}</Math> and
          <Math>B</Math> is the matrix in basis <Math>{`\\mathcal{C}`}</Math>:
        </p>
        <MathBlock>
          {`B = P^{-1}AP`}
        </MathBlock>
        <p className="mt-2">
          where <Math>P</Math> is the change of basis matrix from <Math>{`\\mathcal{B}`}</Math> to <Math>{`\\mathcal{C}`}</Math>.
        </p>
      </Theorem>

      <h2>The Best Basis</h2>

      <Theorem
        title="Diagonalization as Change of Basis"
        className="my-6"
        proof={
          <>
            <p>Let <Math>{`X = [\\mathbf{x}_1 \\cdots \\mathbf{x}_n]`}</Math> where <Math>{`A\\mathbf{x}_i = \\lambda_i \\mathbf{x}_i`}</Math>.</p>
            <p className="mt-2">In the standard basis, the transformation has matrix <Math>A</Math>.</p>
            <p className="mt-2">In the eigenvector basis <Math>{`\\{\\mathbf{x}_1, \\ldots, \\mathbf{x}_n\\}`}</Math>:</p>
            <p className="mt-2">• <Math>X</Math> is the change of basis matrix from eigenvector basis to standard basis</p>
            <p className="mt-2">• By the change of basis theorem: <Math>{`\\Lambda = X^{-1}AX`}</Math></p>
            <p className="mt-2">In the eigenvector basis, <Math>{`T(\\mathbf{x}_i) = \\lambda_i \\mathbf{x}_i`}</Math>, so the matrix is diagonal:</p>
            <MathBlock>{`\\Lambda = \\begin{bmatrix} \\lambda_1 & & 0 \\\\ & \\ddots & \\\\ 0 & & \\lambda_n \\end{bmatrix}`}</MathBlock>
            <p className="mt-2">Each eigenvector coordinate is simply scaled by its eigenvalue.</p>
          </>
        }
      >
        <p>
          If <Math>{`A = X\\Lambda X^{-1}`}</Math> (diagonalization), then:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><Math>X</Math> is the change of basis matrix to eigenvector basis</li>
          <li><Math>\Lambda</Math> is the matrix of <Math>T</Math> in the eigenvector basis</li>
        </ul>
        <p className="mt-2 text-primary-400">
          In the eigenvector basis, <Math>T</Math> just scales each coordinate!
        </p>
      </Theorem>

      <Example title="Finding the Right Basis" className="my-6">
        <MathBlock>
          {`A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 3 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Eigenvalues: <Math>\lambda_1 = 1</Math>, <Math>\lambda_2 = 3</Math><br />
          Eigenvectors: <Math>{`\\mathbf{x}_1 = (1, 0)`}</Math>, <Math>{`\\mathbf{x}_2 = (1, 1)`}</Math>
        </p>
        <p className="mt-2">
          In eigenvector basis: <Math>{`\\Lambda = \\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & 3 \\end{bmatrix}`}</Math>
        </p>
      </Example>

      <h2>Properties Preserved Under Similarity</h2>

      <Theorem
        title="Invariants of Similar Matrices"
        className="my-6"
        proof={
          <>
            <p>Let <Math>B = P^{-1}AP</Math>.</p>
            <p className="mt-2"><strong>Eigenvalues:</strong> <Math>\\det(B - \\lambda I) = \\det(P^{-1}AP - \\lambda P^{-1}P) = \\det(P^{-1}(A - \\lambda I)P)</Math></p>
            <MathBlock>{`= \\det(P^{-1})\\det(A - \\lambda I)\\det(P) = \\det(A - \\lambda I)`}</MathBlock>
            <p className="mt-2">Same characteristic polynomial ⟹ same eigenvalues.</p>
            <p className="mt-2"><strong>Determinant:</strong> <Math>\\det B = \\det(P^{-1}AP) = \\det(P^{-1})\\det(A)\\det(P) = \\det A</Math>.</p>
            <p className="mt-2"><strong>Trace:</strong> <Math>{`\\text{tr}(B) = \\text{tr}(P^{-1}AP) = \\text{tr}(APP^{-1}) = \\text{tr}(A)`}</Math> (using <Math>{`\\text{tr}(XY) = \\text{tr}(YX)`}</Math>).</p>
            <p className="mt-2"><strong>Rank:</strong> <Math>{`B\\mathbf{x} = \\mathbf{0}`}</Math> iff <Math>{`P^{-1}AP\\mathbf{x} = \\mathbf{0}`}</Math> iff <Math>{`A(P\\mathbf{x}) = \\mathbf{0}`}</Math>. Since <Math>P</Math> is invertible, <Math>{`\\dim N(B) = \\dim N(A)`}</Math>, so <Math>{`\\text{rank}(B) = \\text{rank}(A)`}</Math>.</p>
          </>
        }
      >
        <p>Similar matrices share these properties:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Same <strong>eigenvalues</strong></li>
          <li>Same <strong>determinant</strong></li>
          <li>Same <strong>trace</strong></li>
          <li>Same <strong>rank</strong></li>
          <li>Same <strong>characteristic polynomial</strong></li>
        </ul>
        <p className="mt-2">
          These are properties of the transformation itself, not the choice of basis.
        </p>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Choosing a Good Basis</p>
        <p className="text-dark-300 text-sm">
          The goal is to find a basis where the matrix is as simple as possible:
        </p>
        <ul className="list-disc list-inside text-dark-300 text-sm mt-2 space-y-1">
          <li><strong>Diagonal:</strong> If <Math>A</Math> is diagonalizable</li>
          <li><strong>Jordan form:</strong> If not diagonalizable, the "next best" form</li>
          <li><strong>SVD bases:</strong> Different bases for input and output, giving <Math>\Sigma</Math></li>
        </ul>
      </div>

      <h2>Coordinate Transformations</h2>

      <Example title="The Action of Similarity" className="my-6">
        <p>
          To compute <Math>{`B\\mathbf{y}`}</Math> where <Math>{`B = P^{-1}AP`}</Math>:
        </p>
        <MathBlock>
          {`B\\mathbf{y} = P^{-1}A(P\\mathbf{y})`}
        </MathBlock>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Convert <Math>{`\\mathbf{y}`}</Math> to original basis: <Math>{`\\mathbf{x} = P\\mathbf{y}`}</Math></li>
          <li>Apply original transformation: <Math>{`A\\mathbf{x}`}</Math></li>
          <li>Convert back to new basis: <Math>{`P^{-1}(A\\mathbf{x})`}</Math></li>
        </ol>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Change of basis: <Math>{`[x]_{\\mathcal{C}} = P^{-1}[x]_{\\mathcal{B}}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Similar matrices: <Math>{`B = P^{-1}AP`}</Math> (same transformation, different basis).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Similar matrices have the same eigenvalues, determinant, trace, and rank.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Eigenvector basis makes the matrix diagonal.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>The goal: find a basis where the matrix is simplest.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
