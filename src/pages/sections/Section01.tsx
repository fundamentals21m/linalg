import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section01() {
  return (
    <LessonLayout sectionId={1}>
      {/* Introduction */}
      <p>
        The heart of linear algebra is in two operations—both with vectors. We <strong>add</strong> vectors
        to get <Math>v + w</Math>. We <strong>multiply</strong> them by numbers <Math>c</Math> and <Math>d</Math> to
        get <Math>cv</Math> and <Math>dw</Math>. Combining those two operations gives the <em>linear combination</em>{` `}
        <Math>cv + dw</Math>.
      </p>

      {/* Definition of Linear Combination */}
      <Definition title="Linear Combination" className="my-6">
        <p>
          A <strong>linear combination</strong> of vectors <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math> is
          any expression of the form:
        </p>
        <MathBlock>{`c\\mathbf{v} + d\\mathbf{w}`}</MathBlock>
        <p className="mt-2">
          where <Math>c</Math> and <Math>d</Math> are scalars (real numbers).
        </p>
      </Definition>

      <h2>Column Vectors</h2>

      <p>
        "You can't add apples and oranges." In a strange way, this is the reason for vectors.
        We have two separate numbers <Math>v_1</Math> and <Math>v_2</Math>. That pair produces
        a <strong>two-dimensional vector</strong> <Math>{`\\mathbf{v}`}</Math>:
      </p>

      <MathBlock className="my-4">
        {`\\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix} \\quad \\text{where } v_1 = \\text{first component}, \\quad v_2 = \\text{second component}`}
      </MathBlock>

      <p>
        We write <Math>{`\\mathbf{v}`}</Math> as a <strong>column</strong>, not as a row. The main point is to have
        a single letter <Math>{`\\mathbf{v}`}</Math> (in <strong>boldface</strong>) for this pair of numbers.
      </p>

      <h2>Vector Addition</h2>

      <p>
        Even if we don't add <Math>v_1</Math> to <Math>v_2</Math>, we do <strong>add vectors</strong>.
        The first components of <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math> stay separate from the second components:
      </p>

      <Definition title="Vector Addition" className="my-6">
        <p>
          If <Math>{`\\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix}`}</Math> and{` `}
          <Math>{`\\mathbf{w} = \\begin{bmatrix} w_1 \\\\ w_2 \\end{bmatrix}`}</Math>, then:
        </p>
        <MathBlock>
          {`\\mathbf{v} + \\mathbf{w} = \\begin{bmatrix} v_1 + w_1 \\\\ v_2 + w_2 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Subtraction follows the same idea: <Math>{`\\mathbf{v} - \\mathbf{w} = \\begin{bmatrix} v_1 - w_1 \\\\ v_2 - w_2 \\end{bmatrix}`}</Math>
        </p>
      </Definition>

      <Example title="Adding Two Vectors" className="my-6">
        <p>
          Let <Math>{`\\mathbf{v} = \\begin{bmatrix} 4 \\\\ 2 \\end{bmatrix}`}</Math> and{` `}
          <Math>{`\\mathbf{w} = \\begin{bmatrix} -1 \\\\ 2 \\end{bmatrix}`}</Math>. Then:
        </p>
        <MathBlock>
          {`\\mathbf{v} + \\mathbf{w} = \\begin{bmatrix} 4 \\\\ 2 \\end{bmatrix} + \\begin{bmatrix} -1 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 4 + (-1) \\\\ 2 + 2 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <h2>Scalar Multiplication</h2>

      <p>
        The other basic operation is <strong>scalar multiplication</strong>. Vectors can be multiplied
        by 2 or by <Math>-1</Math> or by any number <Math>c</Math>. To find <Math>{`2\\mathbf{v}`}</Math>,
        multiply each component of <Math>{`\\mathbf{v}`}</Math> by 2:
      </p>

      <Definition title="Scalar Multiplication" className="my-6">
        <p>
          If <Math>{`\\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix}`}</Math> and <Math>c</Math> is a scalar, then:
        </p>
        <MathBlock>
          {`c\\mathbf{v} = \\begin{bmatrix} cv_1 \\\\ cv_2 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          The number <Math>c</Math> is called a <strong>scalar</strong>.
        </p>
      </Definition>

      <Example title="Scalar Multiplication" className="my-6">
        <p>
          If <Math>{`\\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix}`}</Math>, then:
        </p>
        <MathBlock>
          {`2\\mathbf{v} = \\begin{bmatrix} 2v_1 \\\\ 2v_2 \\end{bmatrix} = \\mathbf{v} + \\mathbf{v} \\quad \\text{and} \\quad -\\mathbf{v} = \\begin{bmatrix} -v_1 \\\\ -v_2 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Notice that the sum of <Math>{`-\\mathbf{v}`}</Math> and <Math>{`\\mathbf{v}`}</Math> is the <strong>zero vector</strong>{` `}
          <Math>{`\\mathbf{0}`}</Math>, which has components 0 and 0.
        </p>
      </Example>

      <h2>Linear Combinations</h2>

      <p>
        Now we combine addition with scalar multiplication to produce a "linear combination"
        of <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math>. Multiply <Math>{`\\mathbf{v}`}</Math> by <Math>c</Math> and
        multiply <Math>{`\\mathbf{w}`}</Math> by <Math>d</Math>. Then add <Math>{`c\\mathbf{v} + d\\mathbf{w}`}</Math>.
      </p>

      <Theorem
        title="Linear Combinations Fill the Plane"
        className="my-6"
        proof={
          <>
            <p>
              We need to show that for any point <Math>(x, y)</Math>, there exist scalars <Math>c</Math> and <Math>d</Math> such that:
            </p>
            <MathBlock>{`c\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} + d\\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} x \\\\ y \\end{bmatrix}`}</MathBlock>
            <p>This gives us the system of equations:</p>
            <MathBlock>{`c + 2d = x \\quad \\text{and} \\quad c + 3d = y`}</MathBlock>
            <p>Subtracting the first equation from the second:</p>
            <MathBlock>{`d = y - x`}</MathBlock>
            <p>Substituting back into the first equation:</p>
            <MathBlock>{`c = x - 2d = x - 2(y - x) = 3x - 2y`}</MathBlock>
            <p>
              Since we can always find <Math>c = 3x - 2y</Math> and <Math>d = y - x</Math> for any <Math>(x, y)</Math>,
              every point in the plane can be reached as a linear combination of these two vectors.
            </p>
          </>
        }
      >
        <p>
          The combinations <Math>{`c\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} + d\\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix}`}</Math> fill
          the whole <Math>xy</Math> plane. They produce every <Math>{`\\begin{bmatrix} x \\\\ y \\end{bmatrix}`}</Math>.
        </p>
      </Theorem>

      <Example title="A Specific Linear Combination" className="my-6">
        <p>
          Let <Math>{`\\mathbf{v} = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}`}</Math> and{` `}
          <Math>{`\\mathbf{w} = \\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix}`}</Math>. Find <Math>{`3\\mathbf{v} + 5\\mathbf{w}`}</Math>.
        </p>
        <MathBlock>
          {`3\\mathbf{v} + 5\\mathbf{w} = 3\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} + 5\\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 3 \\end{bmatrix} + \\begin{bmatrix} 10 \\\\ 15 \\end{bmatrix} = \\begin{bmatrix} 13 \\\\ 18 \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <h2>Three Ways to Represent Vectors</h2>

      <p>
        The figures show how you can visualize vectors. For algebra, we just need the components.
        That vector <Math>{`\\mathbf{v}`}</Math> is represented by an arrow. The arrow goes <Math>v_1 = 4</Math> units
        to the right and <Math>v_2 = 2</Math> units up. It ends at the point whose <Math>x, y</Math> coordinates are (4, 2).
      </p>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-dark-700">
        <p className="text-center text-dark-200 font-medium mb-2">Three ways to describe a vector <Math>{`\\mathbf{v}`}</Math>:</p>
        <div className="grid grid-cols-3 gap-4 text-center text-dark-300">
          <div>
            <p className="font-semibold text-primary-400">Two numbers</p>
            <p><Math>{`\\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix}`}</Math></p>
          </div>
          <div>
            <p className="font-semibold text-primary-400">Arrow from (0,0)</p>
            <p>Direction & length</p>
          </div>
          <div>
            <p className="font-semibold text-primary-400">Point in the plane</p>
            <p><Math>(v_1, v_2)</Math></p>
          </div>
        </div>
      </div>

      <h2>The Parallelogram Rule</h2>

      <p>
        Vector addition <Math>{`\\mathbf{v} + \\mathbf{w}`}</Math> produces the diagonal of a parallelogram.
        We travel along <Math>{`\\mathbf{v}`}</Math> and then along <Math>{`\\mathbf{w}`}</Math>. Or we take the
        diagonal shortcut along <Math>{`\\mathbf{v} + \\mathbf{w}`}</Math>. We could also go
        along <Math>{`\\mathbf{w}`}</Math> and then <Math>{`\\mathbf{v}`}</Math>. In other words, <Math>{`\\mathbf{w} + \\mathbf{v}`}</Math> gives
        the same answer as <Math>{`\\mathbf{v} + \\mathbf{w}`}</Math>.
      </p>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>A vector <Math>{`\\mathbf{v}`}</Math> in two-dimensional space has two components <Math>v_1</Math> and <Math>v_2</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span><Math>{`\\mathbf{v} + \\mathbf{w} = (v_1 + w_1, v_2 + w_2)`}</Math> and <Math>{`c\\mathbf{v} = (cv_1, cv_2)`}</Math> are found a component at a time.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>A linear combination of three vectors <Math>{`\\mathbf{u}`}</Math>, <Math>{`\\mathbf{v}`}</Math>, <Math>{`\\mathbf{w}`}</Math> is <Math>{`c\\mathbf{u} + d\\mathbf{v} + e\\mathbf{w}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Linear algebra is built on the operations <Math>{`\\mathbf{v} + \\mathbf{w}`}</Math> and <Math>{`c\\mathbf{v}`}</Math> and <Math>{`d\\mathbf{w}`}</Math>—adding vectors and multiplying by scalars.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
