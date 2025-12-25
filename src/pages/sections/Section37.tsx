import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section37() {
  return (
    <LessonLayout sectionId={37}>
      {/* Introduction */}
      <p>
        The <strong>Fast Fourier Transform (FFT)</strong> is one of the most important algorithms ever discovered.
        It reduces the cost of computing the Discrete Fourier Transform from <Math>O(n^2)</Math> to <Math>O(n \log n)</Math>.
      </p>

      <h2>The Discrete Fourier Transform</h2>

      <Definition title="DFT Matrix" className="my-6">
        <p>
          The <Math>n \times n</Math> Fourier matrix <Math>F_n</Math> has entries:
        </p>
        <MathBlock>
          {`(F_n)_{jk} = \\omega^{jk}, \\quad \\omega = e^{-2\\pi i/n}`}
        </MathBlock>
        <p className="mt-2">
          where <Math>\omega</Math> is a primitive <Math>n</Math>th root of unity (<Math>\omega^n = 1</Math>).
        </p>
      </Definition>

      <Example title="4×4 Fourier Matrix" className="my-6">
        <p>With <Math>{`\\omega = e^{-2\\\\pi i/4} = -i`}</Math>:</p>
        <MathBlock>
          {`F_4 = \\begin{bmatrix} 1 & 1 & 1 & 1 \\\\ 1 & -i & -1 & i \\\\ 1 & -1 & 1 & -1 \\\\ 1 & i & -1 & -i \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <h2>The FFT Algorithm</h2>

      <Theorem
        title="The Key Idea"
        className="my-6"
        proof={
          <>
            <p>The DFT of <Math>{`\\mathbf{c}`}</Math> can be split into even and odd terms:</p>
            <MathBlock>{`y_j = \\sum_{k=0}^{n-1} c_k \\omega^{jk} = \\sum_{k \\text{ even}} c_k \\omega^{jk} + \\sum_{k \\text{ odd}} c_k \\omega^{jk}`}</MathBlock>
            <p className="mt-2">Let <Math>{`c_k^{(e)} = c_{2k}`}</Math> and <Math>{`c_k^{(o)} = c_{2k+1}`}</Math> for <Math>{`k = 0, \\ldots, n/2-1`}</Math>:</p>
            <MathBlock>{`y_j = \\sum_{k=0}^{n/2-1} c_k^{(e)} \\omega^{2jk} + \\omega^j \\sum_{k=0}^{n/2-1} c_k^{(o)} \\omega^{2jk}`}</MathBlock>
            <p className="mt-2">Since <Math>{`\\omega^2 = e^{-4\\pi i/n}`}</Math> is the <Math>(n/2)</Math>th root of unity, each sum is a DFT of size <Math>n/2</Math>.</p>
            <p className="mt-2">The permutation <Math>P</Math> separates even and odd indices; <Math>D</Math> provides the "twiddle factors" <Math>{`\\omega^j`}</Math>.</p>
          </>
        }
      >
        <p>
          The FFT exploits a <strong>recursive structure</strong> in <Math>F_n</Math>:
        </p>
        <MathBlock>
          {`F_n = \\begin{bmatrix} I & D \\\\ I & -D \\end{bmatrix} \\begin{bmatrix} F_{n/2} & 0 \\\\ 0 & F_{n/2} \\end{bmatrix} P`}
        </MathBlock>
        <p className="mt-2">
          where <Math>{`D = \\text{diag}(1, \\omega, \\omega^2, \\ldots, \\omega^{n/2-1})`}</Math> and <Math>P</Math> is a permutation.
        </p>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Why O(n log n)?</p>
        <p className="text-dark-300 text-sm">
          <strong>Direct computation:</strong> <Math>n^2</Math> multiplications for matrix-vector product.<br /><br />
          <strong>FFT:</strong> Recursively compute two DFTs of size <Math>n/2</Math>, then combine.<br />
          <Math>T(n) = 2T(n/2) + O(n) \Rightarrow T(n) = O(n \log n)</Math>
        </p>
      </div>

      <h2>Properties of the Fourier Matrix</h2>

      <Theorem
        title="Fourier Matrix Properties"
        className="my-6"
        proof={
          <>
            <p><strong>Symmetric:</strong> <Math>{`(F_n)_{jk} = \\omega^{jk} = \\omega^{kj} = (F_n)_{kj}`}</Math>.</p>
            <p className="mt-2"><strong>Orthogonal columns:</strong> For columns <Math>j</Math> and <Math>k</Math>:</p>
            <MathBlock>{`(F_n^H F_n)_{jk} = \\sum_{m=0}^{n-1} \\overline{\\omega^{mj}} \\omega^{mk} = \\sum_{m=0}^{n-1} \\omega^{m(k-j)}`}</MathBlock>
            <p className="mt-2">If <Math>j = k</Math>: sum = <Math>n</Math>. If <Math>{`j \\neq k`}</Math>: this is a geometric series with ratio <Math>{`\\omega^{k-j} \\neq 1`}</Math>, so sum = <Math>0</Math>.</p>
            <p className="mt-2"><strong>Inverse:</strong> From <Math>{`F_n^H F_n = nI`}</Math>, we get <Math>{`F_n^{-1} = \\frac{1}{n}F_n^H`}</Math>.</p>
            <p className="mt-2"><strong>Unitary:</strong> <Math>{`(\\frac{1}{\\sqrt{n}}F_n)^H(\\frac{1}{\\sqrt{n}}F_n) = \\frac{1}{n}F_n^H F_n = I`}</Math>.</p>
          </>
        }
      >
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Symmetric:</strong> <Math>F_n = F_n^T</Math></li>
          <li><strong>Orthogonal columns:</strong> <Math>F_n^H F_n = nI</Math></li>
          <li><strong>Inverse:</strong> <Math>{`F_n^{-1} = \\frac{1}{n}\\bar{F}_n = \\frac{1}{n}F_n^H`}</Math></li>
          <li><strong>Unitary (scaled):</strong> <Math>{`\\frac{1}{\\sqrt{n}}F_n`}</Math> is unitary</li>
        </ul>
      </Theorem>

      <h2>Convolution</h2>

      <Theorem
        title="Convolution Theorem"
        className="my-6"
        proof={
          <>
            <p>Let <Math>{`\\hat{a} = F_na`}</Math> and <Math>{`\\hat{b} = F_nb`}</Math> be the DFTs. The <Math>k</Math>th component of the convolution's DFT is:</p>
            <MathBlock>{`\\widehat{(a*b)}_k = \\sum_{m=0}^{n-1} (a*b)_m \\omega^{mk} = \\sum_{m=0}^{n-1} \\left(\\sum_{j=0}^{n-1} a_j b_{m-j}\\right) \\omega^{mk}`}</MathBlock>
            <p className="mt-2">Rearranging (with indices mod <Math>n</Math>):</p>
            <MathBlock>{`= \\sum_{j=0}^{n-1} a_j \\omega^{jk} \\sum_{\\ell=0}^{n-1} b_\\ell \\omega^{\\ell k} = \\hat{a}_k \\cdot \\hat{b}_k`}</MathBlock>
            <p className="mt-2">Thus <Math>{`\\mathcal{F}(a*b) = \\mathcal{F}(a) \\odot \\mathcal{F}(b)`}</Math> (componentwise product).</p>
          </>
        }
      >
        <p>
          The <strong>convolution</strong> of vectors <Math>a</Math> and <Math>b</Math>:
        </p>
        <MathBlock>
          {`(a * b)_k = \\sum_j a_j b_{k-j}`}
        </MathBlock>
        <p className="mt-2">
          becomes <strong>pointwise multiplication</strong> in the Fourier domain:
        </p>
        <MathBlock>
          {`\\mathcal{F}(a * b) = \\mathcal{F}(a) \\cdot \\mathcal{F}(b)`}
        </MathBlock>
      </Theorem>

      <Example title="Polynomial Multiplication" className="my-6">
        <p>
          To multiply polynomials <Math>a(x)</Math> and <Math>b(x)</Math>:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>FFT: transform coefficients of <Math>a</Math> and <Math>b</Math></li>
          <li>Multiply pointwise: <Math>O(n)</Math></li>
          <li>Inverse FFT: get coefficients of <Math>a \cdot b</Math></li>
        </ol>
        <p className="mt-2 text-primary-400">
          Total: <Math>O(n \log n)</Math> instead of <Math>O(n^2)</Math>!
        </p>
      </Example>

      <h2>Applications</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Where FFT is Used</p>
        <ul className="list-disc list-inside text-dark-300 text-sm space-y-1">
          <li><strong>Signal processing:</strong> Audio, image, and video compression</li>
          <li><strong>Spectral analysis:</strong> Find frequencies in data</li>
          <li><strong>Polynomial/integer multiplication:</strong> Fast algorithms</li>
          <li><strong>Solving PDEs:</strong> Spectral methods</li>
          <li><strong>Data compression:</strong> JPEG, MP3 use FFT-related transforms</li>
        </ul>
      </div>

      <h2>The Roots of Unity</h2>

      <Theorem
        title="Roots of Unity"
        className="my-6"
        proof={
          <>
            <p><strong>Solutions:</strong> By Euler's formula, <Math>{`(e^{2\\pi ik/n})^n = e^{2\\pi ik} = 1`}</Math> for any integer <Math>k</Math>.</p>
            <p className="mt-2">For <Math>{`k = 0, 1, \\ldots, n-1`}</Math>, we get <Math>n</Math> distinct roots (since <Math>{`|\\omega_k| = 1`}</Math> and the arguments are evenly spaced by <Math>{`2\\pi/n`}</Math>).</p>
            <p className="mt-2"><strong>Sum equals zero:</strong> Let <Math>{`\\omega = e^{2\\pi i/n}`}</Math>. The sum is a geometric series:</p>
            <MathBlock>{`S = 1 + \\omega + \\omega^2 + \\cdots + \\omega^{n-1} = \\frac{1 - \\omega^n}{1 - \\omega} = \\frac{1 - 1}{1 - \\omega} = 0`}</MathBlock>
            <p className="mt-2">(Valid since <Math>{`\\omega \\neq 1`}</Math> for <Math>{`n > 1`}</Math>.)</p>
          </>
        }
      >
        <p>
          The <Math>n</Math>th roots of unity are the solutions to <Math>z^n = 1</Math>:
        </p>
        <MathBlock>
          {`\\omega_k = e^{2\\pi ik/n} = \\cos\\frac{2\\pi k}{n} + i\\sin\\frac{2\\pi k}{n}`}
        </MathBlock>
        <p className="mt-2">
          They form a regular <Math>n</Math>-gon on the unit circle. Key property:
        </p>
        <MathBlock>
          {`1 + \\omega + \\omega^2 + \\cdots + \\omega^{n-1} = 0`}
        </MathBlock>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>DFT matrix <Math>F_n</Math> uses roots of unity: <Math>{`(F_n)_{jk} = \\omega^{jk}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>FFT computes DFT in <Math>O(n \log n)</Math> instead of <Math>O(n^2)</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Key: recursive factorization of <Math>F_n</Math> using <Math>{`F_{n/2}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Convolution becomes pointwise multiplication in Fourier domain.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Applications: signal processing, polynomial multiplication, compression.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
