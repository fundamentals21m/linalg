import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section02() {
  return (
    <LessonLayout sectionId={2}>
      {/* Introduction */}
      <p>
        The <strong>dot product</strong> (or inner product) of two vectors is one of the most important
        operations in linear algebra. It gives us a way to compute <strong>lengths</strong> and <strong>angles</strong>.
        This section introduces the dot product <Math>{`\\mathbf{v} \\cdot \\mathbf{w}`}</Math> and connects it to
        the length <Math>{`\\|\\mathbf{v}\\|`}</Math>.
      </p>

      <h2>The Dot Product</h2>

      <Definition title="Dot Product" className="my-6">
        <p>
          The <strong>dot product</strong> of <Math>{`\\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix}`}</Math> and{` `}
          <Math>{`\\mathbf{w} = \\begin{bmatrix} w_1 \\\\ w_2 \\end{bmatrix}`}</Math> is:
        </p>
        <MathBlock>
          {`\\mathbf{v} \\cdot \\mathbf{w} = v_1 w_1 + v_2 w_2`}
        </MathBlock>
        <p className="mt-2">
          For vectors in <Math>{`\\mathbb{R}^n`}</Math> with <Math>n</Math> components:
        </p>
        <MathBlock>
          {`\\mathbf{v} \\cdot \\mathbf{w} = v_1 w_1 + v_2 w_2 + \\cdots + v_n w_n`}
        </MathBlock>
      </Definition>

      <p>
        The main point: For <Math>{`\\mathbf{v} \\cdot \\mathbf{w}`}</Math>, multiply each <Math>v_i</Math> times <Math>w_i</Math>.
        Then <Math>{`\\mathbf{v} \\cdot \\mathbf{w} = v_1w_1 + \\cdots + v_nw_n`}</Math>.
      </p>

      <Example title="Computing a Dot Product" className="my-6">
        <p>
          The dot product of <Math>{`\\mathbf{v} = (1, 2)`}</Math> and <Math>{`\\mathbf{w} = (3, 1)`}</Math> is:
        </p>
        <MathBlock>
          {`\\mathbf{v} \\cdot \\mathbf{w} = (1)(3) + (2)(1) = 3 + 2 = 5`}
        </MathBlock>
        <p className="mt-2">
          Note that <Math>{`\\mathbf{w} \\cdot \\mathbf{v}`}</Math> is also 5. The order of <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math> makes no difference!
        </p>
      </Example>

      <Theorem
        title="Commutativity of Dot Product"
        className="my-6"
        proof={
          <>
            <p>
              Let <Math>{`\\mathbf{v} = (v_1, v_2, \\ldots, v_n)`}</Math> and <Math>{`\\mathbf{w} = (w_1, w_2, \\ldots, w_n)`}</Math>.
            </p>
            <p>By definition of the dot product:</p>
            <MathBlock>{`\\mathbf{v} \\cdot \\mathbf{w} = v_1w_1 + v_2w_2 + \\cdots + v_nw_n`}</MathBlock>
            <p>Since multiplication of real numbers is commutative (<Math>v_iw_i = w_iv_i</Math>):</p>
            <MathBlock>{`= w_1v_1 + w_2v_2 + \\cdots + w_nv_n = \\mathbf{w} \\cdot \\mathbf{v}`}</MathBlock>
          </>
        }
      >
        <p>
          The dot product is commutative:
        </p>
        <MathBlock>
          {`\\mathbf{v} \\cdot \\mathbf{w} = \\mathbf{w} \\cdot \\mathbf{v}`}
        </MathBlock>
      </Theorem>

      <h2>Lengths and Unit Vectors</h2>

      <p>
        An important case is the dot product of a vector <em>with itself</em>. In this case <Math>{`\\mathbf{v}`}</Math> equals <Math>{`\\mathbf{w}`}</Math>.
        When the vector is <Math>{`\\mathbf{v} = (1, 2, 3)`}</Math>, the dot product with itself is:
      </p>

      <MathBlock className="my-4">
        {`\\|\\mathbf{v}\\|^2 = \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix} \\cdot \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix} = 1 + 4 + 9 = 14`}
      </MathBlock>

      <p>
        Instead of a 90° angle between vectors we have 0°. The answer is not zero because <Math>{`\\mathbf{v}`}</Math> is not
        perpendicular to itself. The dot product <Math>{`\\mathbf{v} \\cdot \\mathbf{v}`}</Math> gives the <em>length of <Math>{`\\mathbf{v}`}</Math> squared</em>.
      </p>

      <Definition title="Length (Norm) of a Vector" className="my-6">
        <p>
          The <strong>length</strong> (or <strong>norm</strong>) <Math>{`\\|\\mathbf{v}\\|`}</Math> of a vector <Math>{`\\mathbf{v}`}</Math> is the square root of <Math>{`\\mathbf{v} \\cdot \\mathbf{v}`}</Math>:
        </p>
        <MathBlock>
          {`\\text{length} = \\|\\mathbf{v}\\| = \\sqrt{\\mathbf{v} \\cdot \\mathbf{v}} = \\sqrt{v_1^2 + v_2^2 + \\cdots + v_n^2}`}
        </MathBlock>
      </Definition>

      <Example title="Computing Vector Length" className="my-6">
        <p>
          In two dimensions, the length of <Math>{`\\mathbf{v} = (1, 2)`}</Math> is <Math>{`\\sqrt{1^2 + 2^2} = \\sqrt{5}`}</Math>.
        </p>
        <p className="mt-2">
          In three dimensions, the length of <Math>{`\\mathbf{v} = (1, 2, 3)`}</Math> is <Math>{`\\|\\mathbf{v}\\| = \\sqrt{14}`}</Math>.
        </p>
        <p className="mt-2">
          This is just the ordinary length of the arrow that represents the vector. The Pythagoras
          formula <Math>a^2 + b^2 = c^2</Math> connects the three sides: <Math>1^2 + 2^2 = {`\\|\\mathbf{v}\\|^2`}</Math>.
        </p>
      </Example>

      <h2>Unit Vectors</h2>

      <p>
        The word "unit" is always indicating that some measurement equals "one". A unit cube has sides
        of length one. A unit circle is a circle with radius one. Now we see the meaning of a "unit vector".
      </p>

      <Definition title="Unit Vector" className="my-6">
        <p>
          A <strong>unit vector</strong> <Math>{`\\mathbf{u}`}</Math> is a vector whose length equals one:
        </p>
        <MathBlock>
          {`\\|\\mathbf{u}\\| = 1 \\quad \\text{which means} \\quad \\mathbf{u} \\cdot \\mathbf{u} = 1`}
        </MathBlock>
      </Definition>

      <Example title="Creating a Unit Vector" className="my-6">
        <p>
          An example in four dimensions is <Math>{`\\mathbf{u} = \\left(\\frac{1}{2}, \\frac{1}{2}, \\frac{1}{2}, \\frac{1}{2}\\right)`}</Math>.
          Then:
        </p>
        <MathBlock>
          {`\\mathbf{u} \\cdot \\mathbf{u} = \\frac{1}{4} + \\frac{1}{4} + \\frac{1}{4} + \\frac{1}{4} = 1`}
        </MathBlock>
        <p className="mt-2">
          We divided <Math>{`\\mathbf{v} = (1, 1, 1, 1)`}</Math> by its length <Math>{`\\|\\mathbf{v}\\| = 2`}</Math> to get this unit vector.
        </p>
      </Example>

      <p>
        The standard unit vectors along the <Math>x</Math> and <Math>y</Math> axes are written <Math>{`\\mathbf{i}`}</Math> and <Math>{`\\mathbf{j}`}</Math>.
        In the <Math>xy</Math> plane, the unit vector that makes an angle "theta" with the <Math>x</Math> axis is <Math>(\cos\theta, \sin\theta)</Math>:
      </p>

      <MathBlock className="my-4">
        {`\\mathbf{i} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} \\quad \\text{and} \\quad \\mathbf{j} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} \\quad \\text{and} \\quad \\mathbf{u} = \\begin{bmatrix} \\cos\\theta \\\\ \\sin\\theta \\end{bmatrix}`}
      </MathBlock>

      <p>
        When <Math>\theta = 0</Math>, the horizontal vector <Math>{`\\mathbf{u}`}</Math> is <Math>{`\\mathbf{i}`}</Math>.
        When <Math>{`\\theta = 90°`}</Math> (or <Math>{`\\frac{\\pi}{2}`}</Math> radians), the vertical vector is <Math>{`\\mathbf{j}`}</Math>.
        At any angle, the components <Math>\cos\theta</Math> and <Math>\sin\theta</Math> produce <Math>{`\\mathbf{u} \\cdot \\mathbf{u} = 1`}</Math> because <Math>\cos^2\theta + \sin^2\theta = 1</Math>.
      </p>

      <h2>The Angle Between Two Vectors</h2>

      <p>
        The dot product <Math>{`\\mathbf{v} \\cdot \\mathbf{w}`}</Math> reveals something important about the <em>angle</em> between <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math>.
      </p>

      <Theorem
        title="Dot Product and Angle"
        className="my-6"
        proof={
          <>
            <p>
              Consider the triangle formed by vectors <Math>{`\\mathbf{v}`}</Math>, <Math>{`\\mathbf{w}`}</Math>, and <Math>{`\\mathbf{v} - \\mathbf{w}`}</Math>.
              By the Law of Cosines:
            </p>
            <MathBlock>{`\\|\\mathbf{v} - \\mathbf{w}\\|^2 = \\|\\mathbf{v}\\|^2 + \\|\\mathbf{w}\\|^2 - 2\\|\\mathbf{v}\\|\\|\\mathbf{w}\\|\\cos\\theta`}</MathBlock>
            <p>Expanding the left side using the definition of length:</p>
            <MathBlock>{`\\|\\mathbf{v} - \\mathbf{w}\\|^2 = (\\mathbf{v} - \\mathbf{w}) \\cdot (\\mathbf{v} - \\mathbf{w})`}</MathBlock>
            <MathBlock>{`= \\mathbf{v} \\cdot \\mathbf{v} - 2\\mathbf{v} \\cdot \\mathbf{w} + \\mathbf{w} \\cdot \\mathbf{w}`}</MathBlock>
            <MathBlock>{`= \\|\\mathbf{v}\\|^2 - 2\\mathbf{v} \\cdot \\mathbf{w} + \\|\\mathbf{w}\\|^2`}</MathBlock>
            <p>Comparing the two expressions and simplifying:</p>
            <MathBlock>{`-2\\mathbf{v} \\cdot \\mathbf{w} = -2\\|\\mathbf{v}\\|\\|\\mathbf{w}\\|\\cos\\theta`}</MathBlock>
            <p>Therefore:</p>
            <MathBlock>{`\\mathbf{v} \\cdot \\mathbf{w} = \\|\\mathbf{v}\\|\\|\\mathbf{w}\\|\\cos\\theta`}</MathBlock>
          </>
        }
      >
        <p>
          If <Math>\theta</Math> is the angle between vectors <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math>, then:
        </p>
        <MathBlock>
          {`\\mathbf{v} \\cdot \\mathbf{w} = \\|\\mathbf{v}\\| \\|\\mathbf{w}\\| \\cos\\theta`}
        </MathBlock>
        <p className="mt-2">
          Equivalently:
        </p>
        <MathBlock>
          {`\\cos\\theta = \\frac{\\mathbf{v} \\cdot \\mathbf{w}}{\\|\\mathbf{v}\\| \\|\\mathbf{w}\\|}`}
        </MathBlock>
      </Theorem>

      <h2>Perpendicular Vectors</h2>

      <p>
        When <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math> are perpendicular, the angle between them is 90°.
        Since <Math>\cos 90° = 0</Math>, the dot product is zero.
      </p>

      <Definition title="Perpendicular (Orthogonal) Vectors" className="my-6">
        <p>
          Two vectors <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math> are <strong>perpendicular</strong> (or <strong>orthogonal</strong>) if and only if:
        </p>
        <MathBlock>
          {`\\mathbf{v} \\cdot \\mathbf{w} = 0`}
        </MathBlock>
      </Definition>

      <Example title="Perpendicular Vectors" className="my-6">
        <p>
          The vectors <Math>{`\\mathbf{v} = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}`}</Math> and{` `}
          <Math>{`\\mathbf{w} = \\begin{bmatrix} -2 \\\\ 1 \\end{bmatrix}`}</Math> are perpendicular because:
        </p>
        <MathBlock>
          {`\\mathbf{v} \\cdot \\mathbf{w} = (1)(-2) + (2)(1) = -2 + 2 = 0`}
        </MathBlock>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>The dot product <Math>{`\\mathbf{v} \\cdot \\mathbf{w}`}</Math> multiplies each component <Math>v_i</Math> by <Math>w_i</Math> and adds all <Math>v_iw_i</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>The length <Math>{`\\|\\mathbf{v}\\| = \\sqrt{\\mathbf{v} \\cdot \\mathbf{v}}`}</Math> is the square root of the dot product with itself.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>A unit vector <Math>{`\\mathbf{u}`}</Math> has length <Math>{`\\|\\mathbf{u}\\| = 1`}</Math>. To create a unit vector from any <Math>{`\\mathbf{v}`}</Math>, divide by its length: <Math>{`\\mathbf{u} = \\mathbf{v}/\\|\\mathbf{v}\\|`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span><Math>{`\\mathbf{v} \\cdot \\mathbf{w} = 0`}</Math> when <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math> are perpendicular (orthogonal).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>The cosine of the angle between <Math>{`\\mathbf{v}`}</Math> and <Math>{`\\mathbf{w}`}</Math> is <Math>{`\\cos\\theta = \\frac{\\mathbf{v} \\cdot \\mathbf{w}}{\\|\\mathbf{v}\\| \\|\\mathbf{w}\\|}`}</Math>.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
