import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section11() {
  return (
    <LessonLayout sectionId={11}>
      {/* Introduction */}
      <p>
        A <strong>vector space</strong> is a collection of vectors that can be added together and multiplied
        by scalars while staying in the collection. <strong>Subspaces</strong> are vector spaces that live
        inside larger spaces.
      </p>

      <h2>The Definition of a Vector Space</h2>

      <Definition title="Vector Space" className="my-6">
        <p>
          A <strong>vector space</strong> is a set <Math>V</Math> with two operations (addition and scalar
          multiplication) satisfying eight rules:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
          <li><Math>{`\\mathbf{v} + \\mathbf{w} = \\mathbf{w} + \\mathbf{v}`}</Math> (commutative)</li>
          <li><Math>{`(\\mathbf{u} + \\mathbf{v}) + \\mathbf{w} = \\mathbf{u} + (\\mathbf{v} + \\mathbf{w})`}</Math> (associative)</li>
          <li>There exists a <strong>zero vector</strong> <Math>{`\\mathbf{0}`}</Math> with <Math>{`\\mathbf{v} + \\mathbf{0} = \\mathbf{v}`}</Math></li>
          <li>For each <Math>{`\\mathbf{v}`}</Math> there is <Math>{`-\\mathbf{v}`}</Math> with <Math>{`\\mathbf{v} + (-\\mathbf{v}) = \\mathbf{0}`}</Math></li>
          <li><Math>{`1 \\cdot \\mathbf{v} = \\mathbf{v}`}</Math></li>
          <li><Math>{`c(d\\mathbf{v}) = (cd)\\mathbf{v}`}</Math></li>
          <li><Math>{`c(\\mathbf{v} + \\mathbf{w}) = c\\mathbf{v} + c\\mathbf{w}`}</Math></li>
          <li><Math>{`(c + d)\\mathbf{v} = c\\mathbf{v} + d\\mathbf{v}`}</Math></li>
        </ol>
      </Definition>

      <Example title="The Space R^n" className="my-6">
        <p>
          The most important example is <Math>{`\\mathbf{R}^n`}</Math>: all column vectors with <Math>n</Math> real components.
        </p>
        <MathBlock>
          {`\\mathbf{R}^3 = \\left\\{ \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} : x_1, x_2, x_3 \\in \\mathbf{R} \\right\\}`}
        </MathBlock>
      </Example>

      <h2>Subspaces</h2>

      <Definition title="Subspace" className="my-6">
        <p>
          A <strong>subspace</strong> of a vector space <Math>V</Math> is a nonempty subset <Math>S</Math> that is
          itself a vector space under the same operations. This requires:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>If <Math>{`\\mathbf{v}, \\mathbf{w} \\in S`}</Math>, then <Math>{`\\mathbf{v} + \\mathbf{w} \\in S`}</Math> (closed under addition)</li>
          <li>If <Math>{`\\mathbf{v} \\in S`}</Math> and <Math>{`c \\in \\mathbf{R}`}</Math>, then <Math>{`c\\mathbf{v} \\in S`}</Math> (closed under scalar multiplication)</li>
        </ol>
        <p className="mt-2 text-amber-400">
          Key fact: Every subspace must contain the zero vector <Math>{`\\mathbf{0}`}</Math>.
        </p>
      </Definition>

      <Theorem
        title="Subspace Test"
        className="my-6"
        proof={
          <>
            <p><strong>(⟹)</strong> If <Math>S</Math> is a subspace, it's closed under addition and scalar multiplication, so <Math>{`c\\mathbf{v} + d\\mathbf{w} \\in S`}</Math>.</p>
            <p className="mt-2"><strong>(⟸)</strong> Assume linear combinations stay in <Math>S</Math>. Then:</p>
            <p>• <strong>Contains zero:</strong> <Math>{`0\\mathbf{v} = \\mathbf{0} \\in S`}</Math></p>
            <p>• <strong>Closed under addition:</strong> <Math>{`1\\mathbf{v} + 1\\mathbf{w} = \\mathbf{v} + \\mathbf{w} \\in S`}</Math></p>
            <p>• <strong>Closed under scalar mult:</strong> <Math>{`c\\mathbf{v} + 0\\mathbf{w} = c\\mathbf{v} \\in S`}</Math></p>
            <p>All other vector space axioms are inherited from the parent space.</p>
          </>
        }
      >
        <p>
          A subset <Math>S</Math> of a vector space is a subspace if and only if all linear combinations
          <Math>{`c\\mathbf{v} + d\\mathbf{w}`}</Math> stay in <Math>S</Math>.
        </p>
      </Theorem>

      <h2>Subspaces of R^3</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-3">The possible subspaces of <Math>{`\\mathbf{R}^3`}</Math>:</p>
        <ul className="space-y-2 text-dark-300">
          <li><strong>(L)</strong> Any line through <Math>(0,0,0)</Math></li>
          <li><strong>(P)</strong> Any plane through <Math>(0,0,0)</Math></li>
          <li><strong>(<Math>{`\\mathbf{R}^3`}</Math>)</strong> The whole space</li>
          <li><strong>(Z)</strong> The single vector <Math>(0,0,0)</Math></li>
        </ul>
      </div>

      <Example title="Not a Subspace" className="my-6">
        <p>
          The quarter-plane (vectors with all positive components) is <strong>not</strong> a subspace.
          If <Math>{`\\mathbf{v} = (2, 3)`}</Math> is in the set, then <Math>{`(-1)\\mathbf{v} = (-2, -3)`}</Math> is not!
        </p>
        <p className="mt-2">
          A plane that does not pass through the origin is also <strong>not</strong> a subspace.
        </p>
      </Example>

      <h2>Column Space and Nullspace</h2>

      <Definition title="Column Space" className="my-6">
        <p>
          The <strong>column space</strong> <Math>C(A)</Math> of a matrix <Math>A</Math> is the set of all
          linear combinations of its columns—all vectors <Math>{`A\\mathbf{x}`}</Math>.
        </p>
        <MathBlock>
          {`C(A) = \\{ A\\mathbf{x} : \\mathbf{x} \\in \\mathbf{R}^n \\}`}
        </MathBlock>
      </Definition>

      <Theorem
        title="Solvability Condition"
        className="my-6"
        proof={
          <>
            <p><strong>(⟹)</strong> If <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> has a solution <Math>{`\\mathbf{x}_0`}</Math>, then:</p>
            <MathBlock>{`\\mathbf{b} = A\\mathbf{x}_0 = x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + \\cdots + x_n\\mathbf{a}_n`}</MathBlock>
            <p>So <Math>{`\\mathbf{b}`}</Math> is a linear combination of the columns of <Math>A</Math>, hence <Math>{`\\mathbf{b} \\in C(A)`}</Math>.</p>
            <p className="mt-2"><strong>(⟸)</strong> If <Math>{`\\mathbf{b} \\in C(A)`}</Math>, then by definition <Math>{`\\mathbf{b}`}</Math> is a linear combination of the columns. The coefficients of this combination form the solution <Math>{`\\mathbf{x}`}</Math>.</p>
          </>
        }
      >
        <p>
          <Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> is solvable if and only if <Math>{`\\mathbf{b}`}</Math> is in
          the column space <Math>C(A)</Math>.
        </p>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span><Math>{`\\mathbf{R}^n`}</Math> contains all column vectors with <Math>n</Math> components.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>A subspace must be closed under addition and scalar multiplication (and contain <Math>{`\\mathbf{0}`}</Math>).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>The column space <Math>C(A)</Math> = all combinations of columns = all vectors <Math>{`A\\mathbf{x}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span><Math>{`A\\mathbf{x} = \\mathbf{b}`}</Math> is solvable exactly when <Math>{`\\mathbf{b}`}</Math> is in <Math>C(A)</Math>.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
