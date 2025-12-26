import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section35() {
  return (
    <LessonLayout sectionId={35}>
      {/* Introduction */}
      <p>
        <strong>Complex numbers</strong> extend the real numbers to include solutions of <Math>x^2 = -1</Math>.
        They are essential for understanding eigenvalues and the spectral theory of matrices.
      </p>

      <h2>Complex Numbers</h2>

      <Definition title="Complex Number" className="my-6">
        <p>
          A <strong>complex number</strong> has the form:
        </p>
        <MathBlock>
          {`z = a + bi`}
        </MathBlock>
        <p className="mt-2">
          where <Math>a</Math> is the <strong>real part</strong>, <Math>b</Math> is the <strong>imaginary part</strong>,
          and <Math>{`i = \\sqrt{-1}`}</Math>.
        </p>
      </Definition>

      <h2>Arithmetic with Complex Numbers</h2>

      <Theorem
        title="Complex Arithmetic"
        className="my-6"
        proof={
          <>
            <p><strong>Addition:</strong> Combine real and imaginary parts separately: <Math>(a + bi) + (c + di) = (a+c) + (b+d)i</Math>.</p>
            <p className="mt-2"><strong>Multiplication:</strong> Use distributive law and <Math>i^2 = -1</Math>:</p>
            <MathBlock>{`(a + bi)(c + di) = ac + adi + bci + bdi^2 = (ac - bd) + (ad + bc)i`}</MathBlock>
            <p className="mt-2"><strong>Modulus:</strong> <Math>{`|z|^2 = z \\bar{z} = (a+bi)(a-bi) = a^2 + b^2`}</Math>, so <Math>{`|z| = \\sqrt{a^2 + b^2}`}</Math>.</p>
          </>
        }
      >
        <p>For <Math>z_1 = a + bi</Math> and <Math>z_2 = c + di</Math>:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Addition:</strong> <Math>z_1 + z_2 = (a+c) + (b+d)i</Math></li>
          <li><strong>Multiplication:</strong> <Math>z_1 z_2 = (ac-bd) + (ad+bc)i</Math></li>
          <li><strong>Complex conjugate:</strong> <Math>{`\\bar{z}_1 = a - bi`}</Math></li>
          <li><strong>Modulus:</strong> <Math>{`|z_1| = \\sqrt{a^2 + b^2}`}</Math></li>
        </ul>
      </Theorem>

      <Example title="Multiplication" className="my-6">
        <p><Math>(2 + 3i)(4 - i)</Math>:</p>
        <MathBlock>
          {`(2 + 3i)(4 - i) = 8 - 2i + 12i - 3i^2 = 8 + 10i + 3 = 11 + 10i`}
        </MathBlock>
      </Example>

      <h2>Polar Form</h2>

      <Definition title="Polar Representation" className="my-6">
        <p>
          Every complex number can be written as:
        </p>
        <MathBlock>
          {`z = r(\\cos\\theta + i\\sin\\theta) = re^{i\\theta}`}
        </MathBlock>
        <p className="mt-2">
          where <Math>r = |z|</Math> is the <strong>modulus</strong> and <Math>\theta = \arg(z)</Math> is the <strong>argument</strong>.
        </p>
      </Definition>

      <Theorem
        title="Euler's Formula"
        className="my-6"
        proof={
          <>
            <p>Using Taylor series expansions:</p>
            <MathBlock>{`e^{i\\theta} = 1 + i\\theta + \\frac{(i\\theta)^2}{2!} + \\frac{(i\\theta)^3}{3!} + \\frac{(i\\theta)^4}{4!} + \\cdots`}</MathBlock>
            <p className="mt-2">Since <Math>i^2 = -1</Math>, <Math>i^3 = -i</Math>, <Math>i^4 = 1</Math>, etc.:</p>
            <MathBlock>{`= 1 - \\frac{\\theta^2}{2!} + \\frac{\\theta^4}{4!} - \\cdots + i\\left(\\theta - \\frac{\\theta^3}{3!} + \\frac{\\theta^5}{5!} - \\cdots\\right)`}</MathBlock>
            <p className="mt-2">The real part is the Taylor series for <Math>\\cos\\theta</Math>, and the imaginary part is the series for <Math>\\sin\\theta</Math>.</p>
          </>
        }
      >
        <MathBlock>
          {`e^{i\\theta} = \\cos\\theta + i\\sin\\theta`}
        </MathBlock>
        <p className="mt-2">
          This connects exponentials to trigonometry. Special case: <Math>{`e^{i\\\\pi} + 1 = 0`}</Math>.
        </p>
      </Theorem>

      <h2>Complex Vectors</h2>

      <Definition title="Complex Vector Space" className="my-6">
        <p>
          <Math>{`\\mathbb{C}^n`}</Math> is the space of vectors with <Math>n</Math> complex components:
        </p>
        <MathBlock>
          {`\\mathbf{z} = \\begin{bmatrix} z_1 \\\\ z_2 \\\\ \\vdots \\\\ z_n \\end{bmatrix}, \\quad z_i \\in \\mathbb{C}`}
        </MathBlock>
      </Definition>

      <h2>Complex Inner Product</h2>

      <Definition title="Hermitian Inner Product" className="my-6">
        <p>
          The inner product of complex vectors <Math>{`\\mathbf{u}`}</Math> and <Math>{`\\mathbf{v}`}</Math> is:
        </p>
        <MathBlock>
          {`\\langle \\mathbf{u}, \\mathbf{v} \\rangle = \\bar{\\mathbf{u}}^T \\mathbf{v} = \\sum_{i=1}^{n} \\bar{u}_i v_i`}
        </MathBlock>
        <p className="mt-2 text-primary-400">
          Note the conjugate! This ensures <Math>{`\\langle \\mathbf{u}, \\mathbf{u} \\rangle = \\|\\mathbf{u}\\|^2 \\geq 0`}</Math>.
        </p>
      </Definition>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-amber-500/20">
        <p className="font-semibold text-amber-400 mb-2">Why Conjugates?</p>
        <p className="text-dark-300 text-sm">
          Without conjugates, <Math>(i)(i) = -1</Math>, so the "length squared" of <Math>(0, i)</Math>
          would be <Math>0 + (-1) = -1</Math>. With conjugates: <Math>{`\\bar{i}(i) = (-i)(i) = 1`}</Math> ✓
        </p>
      </div>

      <h2>Complex Eigenvalues</h2>

      <Theorem
        title="Eigenvalues of Real Matrices"
        className="my-6"
        proof={
          <>
            <p>Suppose <Math>A</Math> is real and <Math>{`A\\mathbf{x} = \\lambda\\mathbf{x}`}</Math> where <Math>{`\\lambda`}</Math> and <Math>{`\\mathbf{x}`}</Math> may be complex.</p>
            <p className="mt-2">Take the complex conjugate of both sides:</p>
            <MathBlock>{`\\overline{A\\mathbf{x}} = \\overline{\\lambda\\mathbf{x}}`}</MathBlock>
            <p className="mt-2">Since <Math>A</Math> is real, <Math>{`\\bar{A} = A`}</Math>. Also, <Math>{`\\overline{A\\mathbf{x}} = A\\bar{\\mathbf{x}}`}</Math> and <Math>{`\\overline{\\lambda\\mathbf{x}} = \\bar{\\lambda}\\bar{\\mathbf{x}}`}</Math>:</p>
            <MathBlock>{`A\\bar{\\mathbf{x}} = \\bar{\\lambda}\\bar{\\mathbf{x}}`}</MathBlock>
            <p className="mt-2">This shows <Math>{`\\bar{\\lambda}`}</Math> is an eigenvalue with eigenvector <Math>{`\\bar{\\mathbf{x}}`}</Math>.</p>
          </>
        }
      >
        <p>
          For a real matrix <Math>A</Math>, complex eigenvalues come in conjugate pairs:
        </p>
        <MathBlock>
          {`\\text{If } \\lambda = a + bi \\text{ is an eigenvalue, so is } \\bar{\\lambda} = a - bi`}
        </MathBlock>
        <p className="mt-2">
          The eigenvectors are also conjugates: <Math>{`\\mathbf{x}`}</Math> and <Math>{`\\bar{\\mathbf{x}}`}</Math>.
        </p>
      </Theorem>

      <Example title="Rotation Matrix Eigenvalues" className="my-6">
        <MathBlock>
          {`R_{90°} = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Characteristic equation: <Math>\lambda^2 + 1 = 0</Math><br />
          Eigenvalues: <Math>\lambda = \pm i</Math> (complex conjugate pair)
        </p>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Complex numbers: <Math>z = a + bi</Math> with <Math>i^2 = -1</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Euler's formula: <Math>{`e^{i\\\\theta} = \\cos\\theta + i\\sin\\theta`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Complex inner product uses conjugate: <Math>{`\\langle u, v \\rangle = \\bar{u}^T v`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Complex eigenvalues of real matrices come in conjugate pairs.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Rotation matrices have purely imaginary eigenvalues.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
